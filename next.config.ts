import { url } from "inspector";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns:[new URL('https://api.jikan.moe/v4/**'), new URL('https://myanimelist.net/**')]
  }
};

export default nextConfig;
