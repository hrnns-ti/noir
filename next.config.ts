import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'myanimelist.net',
        pathname: '/**', // Mengizinkan semua path gambar dari domain ini
      },
      // Jikan API sering kali juga mengembalikan URL gambar dari CDN MyAnimeList
      // Jadi sekalian kita whitelist CDN-nya untuk berjaga-jaga
      {
        protocol: 'https',
        hostname: 'cdn.myanimelist.net',
        pathname: '/**',
      }
    ]
  }
};

export default nextConfig;