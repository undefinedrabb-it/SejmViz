import nba from '@next/bundle-analyzer';

const withBundleAnalyzer = nba({
  enabled: process.env.ANALYZE === 'true',
});

/** @type {import("next").NextConfig} */
const config = {
  images: {
    remotePatterns: [{ hostname: 'api.sejm.gov.pl' }],
  },
  reactStrictMode: true,
};
export default withBundleAnalyzer(config);
