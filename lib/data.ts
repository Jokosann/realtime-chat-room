import { put } from '@vercel/blob';
import { prisma } from './prisma';

export const getUserById = async (id: string) => {
    try {
        const user = await prisma.user.findUnique({
            where: { id },
        });
        return user;
    } catch (error) {
        throw new Error('Failed to fetch data');
    }
};

export const urlPath = async (image: File) => {
    const { url } = await put(image.name, image, {
        access: 'public',
        multipart: true,
    });

    return url;
};
