/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        wiggle: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
      },
      animation: {
        wiggle: "wiggle 1s ease-in-out infinite",
      },
      colors: {
        "daisy-bush": {
          50: "#faf6fe",
          100: "#f2e9fe",
          200: "#e7d7fd",
          300: "#d5b8fa",
          400: "#bb8bf5",
          500: "#a15eee",
          600: "#8b3de0",
          700: "#762bc5",
          800: "#6629a3",
          900: "#522281",
          950: "#360c5f",
        },
        smoky: {
          50: "#f7f6f9",
          100: "#f0edf1",
          200: "#dbd6e1",
          300: "#bbb3c6",
          400: "#968aa6",
          500: "#796b8c",
          600: "#655775",
          700: "#52465e",
          800: "#453d4f",
          900: "#3d3644",
          950: "#29242d",
        },
      },
    },
  },
  plugins: [],
};
