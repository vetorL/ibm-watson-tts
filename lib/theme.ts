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
    MuiAutocomplete: {
      styleOverrides: {
        paper: {
          backgroundColor: "#ffffff", // Set the dropdown background color
          color: "#000000", // Set the text color for the dropdown
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", // Optional: add a subtle shadow to the dropdown
        },
        option: {
          color: "#000000", // Set the text color for the options
          "&:hover": {
            backgroundColor: "#f5f5f5", // Hover background color for options
          },
          "&.Mui-focused": {
            backgroundColor: "#eeeeee", // Focused option background color
          },
        },
        inputRoot: {
          color: "#000000", // Text color inside the input
        },
        input: {
          color: "#000000", // Input text color
        },
      },
    },
  },
});

export default theme;
