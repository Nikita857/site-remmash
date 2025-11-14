import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typedRoutes: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'remmash.ru',
      },
      {
        protocol: 'https',
        hostname: 'www.remmash.ru',
      },
    ],
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  
  // Добавьте эту строку для Turbopack
  turbopack: {},
  
  // Оставьте webpack конфиг для продакшн сборки
  webpack: (config, { isServer, dev }) => {
    // Отключаем кастомный webpack в dev режиме с Turbopack
    if (dev) {
      return config;
    }
    
    // Настройка для работы bcrypt в Next.js (только для продакшн)
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        crypto: require.resolve("crypto-browserify"),
        stream: require.resolve("stream-browserify"),
      };
    }
    return config;
  },
  
  // Security headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
    ];
  },
};

export default nextConfig;