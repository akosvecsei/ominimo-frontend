import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

export function useLogin() {
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function login({ email, password, redirectTo = "/" }) {
    setLoading(true);

    try {
      const response = await fetch("http://127.0.0.1:8000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        const token = data.token.split("|")[1];
        const user = data.user;

        sessionStorage.setItem("token", token);
        sessionStorage.setItem("name", user.name);
        sessionStorage.setItem("email", user.email);

        navigate(redirectTo);
      } else {
        //baj van
      }
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  }

  return { login, isLoading };
}

export function useRegister() {
    const [isLoading, setLoading] = useState(false);
    const navigate = useNavigate();
  
    async function register({ name, email, password, password_confirmation, redirectTo = "/" }) {
      setLoading(true);
  
      try {
        const response = await fetch("http://127.0.0.1:8000/api/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            password,
            password_confirmation,
          }),
        });
  
        const data = await response.json();
  
        if (response.ok) {
          const token = data.token.split("|")[1];
          const user = data.user;
  
          sessionStorage.setItem("token", token);
          sessionStorage.setItem("name", user.name);
          sessionStorage.setItem("email", user.email);
  
          navigate(redirectTo);
        } else {
          //baj
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
  
    return { register, isLoading };
  }

  export function useLogout() {
    const [isLoading, setLoading] = useState(false);
    const navigate = useNavigate();
  
    const logout = async () => {
      setLoading(true);
  
      try {
        const token = sessionStorage.getItem("token");
  
        if (token) {
          await axios.post(
            'http://localhost:8000/api/logout',
            {},
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
        }
  
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("name");
        sessionStorage.removeItem("email");
  
        navigate("/login");
      } catch (error) {
        console.error("Logout hiba: ", error);
      } finally {
        setLoading(false);
      }
    };
  
    return { logout, isLoading };
  }