import { useNavigate, useRoutes } from "react-router-dom";
import { routes } from "./routes";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "./context/AuthContext";
import { toast } from "react-toastify";
export default function App() {
  const element = useRoutes(routes);
  const { isLogin, role } = useContext(AuthContext);

  const navigate = useNavigate();
  useEffect(() => {
    if (!isLogin) {
      if (window.location.href.includes("admin")) navigate("/admin/login");
      else if (window.location.href.includes("owner")) navigate("/owner/login");
      else {
        navigate("/");
      }
    }
  }, [isLogin]);
  return <div>{element}</div>;
}
