import mongoose from "mongoose";
import slugify from "slugify";

import Account from "@/database/account.model";
import User from "@/database/user.model";
import { handleError } from "@/lib/handlers/error";
import { ValidationError } from "@/lib/http-errors";
import dbConnect from "@/lib/mongoose";
import { SignInWithOAuthSchema } from "@/lib/validation";
import { APIErrorResponse } from "@/types/global";

export async function POST(request: Request) {
  const { provider, providerAccountId, user } =
    await request.json();

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
          },
        ],
        { session }
      );
    }

    await session.commitTransaction();
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
