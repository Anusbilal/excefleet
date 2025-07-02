import { Ride } from "@/models/Ride";
import { User } from "@/models/User";
import { createRideSchema } from "@/utils/validation/rideSchema";
import mongoose from "mongoose";

export async function createRide(data: unknown) {
  const parsed = createRideSchema.safeParse(data);
  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.format(),
    };
  }

  const { ride, user_id, company_id } = parsed.data;
  const userObjectId = new mongoose.Types.ObjectId(user_id);
  const companyObjectId = new mongoose.Types.ObjectId(company_id);

  const user = await User.findOne({
    _id: userObjectId,
    company_id: companyObjectId,
  });

  if (!user) {
    return {
      success: false,
      error: { message: "User not found or doesn't belong to the specified company" },
    };
  }

  const newRide = await Ride.create({
    ride,
    user_id: userObjectId,
    company_id: companyObjectId,
  });

  return {
    success: true,
    data: newRide,
  };
}
