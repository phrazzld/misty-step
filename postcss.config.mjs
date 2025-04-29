// postcss.config.mjs
import autoprefixer from "autoprefixer";
import nesting from "postcss-nesting";
import tailwindcss from "tailwindcss";

const config = {
  plugins: [
    nesting(), // MUST come before tailwindcss
    tailwindcss(),
    autoprefixer(),
  ],
};

export default config;
