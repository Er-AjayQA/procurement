import flowbite from "flowbite/plugin";
import scrollbarHide from "tailwind-scrollbar-hide";
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
        body: {
          bg_color: "#140843",
        },
        borders: {
          dark: "#00000037",
          light: "#0000004a",
          inputHover: "#d1d5db",
        },
        button: {
          color: "#140843",
          hover: "#362A65",
        },
      },
      textColor: ["group-hover"],
      backgroundColor: ["group-hover"],
      opacity: ["group-hover"],
    },
  },
  plugins: [flowbite, scrollbarHide],
};
