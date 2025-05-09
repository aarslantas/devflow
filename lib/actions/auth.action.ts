"use server";

import bcrypt from "bcryptjs";
import mongoose from "mongoose";

import { signIn } from "@/auth";
import Account from "@/database/account.model";
import User from "@/database/user.model";
import {
  ActionResponse,
  ErrorResponse,
} from "@/types/global";

import action from "../handlers/action";
import { handleError } from "../handlers/error";
import { SignUpSchema } from "../validation";

export async function signUpWithCredentials(
  params: AuthCredentials
): Promise<ActionResponse> {
  const validationResult = await action({
    params,
    schema: SignUpSchema,
  });

  if (validationResult instanceof Error) {
    return handleError(
      validationResult
    ) as ErrorResponse;
  }

  const { name, username, email, password } =
    validationResult.params!;

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const existingUser = await User.findOne({
      email,
    }).session(session);

    if (existingUser) {
      throw new Error(
        "User already exists with this email"
      );
    }

    const existingUserName = await User.findOne({
      username,
    }).session(session);

    if (existingUserName) {
      throw new Error("Username already exists");
    }

    const hashedPassword = await bcrypt.hash(
      password,
      10
    );

    const [newUser] = new User(
      [
        {
          username,
          name,
          email,
        },
      ],
      {
        session,
      }
    );

    await Account.create(
      {
        userId: newUser._id,
        name,
        provider: "credentials",
        providerAccountId: email,
        password: hashedPassword,
      },
      { session }
    );

    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    await session.commitTransaction();

    return {
      success: true,
      data: newUser,
    };
  } catch (error) {
    await session.abortTransaction();
    return handleError(error) as ErrorResponse;
  } finally {
    session.endSession();
  }
}
