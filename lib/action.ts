import { createUserValidation } from '@/validations/user-validation';
import { signIn } from 'next-auth/react';
import { upload } from '@vercel/blob/client';
import { getRandomNumber } from '@/services/user-service';
import { prisma } from './prisma';

export const createUser = async (prevState: unknown, formData: FormData) => {
    const validateFields = createUserValidation.safeParse(Object.fromEntries(formData.entries()));
    if (!validateFields.success) {
        return { error: validateFields.error.flatten().fieldErrors };
    }
    const { username, image } = validateFields.data;

    const newBlob = await upload(image.name, image, {
        access: 'public',
        handleUploadUrl: '/api/image-upload',
    });

    try {
        await signIn('credentials', {
            redirect: false,
            username: username,
            image: newBlob.url,
        });
        return { message: 'success' };
    } catch (error) {
        return { message: error };
    }
};

export const createUserSession = async (data: { username: string; image: string }) => {
    try {
        const user = await prisma.user.create({
            data: {
                user_id: getRandomNumber(8),
                username: data.username,
                image: data.image,
            },
        });
        return user;
    } catch (error) {
        console.log(error);
    }
};
