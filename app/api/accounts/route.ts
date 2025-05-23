import { NextResponse } from "next/server";

import Account from "@/database/account.model";
import { handleError } from "@/lib/handlers/error";
import {
  ForbiddenError,
  ValidationError,
} from "@/lib/http-errors";
import dbConnect from "@/lib/mongoose";
import { AccountSchema } from "@/lib/validation";
import { APIErrorResponse } from "@/types/global";

export async function GET() {
  try {
    await dbConnect();
    const accounts = await Account.find();
    return NextResponse.json({
      succes: true,
      data: accounts,
      status: 200,
    });
  } catch (error) {
    return handleError(
      error,
      "api"
    ) as APIErrorResponse;
  }
}

export async function POST(request: Request) {
  try {
    await dbConnect();
    const body = await request.json();

    const validatedData =
      AccountSchema.safeParse(body);

    if (!validatedData.success) {
      throw new ValidationError(
        validatedData.error.flatten().fieldErrors
      );
    }

    const existingAccount = await Account.findOne(
      {
        provider: validatedData.data.provider,
        providerAccountId:
          validatedData.data.providerAccountId,
      }
    );
    if (existingAccount) {
      throw new ForbiddenError(
        "An Account with this provider and providerAccountId already exists"
      );
    }

    const newAccount = await Account.create(
      validatedData
    );

    return NextResponse.json({
      succes: true,
      data: newAccount,
      status: 201,
    });
  } catch (error) {
    return handleError(
      error,
      "api"
    ) as APIErrorResponse;
  }
}
