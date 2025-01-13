import { model, models, Schema } from "mongoose";

// Account arayüzü
export interface IAccount {
  userId: string;
  provider: string;
  providerAccountId: string;
  password?: string;
  profileImage?: string;
}

const AccountSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    provider: {
      type: String,
      required: true,
    },
    providerAccountId: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      select: false,
    },
    profileImage: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

const Account =
  models?.Account ||
  model<IAccount>("Account", AccountSchema);

export default Account;
