import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IDriver extends Document {
  photo_url: string;
  first_name: string;
  last_name: string;
  email?: string;
  phone: string;
  login_phone: string;
  contractor: string;
  address: string;
  province: string;
  city: string;
  location: {
    lat: number;
    lng: number;
  };
  cnic_image_url: string;
  license_image_url: string;
  pin: string;
  password: string;
  company_id?: Types.ObjectId;
  route_id?: Types.ObjectId;
  status: 'Active' | 'Inactive';
  rating?: number;
}

const LocationSchema = new Schema(
  {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true }
  },
  { _id: false }
);

const DriverSchema = new Schema<IDriver>(
  {
    photo_url: { type: String, default: '' },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, unique: true, sparse: true },
    phone: { type: String, required: true },
    login_phone: { type: String, required: true },
    contractor: { type: String, required: true },
    address: { type: String, required: true },
    province: { type: String, required: true },
    city: { type: String, required: true },
    location: { type: LocationSchema, required: true },
    cnic_image_url: { type: String, default: '' },
    license_image_url: { type: String, default: '' },
    pin: { type: String, required: true },
    password: { type: String, required: true },
    company_id: { type: Schema.Types.ObjectId, ref: 'Company', required: false },
    route_id: { type: Schema.Types.ObjectId, ref: 'Route', required: false },
    status: { type: String, enum: ['Active', 'Inactive'], default: 'Active' },
    rating: { type: Number, default: null },
  },
  { timestamps: true }
);

export const Driver =
  mongoose.models.Driver || mongoose.model<IDriver>('Driver', DriverSchema);
