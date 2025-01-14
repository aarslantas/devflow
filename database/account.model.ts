import {
  model,
  models,
  Schema,
  Types,
} from "mongoose";

// Account arayüzü
export interface IAccount {
  userId: Types.ObjectId;
  name: string;
  image?: string;
  provider: string;
  providerAccountId: string;
  password?: string;
}

const AccountSchema = new Schema<IAccount>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
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
    image: {
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
