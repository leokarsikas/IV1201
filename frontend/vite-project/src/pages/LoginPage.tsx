import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Input from "../components/input";
import Button from "../components/button";
import { UserLoginData } from "../types/userLoginData";
import "../styling/LoginForm.css";
import "../styling/ErrorMessage.css";
import { useAuth } from "../hooks/useAuthLogin";

export default function LoginPage() {
  const navigate = useNavigate();

  function goToLandingPage() {
    navigate("/");
  }

  function goToRecruiterPage() {
    navigate("/recruiter");
  }

  // Validation state
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  // Validate email format
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Validate password strength
  const validatePassword = (password: string): boolean => {
    // At least 8 characters, one uppercase, one lowercase, one number
    const passwordRegex = /^.{8,}$/;
    return passwordRegex.test(password);
  };

  // Validate form before submission
  const validateForm = (): boolean => {
    let isValid = true;
    const newErrors = { email: "", password: "" };

    // Email validation
    if (!userData.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!validateEmail(userData.email)) {
      newErrors.email = "Invalid email format";
      isValid = false;
    }

    // Password validation
    if (!userData.password.trim()) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (!validatePassword(userData.password)) {
      newErrors.password =
        "Password must be at least 8 characters";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const { login, isLoading, role } = useAuth();

  const [userData, setUserData] = useState<UserLoginData>({
    email: "",
    password: "",
    username: "",
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setErrors(prev => ({
      ...prev,
      [name]: '',
    }));

    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();

    // Perform validation before submission
    if (validateForm()) {
      try {
        await login(userData);
      } catch (error) {
        console.error("Login failed:", error);
        navigate("/error");
      }
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
          <div>
            <Input
              placeholder="Email *"
              name="email"
              value={userData.email}
              onChange={handleInputChange}
              type="text"
              width="500px"
            />
            {errors.email && <p className="error-message">{errors.email}</p>}
          </div>
          <div>
            <Input
              placeholder="Password *"
              name="password"
              value={userData.password}
              onChange={handleInputChange}
              type="password"
              width="500px"
            />
            {errors.password && (
              <p className="error-message">{errors.password}</p>
            )}
          </div>

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
