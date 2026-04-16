import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  outputFileTracingIncludes: {
    '/api/download/food-cost-tracker': ['./public/downloads/*.xlsx'],
  },
};

export default withNextIntl(nextConfig);
