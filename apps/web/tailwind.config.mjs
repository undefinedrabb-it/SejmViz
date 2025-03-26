/** @type {import('tailwindcss').Config} */
export const content = [
  './{src,pages,components,app}/**/*.{ts,tsx,js,jsx,html}',
  '!./{src,pages,components,app}/**/*.{stories,spec}.{ts,tsx,js,jsx,html}',
];
export const theme = {
  extend: {
    gridTemplateColumns: {
      23: 'repeat(23, minmax(0, 1fr))',
    },
  },
};
export const plugins = [];
