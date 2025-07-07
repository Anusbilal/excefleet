import mongoose, { Schema, Document, Types } from "mongoose";

interface Stop {
  user_id: Types.ObjectId;
  name: string;
  address: string;
  lat: number;
  long: number;
  pickup_time: string;
  status: "pending" | "picked" | "missed";
}

interface Office {
  lat: number;
  long: number;
  address: string;
}

export interface ISchedule extends Document {
  driver_id: Types.ObjectId;
  date: Date;
  stops: Stop[];
  office: Office;
}

const ScheduleSchema = new Schema<ISchedule>(
  {
    driver_id: { type: Schema.Types.ObjectId, ref: "Driver", required: true },
    date: { type: Date, required: true },
    stops: [
      {
        user_id: { type: Schema.Types.ObjectId, ref: "User" },
        name: String,
        address: String,
        lat: Number,
        long: Number,
        pickup_time: String,
        status: { type: String, enum: ["pending", "picked", "missed"], default: "pending" },
      },
    ],
    office: {
      lat: Number,
      long: Number,
      address: String,
    },
  },
  { timestamps: true }
);

export const Schedule =
  mongoose.models.Schedule || mongoose.model<ISchedule>("Schedule", ScheduleSchema);
