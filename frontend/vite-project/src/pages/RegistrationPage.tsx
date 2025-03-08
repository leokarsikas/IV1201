import React, { useEffect, useState, useCallback } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Input from "../components/input";
import Button from "../components/button";
import { useRegisterUser } from "../hooks/useRegistrationForm";
import { UserData } from "../types/userRegistrationData";
import "../styling/RegistrationForm.css";
import {
  validateEmail,
  validateName,
  validatePassword,
  validatePersonnummer,
  validateUsername,
} from "../utils/utils";

export default function RegistrationPage() {
  const { register, error, success } = useRegisterUser();
  const navigate = useNavigate();

/**
 * The function `handleGoHome` navigates to the home page when called.
 */
  function handleGoHome(){
    navigate('/');
  }
  const [userData, setUserData] = useState<UserData>({
    name: "",
    surname: "",
    pnr: "",
    email: "",
    password: "",
    username: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    surname: "",
    pnr: "",
    email: "",
    password: "",
    username: "",
  });

  // Comprehensive input change handler with validation
  // First, let's modify your existing handleInputChange function to save to localStorage
  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;

      // Update user data
      setUserData((prevData) => {
        const newData = {
          ...prevData,
          [name]: value,
        };

        // Save to localStorage after updating state
        localStorage.setItem("userData", JSON.stringify(newData));

        return newData;
      });

      // Perform validation based on input type
      switch (name) {
        case "email":
          setErrors((prev) => ({
            ...prev,
            email:
              value && !validateEmail(value)
                ? "Please enter a valid email address"
                : "",
          }));
          break;

        case "password":
          setErrors((prev) => ({
            ...prev,
            password:
              value && !validatePassword(value)
                ? "Password must be 8+ chars"
                : "",
          }));
          break;

        case "pnr":
          setErrors((prev) => ({
            ...prev,
            pnr:
              value && !validatePersonnummer(value)
                ? "Fel personummer. Följ formatet [xxxxxxxx-xxxx]"
                : "",
          }));
          break;

        case "name":
          setErrors((prev) => ({
            ...prev,
            name:
              value && !validateName(value)
                ? "Name must be at least 2 characters"
                : "",
          }));
          break;

        case "surname":
          setErrors((prev) => ({
            ...prev,
            surname:
              value && !validateName(value)
                ? "Surname must be at least 2 characters"
                : "",
          }));
          break;

        case "username":
          setErrors((prev) => ({
            ...prev,
            username:
              value && !validateUsername(value)
                ? "Username must be at least 3 characters"
                : "",
          }));
          break;
      }
    },
    []
  );

  // Add this function to load the saved data when the component mounts
  const loadUserData = useCallback(() => {
    const savedData = localStorage.getItem("userData");
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        setUserData(parsedData);
      } catch (error) {
        console.error("Failed to parse saved user data:", error);
      }
    }
  }, []);

  // Use this in your useEffect to load data on component mount
  useEffect(() => {
    loadUserData();
  }, [loadUserData]);

  // Form submission with comprehensive validation
  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    // Validate all fields before submission
    const validationErrors = {
      name: !validateName(userData.name)
        ? "Name must be at least 2 characters"
        : "",
      surname: !validateName(userData.surname)
        ? "Surname must be at least 2 characters"
        : "",
      pnr: !validatePersonnummer(userData.pnr)
        ? "Fel personummer. Följ formatet [xxxxxxxx-xxxx]"
        : "",
      email: !validateEmail(userData.email)
        ? "Please enter a valid email address"
        : "",
      password: !validatePassword(userData.password)
        ? "Password must be 8+ chars, include uppercase, lowercase, and number"
        : "",
      username: !validateUsername(userData.username)
        ? "Username must be at least 3 characters"
        : "",
    };

    setErrors(validationErrors);

    // Check if there are any validation errors
    const hasErrors = Object.values(validationErrors).some(
      (error) => error !== ""
    );

    if (hasErrors) {
      return;
    }

   /* The code `const registerResult = await register(userData); console.log("register result",
   registerResult);` is performing an asynchronous call to the `register` function with the
   `userData` object as a parameter. */
    const registerResult = await register(userData);
    console.log("register result", registerResult);
  };

  return (
    <div className="page-container">
      <NavLink to="/" className="company-name">
        Leos jobbland.
      </NavLink>
      <div className="form-container">
        <h2>Registrera dig</h2>
        <form onSubmit={onSubmit}>
          <div className="name-container">
            <div>
              <Input
                borderColor={errors.name ? "red" : ""}
                placeholder="First Name*"
                name="name"
                value={userData.name}
                onChange={handleInputChange}
                type="text"
                width="242px"
              />
              {errors.name && <p className="error-message">{errors.name}</p>}
            </div>
            <div>
              <Input
                borderColor={errors.surname ? "red" : ""}
                placeholder="Last Name*"
                name="surname"
                value={userData.surname}
                onChange={handleInputChange}
                type="text"
                width="242px"
              />
              {errors.surname && (
                <p className="error-message">{errors.surname}</p>
              )}
            </div>
          </div>

          <div>
            <Input
              borderColor={
                error === "A user with this person number already exists." ||
                errors.pnr
                  ? "red"
                  : ""
              }
              placeholder="Personnummer*"
              name="pnr"
              value={userData.pnr}
              onChange={handleInputChange}
              type="text"
              width="500px"
            />
            {errors.pnr && <p className="error-message">{errors.pnr}</p>}
          </div>

          <div>
            <Input
              borderColor={
                error === "A user with this email already exists." ? "red" : ""
              }
              placeholder="Email*"
              name="email"
              value={userData.email}
              onChange={handleInputChange}
              type="email"
              width="500px"
            />
            {errors.email && <p className="error-message">{errors.email}</p>}
          </div>

          <div>
            <Input
              borderColor={""}
              placeholder="Password*"
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

          <div>
            <Input
              borderColor={
                error === "A user with this username already exists."
                  ? "red"
                  : ""
              }
              placeholder="Username*"
              name="username"
              value={userData.username}
              onChange={handleInputChange}
              type="text"
              width="500px"
            />
            {errors.username && (
              <p className="error-message">{errors.username}</p>
            )}
          </div>

          {error && (
            <p
              style={{ justifySelf: "center", fontSize: 16, fontWeight: "500" }}
              className="error-message"
            >
              {error}
            </p>
          )}
          {success && (

           <div> 
            <p
              style={{
                justifySelf: "center",
                color: "green",
                fontWeight: "bold",
              }}
            >
              Du är nu registrerad!
            </p>
            <div className="button-container">
            <Button
              className="custom-button-succesfull"
              text="Startsida"
              type="button"
              onClick={handleGoHome}
              padding="15px 100px"
              borderRadius="99px"
              fontWeight="600px"
              border="none"
            />
            </div>
            </div>
          )}
          <div className="button-container">
            <Button
              className="custom-button"
              text="Registrera dig"
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
