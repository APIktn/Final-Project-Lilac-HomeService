import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const TechnicianAuthContext = React.createContext();

function TechnicianAuthProvider(props) {
  const [state, setState] = useState({
    loading: null,
    error: null,
    technician: null,
  });

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("technician-token");
    if (token) {
      try {
        const technicianDataFromToken = jwtDecode(token);
        setState((prevState) => ({
          ...prevState,
          technician: technicianDataFromToken,
        }));
      } catch (error) {
        console.error("Token decoding failed", error);
        localStorage.removeItem("technician-token");
        setState((prevState) => ({ ...prevState, technician: null }));
      }
    }
  }, []);

  useEffect(() => {
    setState((prevState) => ({ ...prevState, error: null }));
  }, [location.pathname]);

  const register = async (data) => {
    try {
      await axios.post(`${import.meta.env.VITE_API_BASE_URL}/auth/register/technician`, data);
      navigate("/technician");
    } catch (error) {
      setState({
        ...state,
        error: error.response?.data?.error || "การลงทะเบียนล้มเหลว",
      });
    }
  };

  const login = async (data) => {
    try {
      const result = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/auth/login/technician`,
        data
      );
      const { token } = result.data;
      localStorage.setItem("technician-token", token);
      const technicianDataFromToken = jwtDecode(token);
      setState({ ...state, technician: technicianDataFromToken, error: null });
      navigate("/technician");
    } catch (error) {
      setState({
        ...state,
        error: error.response?.data?.error || "อีเมลหรือรหัสผ่านไม่ถูกต้อง",
      });
    }
  };

  const logout = () => {
    localStorage.removeItem("technician-token");
    setState({ ...state, technician: null, error: null });
  };

  const isAuthenticated = Boolean(localStorage.getItem("technician-token"));

  return (
    <TechnicianAuthContext.Provider
      value={{ state, login, logout, register, isAuthenticated }}
    >
      {props.children}
    </TechnicianAuthContext.Provider>
  );
}

const useTechnicianAuth = () => React.useContext(TechnicianAuthContext);

export { TechnicianAuthProvider, useTechnicianAuth };
