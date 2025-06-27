import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Paper,
  TextField,
  Button,
  Typography,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import axios from "../api/axios";
import { useAuth } from "../auth/useAuth";

interface AuthFormProps {
  isLogin?: boolean;
}

const AuthForm = ({ isLogin = true }: AuthFormProps) => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleTogglePassword = () => setShowPassword((prev) => !prev);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const endpoint = isLogin ? "/auth/login" : "/auth/signup";
      const res = await axios.post(endpoint, { email, password });
      login(res.data.token);
      navigate("/dashboard");
    } catch (err: any) {
      setError(err.response?.data?.message || "Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      height="100vh"
      width="100vw"
      display="flex"
      justifyContent="center"
      alignItems="center"
      sx={{
        background: `linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Paper
        elevation={8}
        sx={{
          p: 4,
          width: "100%",
          maxWidth: 420,
          borderRadius: 4,
          backdropFilter: "blur(10px)",
          backgroundColor: "rgba(255, 255, 255, 0.75)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
          transition: "transform 0.3s ease",
          '&:hover': {
            transform: "translateY(-5px)",
          },
        }}
      >
        <Typography variant="h5" fontWeight={700} mb={3} textAlign="center" color="primary">
          {isLogin ? "Welcome Back 👋" : "Create Your Account"}
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Email"
            variant="outlined"
            type="email"
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <TextField
            fullWidth
            label="Password"
            variant="outlined"
            type={showPassword ? "text" : "password"}
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleTogglePassword} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          {error && (
            <Typography color="error" mt={1} fontSize={14} textAlign="center">
              {error}
            </Typography>
          )}

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 3, py: 1.5, borderRadius: 3, fontWeight: 600 }}
            disabled={loading}
          >
            {loading ? (isLogin ? "Logging in..." : "Signing up...") : isLogin ? "Login" : "Sign Up"}
          </Button>
        </form>

        <Button
          onClick={() => navigate(isLogin ? "/signup" : "/login")}
          sx={{ mt: 2, fontSize: 14, textTransform: "none", fontWeight: 500 }}
          fullWidth
        >
          {isLogin ? "Don't have an account? Sign up" : "Already have an account? Login"}
        </Button>
      </Paper>
    </Box>
  );
};

export default AuthForm;
