import mongoose from "mongoose";
import { NextResponse } from "next/server";
import slugify from "slugify";

import Account from "@/database/account.model";
import User from "@/database/user.model";
import { handleError } from "@/lib/handlers/error";
import { ValidationError } from "@/lib/http-errors";
import dbConnect from "@/lib/mongoose";
import { SignInWithOAuthSchema } from "@/lib/validation";
import { APIErrorResponse } from "@/types/global";

export async function POST(request: Request) {
  console.log("signin-with-oauth-123", request);
  const { provider, providerAccountId, user } =
    await request.json();
  console.log(
    "provider-123",
    provider,
    providerAccountId,
    user
  );
  await dbConnect();

  const session = await mongoose.startSession();

  session.startTransaction();

  try {
    const validatedData =
      SignInWithOAuthSchema.safeParse({
        provider,
        providerAccountId,
        user,
      });

    if (!validatedData.success) {
      throw new ValidationError(
        validatedData.error.flatten().fieldErrors
      );
    }

    const { name, userName, email, image } = user;

    const slugifiedUserName = slugify(userName, {
      lower: true,
      strict: true,
      trim: true,
    });

    let existingUser = await User.findOne({
      email,
    }).session(session);

    if (!existingUser) {
      [existingUser] = await User.create(
        [
          {
            name,
            userName: slugifiedUserName,
            email,
            image,
          },
        ],
        { session }
      );
    } else {
      const updatedData: {
        name?: string;
        image?: string;
      } = {};

      if (existingUser.name !== name) {
        updatedData.name = name;
      }

      if (existingUser.image !== image) {
        updatedData.image = image;
      }

      if (Object.keys(updatedData).length > 0) {
        await User.findOneAndUpdate(
          { _id: existingUser._id },
          { $set: updatedData }
        ).session(session);
      }
    }

    const existingAccount = await Account.findOne(
      {
        userId: existingUser._id,
        provider,
        providerAccountId,
      }
    ).session(session);

    if (!existingAccount) {
      await Account.create(
        [
          {
            userId: existingUser._id,
            provider,
            providerAccountId,
            name,
          },
        ],
        { session }
      );
    }

    await session.commitTransaction();
    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    await session.abortTransaction();

    return handleError(
      error,
      "api"
    ) as APIErrorResponse;
  } finally {
    session.endSession();
  }
}

export async function GET() {
  const users = [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
    },
    {
      id: 3,
      name: "Alice Johnson",
      email: "alice@example.com",
    },
  ];

  return NextResponse.json(users);
}
