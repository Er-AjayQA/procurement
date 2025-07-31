import flowbite from "flowbite/plugin";
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#2563EB", // Blue (Primary Action)
          dark: "#1E40AF", // Darker Blue (Hover)
        },
        secondary: "#F3F4F6", // Light Gray (Background)
        accent: "#0D9488",
        emerald_green: "#10B981",
        dark_gray: "#1F2937",
        success: "#10B981", // Green (Success/Confirm)
        warning: "#F59E0B", // Orange (Warning)
        error: "#DC2626", // Red (Error/Danger)
        dark: {
          bg: "#1E293B", // Dark Mode Background
          text: "#E5E7EB", // Light Text
        },
      },
    },
  },
  plugins: [flowbite],
};
