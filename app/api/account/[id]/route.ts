import { NextResponse } from "next/server";

import Account from "@/database/account.model";
import User from "@/database/user.model";
import { handleError } from "@/lib/handlers/error";
import {
  NotFoundError,
  ValidationError,
} from "@/lib/http-errors";
import dbConnect from "@/lib/mongoose";
import { AccountSchema } from "@/lib/validation";
import { APIErrorResponse } from "@/types/global";

export async function GET(
  _: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  if (!id) {
    throw new NotFoundError("Account");
  }

  try {
    await dbConnect();
    const account = await Account.findById(id);
    if (!account) {
      throw new NotFoundError(
        "Account not found"
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: account,
      },
      { status: 200 }
    );
  } catch (error) {
    return handleError(
      error,
      "api"
    ) as APIErrorResponse;
  }
}

// Delete User by ID -> /api/users/[id]
export async function DELETE(
  _: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  if (!id) {
    throw new NotFoundError("Account");
  }

  try {
    await dbConnect();
    const account =
      await Account.findByIdAndDelete(id);
    if (!account) {
      throw new NotFoundError(
        "Account not found"
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: account,
        message: "User deleted successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    return handleError(
      error,
      "api"
    ) as APIErrorResponse;
  }
}
