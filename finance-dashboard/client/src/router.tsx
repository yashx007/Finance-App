import { Routes, Route, Navigate, BrowserRouter as Router } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Analytics from "./pages/Analytics";
import Users from "./pages/Users";
import Settings from "./pages/Settings";
import { useAuth } from "./auth/useAuth";
import DashboardLayout from "./layouts/DashboardLayout";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isLoggedIn } = useAuth();
  return isLoggedIn ? children : <Navigate to="/login" />;
};

const AppRouter = ({
  mode,
  toggleTheme,
}: {
  mode: "light" | "dark";
  toggleTheme: () => void;
}) => (
  <Router>
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardLayout mode={mode} toggleTheme={toggleTheme}>
              <Dashboard />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/analytics"
        element={
          <ProtectedRoute>
            <DashboardLayout mode={mode} toggleTheme={toggleTheme}>
              <Analytics />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/users"
        element={
          <ProtectedRoute>
            <DashboardLayout mode={mode} toggleTheme={toggleTheme}>
              <Users />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/settings"
        element={
          <ProtectedRoute>
            <DashboardLayout mode={mode} toggleTheme={toggleTheme}>
              <Settings />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />
    </Routes>
  </Router>
);

export default AppRouter;
