/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  experimental: {
    optimizePackageImports: ["lucide-react"]
  },
  images: {
    unoptimized: true
  },
  typescript: {
    tsconfigPath: "tsconfig.json"
  }
};

export default nextConfig;
