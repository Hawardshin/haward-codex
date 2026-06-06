/** @type {import('next').NextConfig} */
const productionStaticExport = process.env.NODE_ENV === "production";

const nextConfig = {
  ...(productionStaticExport
    ? {
        output: "export",
        assetPrefix: "./"
      }
    : {}),
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
