import mongoose, { Schema, model, models } from "mongoose";

const otpSchema = new Schema(
  {
    email: { type: String },
    phone: { type: String },
    otp: { type: String },
    expiresAt: { type: Date },
  },
  { timestamps: true }
);

export const Otp = models.Otp || model("Otp", otpSchema);
