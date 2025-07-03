import { z } from 'zod';

export const createUserSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
    mobile_number: z.string(),
    city: z.string().optional(),
    address: z.string().optional(),
    route: z.string().optional(),
    company_id: z.string(),
    latitude: z.string().optional(),
    longitude: z.string().optional(),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;
