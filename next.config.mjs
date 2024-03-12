/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "thread-app-depoly.netlify.app",
      },
    ],
  },
};

export default nextConfig;
