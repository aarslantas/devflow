import {
  Schema,
  Types,
  model,
  models,
} from "mongoose";

interface IInteraction {
  user: Types.ObjectId;
  action: string;
  actionId: Types.ObjectId;
  actionType: "question" | "answer";
}

const interactionSchema =
  new Schema<IInteraction>({
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    action: {
      type: String,
      required: true,
    },
    actionId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    actionType: {
      type: String,
      enum: ["question", "answer"],
      required: true,
    },
  });

const Interaction =
  models.Interaction ||
  model<IInteraction>(
    "Interaction",
    interactionSchema
  );

export default Interaction;
