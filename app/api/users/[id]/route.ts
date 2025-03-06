import { NextResponse } from "next/server";

import User from "@/database/user.model";
import { handleError } from "@/lib/handlers/error";
import { NotFoundError } from "@/lib/http-errors";
import dbConnect from "@/lib/mongoose";
import { APIErrorResponse } from "@/types/global";

// Get User by ID   -> /api/users/[id]
export async function GET(
  _: Request,
  { params }: { params: { id: string } }
) {
  const { id } = await params;

  if (!id) {
    throw new NotFoundError("User");
  }

  try {
    await dbConnect();
    const user = await User.findById(id);
    if (!user) {
      throw new NotFoundError("User not found");
    }

    return NextResponse.json(
      {
        success: true,
        data: user,
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
  { params }: { params: { id: string } }
) {
  const { id } = await params;

  if (!id) {
    throw new NotFoundError("User");
  }

  try {
    await dbConnect();
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      throw new NotFoundError("User not found");
    }

    return NextResponse.json(
      {
        success: true,
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
