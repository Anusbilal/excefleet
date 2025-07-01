import mongoose, { Schema, Document, Types } from 'mongoose';
import { UserRole } from '@/types/user';

export interface IUser extends Document {
  name: string;
  email: string;
  mobile_number: string;
  city: string;
  address: string;
  route: string;
  company_id: Types.ObjectId;
  role: UserRole;
  latitude: string;
  longitude: string;
  password: string; 
}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    mobile_number: { type: String, required: true },
    city: { type: String },
    address: { type: String },
    route: { type: String },
    company_id: { type: Schema.Types.ObjectId, ref: 'Company', required: true },
    role: { type: String, enum: ['admin', 'employee', 'driver'], default: 'employee' },
    latitude: { type: String },
    longitude: { type: String },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

export const User = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
