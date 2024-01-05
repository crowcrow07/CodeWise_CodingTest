/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        BLACK: "#191919",
        BORDER: "#CDD0E5",
        SIDE_BAR: "#818DA5",
        WINDOW_HEADER: "#2E3E76",
        BUTTON_BORDER: "#B3B6C7",
        INPUT: "#F2F4F7",
        MAIL_COUNTER_FONT: "#698CC2",
        MAIL_COUNTER: "#DDEBFF",
        BACKGROUND: "#EDEEF3",
        TABLE_FOOTER: "#D9DAE2",
        SELECT_HIGHLIGHT: "#FFFBD8",
        SETTING_HEADER: "#7E8DA7",
      },
    },
  },
  plugins: [],
};
