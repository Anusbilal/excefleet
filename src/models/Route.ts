import mongoose from "mongoose";

const RouteSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    routes: [
      {
        employee_id: { type: mongoose.Schema.Types.ObjectId, ref: "Employee" },
        address: String,
        location: {
          lat: Number,
          lng: Number,
        },
      },
    ],
    city: String,
    from: String,
    to: String,
    kilometers: Number,
    driver_id: { type: mongoose.Schema.Types.ObjectId, ref: "Driver" },
  },
  { timestamps: true }
);

export const RouteModel =
  mongoose.models.Route || mongoose.model("Route", RouteSchema);
