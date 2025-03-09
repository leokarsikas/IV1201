import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Input from "../components/input";
import Button from "../components/button";
import { UserLoginData } from "../types/userLoginData";
import "../styling/LoginForm.css";
import { useAuth } from "../hooks/useAuthLogin";
import { isPasswordThere, isEmailThere, isUsernameThere } from "../utils/utils";
import { useTranslation } from "react-i18next";

export default function LoginPage() {
/* For navigation to other endpoints */
  const navigate = useNavigate(); 
/* Access the translation object from i18n.ts */
  const { t} = useTranslation();  
  /**
   * The function `goToLandingPage` or `goToRecruiterPage` 
   * navigates to the landing page and the recruiter page respectively.
   */
  function goToLandingPage() {
    navigate("/");
  }

  function goToRecruiterPage() {
    navigate("/recruiter");
  }


/**  
 * Extract: 
 * `login`, `isLoading`, `role` and `error` properties from the return value of the `useAuth()` custom hook. 
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
    const savedData = localStorage.getItem('userLoginData'); //on refresh gets item from localstorage
    if (savedData) {
      try {
        return JSON.parse(savedData);
      } catch (error) {
        console.error('Failed to parse saved user login data:', error);
        localStorage.removeItem('userLoginData'); //removes item from local storage
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
    localStorage.setItem('userLoginData', JSON.stringify(userData));
  }, [userData]);

 
  /**
   * The function `handleInputChange` updates the `userData` state with the new value based on the
   * input field name.
   * @param event - The `event` parameter in the `handleInputChange` function is of type
   * `React.ChangeEvent<HTMLInputElement>`. This means it is an event object that is triggered when the
   * value of an input element changes in a React component.
   */
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

/* The `async function onSubmit(event: React.FormEvent)` is a function that handles form submission in
the login page. Here's a breakdown of what it does: */
async function onSubmit(event: React.FormEvent) {
  event.preventDefault();

  /* The `const validationErrors` block is checking for validation errors in the form fields before
  submitting the form. Here's a breakdown of what it does: */
  const validationErrors = {
    email: isEmailThere(userData.email) ? "You need to provide an email address" : "",
    password: isPasswordThere(userData.password) ? "You need to provide a password" : "",
    username: isUsernameThere(userData.username) ? "You need to provide a userName" : "",
  };

  setErrors(validationErrors);

  /* The code block you provided is checking for validation errors in the form fields before submitting
  the form. Here's a breakdown of what it does: */
  const hasErrors =
    (validationErrors.email !== "" && validationErrors.username !== "") ||
    validationErrors.password !== "";
  if (hasErrors) {
    return;
  }

  /* Capture the error directly (null or the string error) */
  const loginError = await login(userData);
  if (!loginError) {
    navigate("/"); // after succefull login sends you to landing page, that is, no error has occured
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
