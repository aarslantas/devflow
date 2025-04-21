import mongoose from "mongoose";

import {
  ActionResponse,
  ErrorResponse,
} from "@/types/global";

import action from "../handlers/action";
import { handleError } from "../handlers/error";
import { SignUpSchema } from "../validation";

export async function sigupWithCredentials(
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
}
