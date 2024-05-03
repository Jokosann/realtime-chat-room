/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'd9ltsbxrfakgaohq.public.blob.vercel-storage.com',
      },
    ],
  },
};

export default nextConfig;
