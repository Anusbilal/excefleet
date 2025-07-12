import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IEmployee extends Document {
  company_id: Types.ObjectId;
  department: string;
  photo_url: string;
  first_name: string;
  last_name: string;
  email: string;
  login_email: string;
  password: string;
  phone: string;
  address: string;
  province: string;
  city: string;
  location: {
    lat: number;
    lng: number;
  };
  route?: string;
}

const LocationSchema = new Schema(
  {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
  },
  { _id: false }
);

const EmployeeSchema = new Schema<IEmployee>(
  {
    company_id: { type: Schema.Types.ObjectId, ref: 'Company', required: true },
    department: { type: String, required: true },
    photo_url: { type: String },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    login_email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    province: { type: String, required: true },
    city: { type: String, required: true },
    location: { type: LocationSchema },
    route: { type: String },
  },
  { timestamps: true }
);

export const Employee =
  mongoose.models.Employee || mongoose.model<IEmployee>('Employee', EmployeeSchema);
