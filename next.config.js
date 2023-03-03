/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    SHOPIFY_STORE_DOMAIN: process.env.SHOPIFY_STORE_DOMAIN,
    SHOPIFY_STOREFRONT_ACCESSTOKEN: process.env.SHOPIFY_STOREFRONT_ACCESSTOKEN
  },
  reactStrictMode: true,
  images: {
    domains: ['cdn.shopify.com','storage.googleapis.com'],
  },
}

module.exports = nextConfig
