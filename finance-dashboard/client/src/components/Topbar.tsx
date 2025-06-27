
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Tooltip,
  Avatar,
} from "@mui/material";
import { Brightness4, Brightness7, Notifications } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import logo from "../assets/logo.svg";
import "../styles/Topbar.css"; 

interface TopbarProps {
  toggleTheme: () => void;
  mode: "light" | "dark";
}

const Topbar = ({ toggleTheme, mode }: TopbarProps) => {
  const theme = useTheme();

  return (
    <AppBar
      position="fixed"
      color="default"
      elevation={0}
      sx={{
        backgroundColor: theme.palette.background.paper,
        zIndex: theme.zIndex.drawer + 1,
        borderBottom: `1px solid ${theme.palette.divider}`,
        px: 2,
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* Logo + App Name */}
        <Box className="topbar-logo-container">
          <img src={logo} alt="Logo" width={32} height={32} />
          <Typography variant="h6" className="topbar-title">
            FinanceApp
          </Typography>
        </Box>

        {/* Right actions */}
        <Box className="topbar-actions">
          <Tooltip title="Toggle Theme">
            <IconButton onClick={toggleTheme}>
              {mode === "dark" ? <Brightness7 /> : <Brightness4 />}
            </IconButton>
          </Tooltip>

          <Tooltip title="Notifications">
            <IconButton>
              <Notifications />
            </IconButton>
          </Tooltip>

          <Avatar
            alt="User"
            src="https://thispersondoesnotexist.com/"
            className="topbar-avatar"
          />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Topbar;
