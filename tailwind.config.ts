import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  darkMode: "class",
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      colors: {
        purple: "#A729F5",
        dark_navy: "#313E51",
        navy: "#3B4D66",
        grey_navy: "#626C7F",
        light_bluish: "#ABC1E1",
        ligh_grey: "#F4F6FA",
        success: "#26D782",
        error: "#EE5454",
      },
      screens: {
        xl: '1440px'
      },
    },
  },
  plugins: [],
} satisfies Config;
