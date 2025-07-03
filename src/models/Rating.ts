import mongoose, { Schema, model, models, Types, Document } from "mongoose";

export interface IRating extends Document {
  rating: number;
  created_by: Types.ObjectId;
  driver_id: Types.ObjectId;
  feedback?: string;
}

const ratingSchema = new Schema<IRating>(
  {
    rating: { type: Number, required: true },
    created_by: { type: Schema.Types.ObjectId, ref: "User", required: true },
    driver_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
    feedback: { type: String },
  },
  { timestamps: true }
);

export const Rating = models.Rating || model<IRating>("Rating", ratingSchema);
