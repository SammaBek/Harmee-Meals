module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    debugScreens: {
      position: ["top", "left"],
    },
    extend: {},
  },
  plugins: [
    require("tailwindcss-debug-screens"),
    require("@tailwindcss/aspect-ratio"),
  ],
};
