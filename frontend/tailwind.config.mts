import { PluginAPI } from "tailwindcss/types/config";

const url =
  "http://localhost:8080";

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './index.html'],
  theme: {
    extend: {
      backgroundImage: {
        'header': `url('${url}/images/header_img-1729942429481-165600939.webp')`,
      },
      height: {
        'full-screen': '100vh',
      },
      width: {
        'recaptcha': '100%',
      },
    },
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
      '3xl': '1920px',
    }
  },
  plugins: [
    function ({ addUtilities }: PluginAPI) {
      addUtilities({
        /* Hide scrollbar for Firefox */
        '.hide-scrollbar': {
          "-ms-overflow-style": "none",  /* IE and Edge */
          "scrollbar-width": "none",  /* Firefox */
          overflowX: "scroll",
        },
        '.hide-scrollbar::-webkit-scrollbar': {
          display: 'none',
        },
        '*': {
          "scroll-behavior": "smooth",
          "user-select": "none",
        }
      });
    },
  ],
};
