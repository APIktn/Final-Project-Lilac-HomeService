import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const AdminAuthContext = React.createContext();

function AdminAuthProvider(props) {
  const [state, setState] = useState({
    loading: null,
    error: null,
    admin: null,
  });

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("admin-token");
    if (token) {
      try {
        const adminDataFromToken = jwtDecode(token);
        setState((prevState) => ({ ...prevState, admin: adminDataFromToken }));
      } catch (error) {
        console.error("Token decoding failed", error);
        localStorage.removeItem("admin-token");
        setState({ ...state, admin: null });
      }
    }
  }, []);

  useEffect(() => {
    setState((prevState) => ({ ...prevState, error: null }));
  }, [location.pathname]);

  const login = async (data) => {
    try {
      const result = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/auth/login/admin`,
        data
      );
      const { token } = result.data;
      localStorage.setItem("admin-token", token);
      const adminDataFromToken = jwtDecode(token);
      setState({ ...state, admin: adminDataFromToken, error: null });
      navigate("/");
    } catch (error) {
      setState({
        ...state,
        error: error.response?.data?.error || "อีเมลหรือรหัสผ่านไม่ถูกต้อง",
      });
    }
  };

  const logout = () => {
    localStorage.removeItem("admin-token");
    setState({ ...state, admin: null, error: null });
    navigate("/admin");
  };

  const isAuthenticated = Boolean(localStorage.getItem("admin-token"));

  return (
    <AdminAuthContext.Provider
      value={{ state, login, logout, isAuthenticated }}
    >
      {props.children}
    </AdminAuthContext.Provider>
  );
}

const useAdminAuth = () => React.useContext(AdminAuthContext);

export { AdminAuthProvider, useAdminAuth };
