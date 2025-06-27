
import { createTheme } from "@mui/material/styles";

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    background: {
      default: "#f9f9f9",
    },
    primary: {
      main: "#1976d2",
    },
  },
});


const commonPalette = {
  revenue: "#4caf50",
  expense: "#f44336",
  savings: "#00c853",
  background: "#1A1D26",
  card: "#232734",
  textPrimary: "#FFFFFF",
  textSecondary: "#A0A4AF",
  border: "#2C2F3A",
};

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: commonPalette.background,
      paper: commonPalette.card,
    },
    primary: {
      main: "#00C853",
    },
    secondary: {
      main: "#2196F3",
    },
    text: {
      primary: commonPalette.textPrimary,
      secondary: commonPalette.textSecondary,
    },
    divider: commonPalette.border,
  },
  typography: {
    fontFamily: `"Inter", "Roboto", "Helvetica", "Arial", sans-serif`,
    h4: {
      fontWeight: 700,
      fontSize: "2rem",
    },
    h6: {
      fontWeight: 600,
      fontSize: "1rem",
    },
    body1: {
      fontSize: "0.95rem",
    },
    subtitle2: {
      color: commonPalette.textSecondary,
    },
  },
  shape: {
    borderRadius: 12,
  },
});
