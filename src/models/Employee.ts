import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  mobile_number: string;
  city: string;
  address: string;
  route: string;
  company_id: Types.ObjectId;
  latitude: string;
  longitude: string;
  password: string; 
}

const EmployeeSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    mobile_number: { type: String, required: true },
    city: { type: String },
    address: { type: String },
    route: { type: String },
    company_id: { type: Schema.Types.ObjectId, ref: 'Company', required: true },
    latitude: { type: String },
    longitude: { type: String },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

export const Employee = mongoose.models.Employee || mongoose.model<IUser>('Employee', EmployeeSchema);


