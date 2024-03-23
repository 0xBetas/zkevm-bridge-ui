import { createUseStyles } from "react-jss";

import { Theme } from "src/styles/theme";

const useAppStyles = createUseStyles((theme: Theme) => ({
  "@font-face": [
    // {
    //   fontFamily: "Modern Era",
    //   src: "url('/fonts/modern-era/ModernEra-Regular.woff2') format('woff2')",
    //   fallbacks: [
    //     { src: "url('/fonts/modern-era/ModernEra-Regular.woff') format('woff')" },
    //     { src: "url('/fonts/modern-era/ModernEra-Regular.ttf') format('truetype')" },
    //   ],
    //   fontWeight: 400,
    //   fontStyle: "normal",
    // },
    // {
    //   fontFamily: "Modern Era",
    //   src: "url('/fonts/modern-era/ModernEra-Medium.woff2') format('woff2')",
    //   fallbacks: [
    //     { src: "url('/fonts/modern-era/ModernEra-Medium.woff') format('woff')" },
    //     { src: "url('/fonts/modern-era/ModernEra-Medium.ttf') format('truetype')" },
    //   ],
    //   fontWeight: 500,
    //   fontStyle: "normal",
    // },
    // {
    //   fontFamily: "Modern Era",
    //   src: "url('/fonts/modern-era/ModernEra-Bold.woff2') format('woff2')",
    //   fallbacks: [
    //     { src: "url('/fonts/modern-era/ModernEra-Bold.woff') format('woff')" },
    //     { src: "url('/fonts/modern-era/ModernEra-Bold.ttf') format('truetype')" },
    //   ],
    //   fontWeight: 700,
    //   fontStyle: "normal",
    // },
    // {
    //   fontFamily: "Modern Era",
    //   src: "url('/fonts/modern-era/ModernEra-ExtraBold.woff2') format('woff2')",
    //   fallbacks: [
    //     { src: "url('/fonts/modern-era/ModernEra-ExtraBold.woff') format('woff')" },
    //     { src: "url('/fonts/modern-era/ModernEra-ExtraBold.ttf') format('truetype')" },
    //   ],
    //   fontWeight: 800,
    //   fontStyle: "normal",
    // },
    {
      fontFamily: "Georama",
      src: "url('/fonts/Georama/Georama-ExtraBold.ttf')",
      fontWeight: 800,
      fontStyle: "normal",
    },
    {
      fontFamily: "Georama",
      src: "url('/fonts/Georama/Georama-ExtraBoldItalic.ttf')",
      fontWeight: 800,
      fontStyle: "italic",
    },
    {
      fontFamily: "Georama",
      src: "url('/fonts/Georama/Georama-Medium.ttf')",
      fontWeight: 700,
      fontStyle: "normal",
    },
    {
      fontFamily: "Georama",
      src: "url('/fonts/Georama/Georama-MediumItalic.ttf')",
      fontWeight: 700,
      fontStyle: "italic",
    },
    {
      fontFamily: "Georama",
      src: "url('/fonts/Georama/Georama-Medium.ttf')",
      fontWeight: 400,
      fontStyle: "normal",
    },
    {
      fontFamily: "Georama",
      src: "url('/fonts/Georama/Georama-MediumItalic.ttf')",
      fontWeight: 400,
      fontStyle: "italic",
    },
  ],
  "@global": {
    "*": {
      boxSizing: "border-box",
    },
    body: {
      fontFamily: "Georama",
      fontSize: 16,
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      color: theme.palette.black,
      // color: theme.palette.brand,
      backgroundImage: "url(/bg.png)",
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
    },
    "#app-root": {
      zIndex: 0,
      position: "relative",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      flex: 1,
    },
    "#portal-root": {
      zIndex: 1,
    },
    a: {
      textDecoration: "none",
      color: "inherit",
    },
    "input[type='search']::-webkit-search-cancel-button": {
      "-webkit-appearance": "none",
    },
  },
}));

export default useAppStyles;
