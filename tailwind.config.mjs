/** @type {import('tailwindcss').Config} */
export const content = ['./src/**/*.{js,ts,jsx,tsx}'];
export const theme = {
  extend: {
    gridTemplateColumns: {
      23: 'repeat(23, minmax(0, 1fr))',
    },
  },
};
export const plugins = [];
