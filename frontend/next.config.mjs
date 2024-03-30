
/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
        domains: ['s3.ap-south-1.amazonaws.com', 'lh3.googleusercontent.com', 'encrypted-tbn0.gstatic.com', 'res.cloudinary.com'],
    },
};

export default nextConfig;

