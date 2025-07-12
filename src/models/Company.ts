import mongoose, { Schema, Document } from "mongoose";

export interface ICompany extends Document {
  logo_url: string;
  location: { lat: number; lng: number };
  bussiness_nature: string;
  name: string;
  number_of_employees: number;
  address: string;
  city: string;
  state: string;
  email: string;
  phone: string;
  contact_person: string;
  login_email: string;
  password: string;
}

const CompanySchema = new Schema<ICompany>(
  {
    logo_url: String,
    location: {
      lat: Number,
      lng: Number,
    },
    bussiness_nature: String,
    name: String,
    number_of_employees: Number,
    address: String,
    city: String,
    state: String,
    email: String,
    phone: String,
    contact_person: String,
    login_email: String,
    password: String,
  },
  { timestamps: true }
);

export const Company =
  mongoose.models.Company || mongoose.model<ICompany>("Company", CompanySchema);
