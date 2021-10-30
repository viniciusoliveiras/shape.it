/* eslint-disable @typescript-eslint/no-var-requires */
const withPWA = require('next-pwa');

const prod = process.env.NODE_ENV === 'production';

module.exports = withPWA({
  pwa: {
    dest: 'public',
    register: true,
    skipWaiting: true,
    disable: !prod,
  },
  reactStrictMode: true,
});

// const withBundleAnalyzer = require('@next/bundle-analyzer')({
//   enabled: process.env.ANALYZE === 'true',
// });

// module.exports = withBundleAnalyzer({});
