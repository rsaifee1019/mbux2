/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
      ignoreDuringBuilds: true,
    },
    unstable_noStore: true,
    unstable_runtimeJS: true,
  }
  
  export default nextConfig;
