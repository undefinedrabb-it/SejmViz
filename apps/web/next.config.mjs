
//@ts-check

// eslint-disable-next-line @typescript-eslint/no-var-requires
import { composePlugins, withNx } from '@nx/next';
import nba from '@next/bundle-analyzer';

const withBundleAnalyzer = nba({
  enabled: process.env.ANALYZE === 'true',
});


/** @type {import('@nx/next/plugins/with-nx').WithNxOptions} */
const config = {
  nx: {
    // Set this to true if you would like to use SVGR
    // See: https://github.com/gregberge/svgr
    svgr: false,
  },
  images: {
    remotePatterns: [{ hostname: 'api.sejm.gov.pl', pathname: '/**' }],
  },
  experimental: {
    typedRoutes: true,
  },
  reactStrictMode: true,
};
const plugins = [
  // Add more Next.js plugins to this list if needed.
  withNx,
  withBundleAnalyzer
];
export default composePlugins(...plugins)(config);


