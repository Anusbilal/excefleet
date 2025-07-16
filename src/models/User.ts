import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  photo_url: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  address: string;
  location: {
    lat: number;
    lng: number;
  };
  role: "super_admin" | "admin" | "user" | "company";
  login_email: string;
  login_password: string;
  permission: string[];
}

const UserSchema = new Schema<IUser>(
  {
    photo_url: { type: String },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    location: {
      lat: { type: Number, required: true },
      lng: { type: Number, required: true },
    },
    role: {
      type: String,
      enum: ["super_admin", "admin", "user", "company"],
      required: true,
    },
    login_email: { type: String, required: true, unique: true },
    login_password: { type: String, required: true },
    permission: [{ type: String }],
  },
  { timestamps: true }
);

export const User = mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
