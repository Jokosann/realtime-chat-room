'use server';

import { createUserValidation } from '@/validations/user-validation';
import { put } from '@vercel/blob';
import { prisma } from './prisma';
import { getRandomNumber } from '@/services/user-service';

export const createUser = async (prevState: unknown, formData: FormData) => {
    const validateFields = createUserValidation.safeParse(Object.fromEntries(formData.entries()));
    if (!validateFields.success) {
        return { error: validateFields.error.flatten().fieldErrors };
    }
    const { username, image } = validateFields.data;
    const { url } = await put(image.name, image, {
        access: 'public',
        multipart: true,
    });

    try {
        await prisma.user.create({
            data: {
                user_id: getRandomNumber(8),
                username,
                image: url,
            },
        });
    } catch (error) {
        return { message: 'Failed to create data' };
    }
};
