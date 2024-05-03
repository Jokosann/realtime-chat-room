import { createUserValidation, updateUserValidation } from '@/validations/user-validation';
import { signIn } from 'next-auth/react';
import { upload } from '@vercel/blob/client';
import { getRandomNumber } from '@/services/user-service';

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

export const updateUser = async (img: string, prevState: unknown, formData: FormData) => {
  const validateFields = updateUserValidation.safeParse(Object.fromEntries(formData.entries()));

  if (!validateFields.success) {
    return { error: validateFields.error.flatten().fieldErrors };
  }

  const { username, image } = validateFields.data;

  let imagePath;

  if (!image || image.size <= 0) {
    imagePath = img;
  } else {
    const newBlob = await upload(image.name, image, {
      access: 'public',
      handleUploadUrl: '/api/image-upload',
    });
    imagePath = newBlob.url;
  }

  try {
    await signIn('credentials', {
      redirect: false,
      username: username,
      image: imagePath,
    });
    return { message: 'success' };
  } catch (error) {
    return { message: error };
  }
};

export const createUserSession = async (data: { username: string; image: string }) => {
  const user = {
    user_id: getRandomNumber(8),
    username: data.username,
    image: data.image,
  };
  return user;
};
