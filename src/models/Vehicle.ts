import mongoose from "mongoose";

const vehicleSchema = new mongoose.Schema({
  image_urls: [String],
  first_name: String,
  last_name: String,
  phone: String,
  type: String,
  registration_city: String,
  registration_number: String,
  address: String,
  location: {
    lat: Number,
    lng: Number,
  },
  driver_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Driver",
  },
}, { timestamps: true });

export const Vehicle = mongoose.models.Vehicle || mongoose.model("Vehicle", vehicleSchema);
