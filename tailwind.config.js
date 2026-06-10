/** @type {import('tailwindcss').Config} */
const subTrackTokens = {
  colors: {
    brand: {
      primary: "#A1401E",
      primarySoft: "#EF7A53",
      navy: "#2B303D",
      navyDark: "#161C27",
      mint: "#B8EDE3",
      peach: "#FFB59D",
    },
    background: {
      app: "#FDFCF0",
      appAlt: "#F5F0E6",
      surface: "#FFFFFF",
      surfaceMuted: "#FDFCF0",
      track: "#DDE2F2",
    },
    text: {
      primary: "#161C27",
      secondary: "#57423C",
      inverse: "#FFFFFF",
      accent: "#A1401E",
    },
  },
  fontFamily: {
    app: ["Inter"],
  },
  fontSize: {
    statusBar: ["14px", { lineHeight: "20px", letterSpacing: "0.14px" }],
    heroTitle: ["28px", { lineHeight: "34px", letterSpacing: "-0.7px" }],
    heroSubtitle: ["18px", { lineHeight: "29.25px" }],
    button: ["18px", { lineHeight: "28px" }],
    caption: ["14px", { lineHeight: "20px", letterSpacing: "0.14px" }],
  },
  spacing: {
    xs: "4px",
    sm: "8px",
    md: "12px",
    lg: "16px",
    xl: "20px",
    "2xl": "24px",
    "3xl": "32px",
    "4xl": "48px",
    "5xl": "64px",
    screenX: "20px",
    heroSectionX: "24px",
    heroContentX: "40px",
  },
  borderRadius: {
    pill: "9999px",
    card: "32px",
    soft: "20px",
    small: "12px",
  },
  height: {
    primaryButton: "64px",
    statusBar: "48px",
    homeIndicator: "4px",
  },
  width: {
    homeIndicator: "128px",
  },
};

module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./screens/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: subTrackTokens,
  },
  plugins: [],
};
