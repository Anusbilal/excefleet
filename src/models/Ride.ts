import mongoose, { Schema, model, models } from "mongoose";

const rideSchema = new Schema(
  {
    ride: {
      type: String,
      enum: ["go_with_you", "go_by_myself"],
      required: true,
    },
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    company_id: {
      type: Schema.Types.ObjectId,
      required: true,
    },
  },
  { timestamps: true }
);

export const Ride = models.Ride || model("Ride", rideSchema);
