import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Input from "../components/input";
import Button from "../components/button";
import { UserLoginData } from "../types/userLoginData";
import "../styling/LoginForm.css";
import { useAuth } from "../hooks/useAuthLogin";
import { isPasswordThere, isEmailThere, isUsernameThere } from "../utils/utils";
import { useTranslation } from "react-i18next";

/**
 * LoginPage Component
 *
 * This module provides the login page where users can submit their credentials and gain access to their registered account.
 * It handles authentication, validation and navigation.
 */

export default function LoginPage() {
  /* For navigation to other endpoints */
  const navigate = useNavigate();
  /* Access the translation object from i18n.ts */
  const { t } = useTranslation();
  /**
   * Navigates to the landing page.
   *
   * @function goToLandingPage
   */
  function goToLandingPage() {
    navigate("/");
  }
  /**
   * Navigates to the recruiter page.
   *
   * @function goToRecruiterPage
   */
  function goToRecruiterPage() {
    navigate("/recruiter");
  }

  /**
   * Extracts authentication-related properties using the `useAuth` hook.
   *
   * @constant {Function} login - Function to log in the user.
   * @constant {boolean} isLoading - Indicates if authentication is in progress.
   * @constant {number | null} role - The role of the authenticated user.
   * @constant {string | null} error - Error message, if any, from authentication.
   */
  const { login, isLoading, role, error } = useAuth();

  /* initializing a state variable named `errors` using the `useState` hook.  */
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    username: "",
  });

  /* Initialize userData from localStorage if available */
  const [userData, setUserData] = useState<UserLoginData>(() => {
    const savedData = localStorage.getItem("userLoginData"); //on refresh gets item from localstorage
    if (savedData) {
      try {
        return JSON.parse(savedData);
      } catch (error) {
        console.error("Failed to parse saved user login data:", error);
        localStorage.removeItem("userLoginData"); //removes item from local storage
      }
    }
    return {
      email: "",
      password: "",
      username: "",
    };
  });

  /* Persist userData on every change */
  useEffect(() => {
    localStorage.setItem("userLoginData", JSON.stringify(userData));
  }, [userData]);

  /**
   * Handles input changes and updates the user data state.
   *
   * @function handleInputChange
   * @param {React.ChangeEvent<HTMLInputElement>} event - The input change event.
   */
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  /**
   * Handles form submission, validates input fields, and attempts to log in the user.
   * @function onSubmit
   * @param {React.FormEvent} event - The form submission event.
   */
  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();

    /* The `const validationErrors` block is checking for validation errors in the form fields before
  submitting the form. */
    const validationErrors = {
      email: isEmailThere(userData.email)
        ? "You need to provide an email address"
        : "",
      password: isPasswordThere(userData.password)
        ? "You need to provide a password"
        : "",
      username: isUsernameThere(userData.username)
        ? "You need to provide a userName"
        : "",
    };

    /* Set the errors */
    setErrors(validationErrors);

  /** 
  * 
  * Checks for validation errors in the form fields before submitting 
  * the form. 
  * 
  */
    const hasErrors =
      (validationErrors.email !== "" && validationErrors.username !== "") ||
      validationErrors.password !== "";

   /* abort the submission if hasErrors is true */   
    if (hasErrors) {
      return;
    }

    /* Capture the error directly (null or the string error) */
    const loginError = await login(userData);
    if (!loginError) {
      navigate("/"); // after succefull login, sends you to landing page, that is, no error has occured
      console.error("Login failed:", loginError);
    }
  }

  /**
   * Redirects the user based on their role after authentication.
   *
   * @function useEffect
   * @param {Function} callback - Function executed on component mount and when dependencies change.
   * @param {Array} dependencies - Dependencies that trigger the effect.
   */
  useEffect(() => {
    if (role === 2) {
      goToLandingPage();
    } else if (role === 1) {
      goToRecruiterPage();
    }
  }, [role, navigate]); // Runs when role changes

  /**
   * Rendering the `LoginPage` page
   */

  return (
    <div className="page-container">
      <NavLink to="/" className="company-name">
        Leos jobbland.
      </NavLink>
      <div className="form-container">
        <h2>{t("login")}</h2>
        <form onSubmit={onSubmit}>
          <Input
            placeholder={t("email-or-username")}
            borderColor="black"
            name="email"
            value={userData.email}
            onChange={handleInputChange}
            type="text"
            width="500px"
          />
          {errors.email && <p className="error-message">{errors.email}</p>}
          <Input
            placeholder={t("password")}
            borderColor="black"
            name="password"
            value={userData.password}
            onChange={handleInputChange}
            type="password"
            width="500px"
          />
          {errors.password && (
            <p className="error-message">{errors.password}</p>
          )}
          {error && (
            <p
              style={{ justifySelf: "center", fontSize: 16, fontWeight: "500" }}
              className="error-message"
            >
              {error}
            </p>
          )}
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
