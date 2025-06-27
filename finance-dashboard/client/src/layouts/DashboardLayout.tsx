
import { useNavigate, useLocation } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import type { ReactNode } from "react";
import {
  Box,
  CssBaseline,
  Drawer,
  Toolbar,
  Typography,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";
import {
  Dashboard as DashboardIcon,
  BarChart as BarChartIcon,
  Group as GroupIcon,
  Settings as SettingsIcon,
  Logout as LogoutIcon,
} from "@mui/icons-material";
import Topbar from "../components/Topbar";

const drawerWidth = 240;

interface Props {
  children: ReactNode;
  toggleTheme: () => void;
  mode: "light" | "dark";
}

const menuItems = [
  { label: "Dashboard", icon: <DashboardIcon />, path: "/dashboard" },
  { label: "Analytics", icon: <BarChartIcon />, path: "/analytics" },
  { label: "Users", icon: <GroupIcon />, path: "/users" },
  { label: "Settings", icon: <SettingsIcon />, path: "/settings" },
];

const DashboardLayout = ({ children, toggleTheme, mode }: Props) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      {/* Sidebar */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
            backgroundColor: theme.palette.background.paper,
            color: theme.palette.text.primary,
            borderRight: `1px solid ${theme.palette.divider}`,
          },
        }}
      >
        <Toolbar>
          <Typography
            variant="h6"
            fontWeight={700}
            sx={{ mx: "auto", letterSpacing: 1 }}
          >
            FinanceApp
          </Typography>
        </Toolbar>
        <Divider />

        <List sx={{ flexGrow: 1 }}>
          {menuItems.map((item) => (
            <ListItemButton
              key={item.path}
              onClick={() => navigate(item.path)}
              selected={isActive(item.path)}
              sx={{
                mx: 1,
                borderRadius: 2,
                my: 0.5,
                "&.Mui-selected": {
                  backgroundColor: "#00C85322",
                },
                "&:hover": {
                  backgroundColor: "#00C85311",
                },
              }}
            >
              <ListItemIcon sx={{ color: "inherit" }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          ))}
        </List>

        <Divider />

        <Box sx={{ mt: "auto", mb: 2 }}>
          <ListItemButton
            onClick={handleLogout}
            sx={{
              mx: 1,
              borderRadius: 2,
              "&:hover": {
                backgroundColor: "#f4433611",
              },
            }}
          >
            <ListItemIcon sx={{ color: "inherit" }}>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItemButton>
        </Box>
      </Drawer>

      {/* Main content area */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: "background.default",
          width: `calc(100% - ${drawerWidth}px)`,
          minHeight: "100vh",
        }}
      >
        <Topbar toggleTheme={toggleTheme} mode={mode} />
        <Toolbar />
        <Box sx={{ px: 4, py: 2 }}>{children}</Box>
      </Box>
    </Box>
  );
};

export default DashboardLayout;
