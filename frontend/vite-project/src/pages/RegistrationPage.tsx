import React, { useState, useCallback } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Input from "../components/input";
import Button from "../components/button";
import { useRegisterUser } from "../hooks/useRegistrationForm";
import { UserData } from "../types/userRegistrationData";
import "../styling/RegistrationForm.css";
import {validateEmail, validateName, validatePassword, validatePersonnummer, validateUsername,} from "../utils/utils"


export default function RegistrationPage() {
  const { register, error, success } = useRegisterUser();
  const navigate = useNavigate();

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
  const handleInputChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    
    // Update user data
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Perform validation based on input type
    switch(name) {
      case 'email':
        setErrors(prev => ({
          ...prev,
          email: value && !validateEmail(value) 
            ? 'Please enter a valid email address' 
            : ''
        }));
        break;
      
      case 'password':
        setErrors(prev => ({
          ...prev,
          password: value && !validatePassword(value) 
            ? 'Password must be 8+ chars' 
            : ''
        }));
        break;
      
      case 'pnr':
        setErrors(prev => ({
          ...prev,
          pnr: value && !validatePersonnummer(value) 
            ? 'Invalid personnummer (10-12 digits)' 
            : ''
        }));
        break;
      
      case 'name':
        setErrors(prev => ({
          ...prev,
          name: value && !validateName(value) 
            ? 'Name must be at least 2 characters' 
            : ''
        }));
        break;
      
      case 'surname':
        setErrors(prev => ({
          ...prev,
          surname: value && !validateName(value) 
            ? 'Surname must be at least 2 characters' 
            : ''
        }));
        break;
      
      case 'username':
        setErrors(prev => ({
          ...prev,
          username: value && !validateUsername(value) 
            ? 'Username must be at least 3 characters' 
            : ''
        }));
        break;
    }
  }, []);

  // Form submission with comprehensive validation
  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    // Validate all fields before submission
    const validationErrors = {
      name: !validateName(userData.name) ? 'Name must be at least 2 characters' : '',
      surname: !validateName(userData.surname) ? 'Surname must be at least 2 characters' : '',
      pnr: !validatePersonnummer(userData.pnr) ? 'Invalid personnummer (10-12 digits)' : '',
      email: !validateEmail(userData.email) ? 'Please enter a valid email address' : '',
      password: !validatePassword(userData.password) ? 'Password must be 8+ chars, include uppercase, lowercase, and number' : '',
      username: !validateUsername(userData.username) ? 'Username must be at least 3 characters' : '',
    };

    setErrors(validationErrors);
    
    // Check if there are any validation errors
    const hasErrors = Object.values(validationErrors).some(error => error !== '');
    
    if (hasErrors) {
      return;
    }

    try {
      await register(userData);
    } catch (error) {
      console.error("Registration error:", error);
    }
    finally{
      if(success){
        navigate("/")
      }
      else{
        alert("something went wrong")
      }
    }
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
                placeholder="Last Name*"
                name="surname"
                value={userData.surname}
                onChange={handleInputChange}
                type="text"
                width="242px"
              />
              {errors.surname && <p className="error-message">{errors.surname}</p>}
            </div>
          </div>
          
          <div>
            <Input
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
              placeholder="Password*"
              name="password"
              value={userData.password}
              onChange={handleInputChange}
              type="password"
              width="500px"
            />
            {errors.password && <p className="error-message">{errors.password}</p>}
          </div>
          
          <div>
            <Input
              placeholder="Username*"
              name="username"
              value={userData.username}
              onChange={handleInputChange}
              type="text"
              width="500px"
            />
            {errors.username && <p className="error-message">{errors.username}</p>}
          </div>

          {error && <p className="server-error">{error}</p>}

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