import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    mode: "light", // keeps the body background light
    primary: {
      main: "#000000", // black
      contrastText: "#ffffff", // text on black
    },
    background: {
      default: "#ffffff", // overall page background
      paper: "#000000", // surfaces like cards/dialogs/menus
    },
    text: {
      primary: "#000000", // main body text
      secondary: "#555555", // slightly dimmed
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: "#000000",
          color: "#ffffff",
          "&:hover": {
            backgroundColor: "#222222",
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: "#000000",
          color: "#ffffff",
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#000000",
          color: "#ffffff",
        },
      },
    },
  },
});

export default theme;
