import React, { useState } from "react";
import { NavLink,  } from 'react-router-dom';
import Input from "../components/input";
import Button from "../components/button";
import { UserLoginData } from "../types/userLoginData";
import "../styling/LoginForm.css";
import { useLoginUser } from "../hooks/useAuthLogin";


export default function LoginPage(){

    const { login} = useLoginUser();  
  
    const [userData, setUserData] = useState<UserLoginData>({
      email: '',
      password: '',
      username: '',
    });

     const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target
        setUserData((prevData) => ({
          ...prevData,
          [name]: value, 
        }));
      };


      async function onSubmit (event: React.FormEvent){
          event.preventDefault();
          await login(userData);
        }
      

  return (
    <div className="page-container">
      <NavLink to="/" className="company-name">
            Leos jobbland.
      </NavLink>
      <div className="form-container">
      <h2>Logga in</h2>
      <form onSubmit={onSubmit}>
        <Input
          placeholder="Email"
          name="email"
          value={userData.email}
          onChange={handleInputChange}
          type="text"
          width="500px"
        />
        <Input
          placeholder="Password"
          name="password"
          value={userData.password}
          onChange={handleInputChange}
          type="password"
          width="500px"
        />
        <div className="button-container">
          <Button
            className="custom-button"
            text="Logga in"
            type="submit"
            padding="15px 100px"
            borderRadius="99px"
            fontWeight="600px"
          />
        </div>
      </form>
      </div>
      
    </div>
  );
}
