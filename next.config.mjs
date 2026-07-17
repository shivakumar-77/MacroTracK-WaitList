/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Firestore's SDK is large; keeping it out of the RSC bundle boundary
  // is handled automatically since all Firebase calls happen in
  // client components ("use client"), never in server components.
};

export default nextConfig;
