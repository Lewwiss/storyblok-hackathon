import type { NextConfig } from "next";
import dotenv from "dotenv";

dotenv.config({ path: ".env" });

const path = require("path");

const nextConfig: NextConfig = {
  turbopack: {
    root: path.join(__dirname, '..'),
  }
};

export default nextConfig;
