import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IDriver extends Document {
  first_name: string;
  last_name: string;
  email?: string;
  mobile_number: string;
  company_id: Types.ObjectId;
  address: string;
  city: string;
  state: string;
  latitude: string;
  longitude: string;
  password: string;
  profile_picture: string;
  pin?: string; 
}

const DriverSchema = new Schema<IDriver>(
  {
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, unique: true, sparse: true }, 
    mobile_number: { type: String, required: true },
    company_id: { type: Schema.Types.ObjectId, ref: 'Company', required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    latitude: { type: String, required: true },
    longitude: { type: String, required: true },
    password: { type: String, required: true },
    pin: { type: String, default: null }, 
    profile_picture: { type: String, default: '' }
  },
  { timestamps: true }
);

export const Driver = mongoose.models.Driver || mongoose.model<IDriver>('Driver', DriverSchema);
