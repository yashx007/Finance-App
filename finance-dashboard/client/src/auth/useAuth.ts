import { useAuthContext } from "./AuthProvider";

export const useAuth = () => {
  const { token, login, logout } = useAuthContext();

  return {
    isLoggedIn: !!token,
    token,
    login,
    logout,
  };
};
