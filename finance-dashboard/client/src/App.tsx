import { CssBaseline, ThemeProvider } from "@mui/material";
import { useState } from "react";
import { lightTheme, darkTheme } from "./theme";
import { AuthProvider } from "./auth/AuthProvider";
import AppRouter from "./router";

function App() {
  const [mode, setMode] = useState<"light" | "dark">("light");

  const toggleTheme = () => {
    setMode((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <ThemeProvider theme={mode === "light" ? lightTheme : darkTheme}>
      <CssBaseline />
      <AuthProvider>
        <AppRouter mode={mode} toggleTheme={toggleTheme} />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
