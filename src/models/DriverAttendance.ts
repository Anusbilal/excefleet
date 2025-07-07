import mongoose, { Schema, Document, Types } from "mongoose";

export interface IDriverAttendance extends Document {
  driver_id: Types.ObjectId;
  company_id: Types.ObjectId;
  attendance: "on_duty" | "off";
  reason?: string;
  created_at: Date;
}

const DriverAttendanceSchema = new Schema<IDriverAttendance>(
  {
    driver_id: { type: Schema.Types.ObjectId, required: true, ref: "Driver" },
    company_id: { type: Schema.Types.ObjectId, required: true, ref: "Company" },
    attendance: { type: String, enum: ["on_duty", "off"], required: true },
    reason: { type: String },
    created_at: { type: Date, default: Date.now },
  },
  { timestamps: false }
);

export const DriverAttendance =
  mongoose.models.DriverAttendance ||
  mongoose.model<IDriverAttendance>("DriverAttendance", DriverAttendanceSchema);
