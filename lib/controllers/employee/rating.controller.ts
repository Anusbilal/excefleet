import { Rating } from "@/models/Rating";
import { Employee } from "@/models/Employee";
import { createRatingSchema } from "@/utils/validation/ratingSchema";
import mongoose from "mongoose";

export async function createRating(data: unknown) {
    const parsed = createRatingSchema.safeParse(data);
    if (!parsed.success) {
        return {
            success: false,
            error: parsed.error.format(),
        };
    }

    const { rating, created_by, driver_id, feedback } = parsed.data;

    const createdById = new mongoose.Types.ObjectId(created_by);
    const driverId = new mongoose.Types.ObjectId(driver_id);

    const creator = await Employee.findById(createdById);

    if (!creator) {
        return {
            success: false,
            error: { message: "Invalid creator" },
        };
    }

    const newRating = await Rating.create({
        rating,
        created_by: createdById,
        driver_id: driverId,
        feedback,
    });

    return {
        success: true,
        data: {
            rating: newRating.rating,
            created_by: newRating.created_by,
            driver_id: newRating.driver_id,
            timestamp: newRating.createdAt
        },
    };
}
