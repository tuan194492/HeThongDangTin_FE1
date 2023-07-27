import * as React from "react";
import { createContext, useState, useEffect } from "react";

const defaultAuthContext = {
  token: "",
  role: "",
  isLogin: false,
  user: null,
};

export const AuthContext = React.createContext(defaultAuthContext);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [role, setRole] = useState(
    localStorage.getItem("role") !== null ? localStorage.getItem("role") : ""
  );
  const [isLogin, setIsLogin] = useState(
    localStorage.getItem("isLogin") === "true"
  );
  const [user, setUser] = useState(
    localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null
  );

  useEffect(() => {
    const role =
      localStorage.getItem("role") !== null
        ? localStorage.getItem("role")
        : "0";
    setToken(localStorage.getItem("token"));
    setRole(role);
    setIsLogin(localStorage.getItem("isLogin") === "true");
    setUser(
      localStorage.getItem("user")
        ? JSON.parse(localStorage.getItem("user"))
        : null
    );
  }, [token]);

  const setAuthData = (token, role, user, permission) => {
    localStorage.setItem("token", token);
    localStorage.setItem("role", JSON.stringify(role));
    localStorage.setItem("isLogin", JSON.stringify(true));
    localStorage.setItem("user", JSON.stringify(user));
    setToken(token);
    setIsLogin(true);
    setRole(role);
    setUser(user);
  };
  const clearAuthData = () => {
    localStorage.clear();
    setIsLogin(false);
    setRole("");
    setToken("");
    setUser(null);
  };

  const contextData = {
    token,
    role,
    isLogin,
    user,
    setAuthData,
    clearAuthData,
  };

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};
