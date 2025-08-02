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
      colors: {},
      textColor: ["group-hover"],
      backgroundColor: ["group-hover"],
      opacity: ["group-hover"],
    },
  },
  plugins: [flowbite, scrollbarHide],
};
