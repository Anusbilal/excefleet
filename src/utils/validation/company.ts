import { z } from "zod";

const locationSchema = z.object({
  lat: z.preprocess((val) => parseFloat(val as string), z.number()),
  lng: z.preprocess((val) => parseFloat(val as string), z.number()),
});

export const companySchema = z.object({
  logo_url: z.string().optional(), 
  location: locationSchema,
  bussiness_nature: z.string().optional(),
  name: z.string().min(1, "Name is required"),
  number_of_employees: z.preprocess(
    (val) => Number(val),
    z.number().int().nonnegative()
  ),
  address: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  email: z.string().email("Invalid email"),
  phone: z.string().optional(),
  contact_person: z.string().optional(),
  login_email: z.string().email("Invalid login email"),
  password: z.string().min(6, "Password should be at least 6 characters"),
});