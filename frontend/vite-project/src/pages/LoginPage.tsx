import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Input from "../components/input";
import Button from "../components/button";
import { UserLoginData } from "../types/userLoginData";
import "../styling/LoginForm.css";
import { useAuth } from "../hooks/useAuthLogin";
import { isPasswordThere, isEmailThere, isUsernameThere } from "../utils/utils";

export default function LoginPage() {
  const navigate = useNavigate();

  function goToLandingPage() {
    navigate("/");
  }

  function goToRecruiterPage() {
    navigate("/recruiter");
  }

  const { login, isLoading, role, error } = useAuth();

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    username: "",
  });


  // Initialize userData from localStorage if available
  const [userData, setUserData] = useState<UserLoginData>(() => {
    const savedData = localStorage.getItem('userLoginData');
    if (savedData) {
      try {
        return JSON.parse(savedData);
      } catch (error) {
        console.error('Failed to parse saved user login data:', error);
        localStorage.removeItem('userLoginData');
      }
    }
    return {
      email: "",
      password: "",
      username: "",
    };
  });

  // Persist userData on every change
  useEffect(() => {
    localStorage.setItem('userLoginData', JSON.stringify(userData));
  }, [userData]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

async function onSubmit(event: React.FormEvent) {
  event.preventDefault();

  const validationErrors = {
    email: isEmailThere(userData.email) ? "You need to provide an email address" : "",
    password: isPasswordThere(userData.password) ? "You need to provide a password" : "",
    username: isUsernameThere(userData.username) ? "You need to provide a userName" : "",
  };

  setErrors(validationErrors);

  const hasErrors =
    (validationErrors.email !== "" && validationErrors.username !== "") ||
    validationErrors.password !== "";
  if (hasErrors) {
    return;
  }

  // Capture the error directly (null or the string error)
  const loginError = await login(userData);
  if (!loginError) {
    navigate("/");
  } else {
    console.error("Login failed:", loginError);
  }
}
  // Redirect when role is set
  useEffect(() => {
    if (role === 2) {
      goToLandingPage();
    } else if (role === 1) {
      goToRecruiterPage();
    }
  }, [role, navigate]); // Runs when role changes

  

  return (
    <div className="page-container">
      <NavLink to="/" className="company-name">
        Leos jobbland.
      </NavLink>
      <div className="form-container">
        <h2>Logga in</h2>
        <form onSubmit={onSubmit}>
          <Input
            placeholder="Email or username"
            borderColor="#ccc"
            name="email"
            value={userData.email}
            onChange={handleInputChange}
            type="text"
            width="500px"
          />
          {errors.email && <p className="error-message">{errors.email}</p>}
          <Input
            placeholder="Password"
            borderColor="#ccc"
            name="password"
            value={userData.password}
            onChange={handleInputChange}
            type="password"
            width="500px"
          />
          {errors.password && <p className="error-message">{errors.password}</p>}
          {error && <p style={{justifySelf:'center', fontSize: 16, fontWeight: '500'}} className="error-message">{error}</p>}
          <div className="button-container">
            <Button
              className="custom-button"
              text={isLoading ? "Loggar in..." : "Logga in"}
              type="submit"
              padding="15px 100px"
              borderRadius="99px"
              fontWeight="600px"
              border="none"
            />
          </div>
        </form>
      </div>
    </div>
  );
}
