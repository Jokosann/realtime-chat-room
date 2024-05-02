import { z } from 'zod';

export const createUserValidation = z.object({
    username: z.string().min(1).max(100),
    image: z
        .instanceof(File)
        .refine((file) => file.size > 0, {
            message: '*Image is required',
        })
        .refine((file) => file.size === 0 || file.type.startsWith('image/'), {
            message: '*Only images are allowed',
        })
        .refine((file) => file.size < 5000000, {
            message: '*Image must less than 5MB',
        }),
});
