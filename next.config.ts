import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Lets the laptop on the same network load the dev scripts from this computer.
  allowedDevOrigins: ["172.20.10.2"],
};

export default nextConfig;
