import React, { useState } from "react";
import { NavLink } from 'react-router-dom';
import Input from "../components/input";
import Button from "../components/button";
import { useRegisterUser } from "../hooks/useRegistrationForm";
import { ApplicationData } from "../types/applicationData";
import "../styling/RegistrationForm.css";

export default function ApplicationPage() { 

  const [applicationData, setApplicationData] = useState<ApplicationData>({
    role_id: 0,             
    competence_id: 0,       
    years_of_experience: 0, 
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;

    setApplicationData((prevData) => ({
      ...prevData,
      [name]: value, 
    }));
  };

  const handleRoleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

    
    setApplicationData((prevData) => ({
      ...prevData,
      role_id: value ? parseInt(value) : 0, // If the value is empty, set to 0
    }));
  };

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    console.log(applicationData);  // For debugging
    /*await updateCompetence(applicationData);*/
  }

  return (
    <div className="page-container">
      <NavLink to="/" className="company-name">
        Leos jobbland.
      </NavLink>
      <div className="form-container">
        <h2>Updatera din kompetensprofil</h2>
        <form onSubmit={onSubmit}>

          {/* Select input for Role */}
          <div className="form-group">
            <label htmlFor="role_id">Välj arbetsroll:</label>
            <select
              id="role_id"
              name="role_id" // Ensure the name matches the state key
              value={applicationData.role_id} // Use state value to bind the select
              onChange={handleRoleChange}
            >
              <option value="">Välj arbetsroll</option>
              <option value="1">Biljettförsäljning</option>
              <option value="2">Lotteriförsäljning</option>
              <option value="3">Berg och dalbansoperatör</option>
            </select>
          </div>

          {/* Input for Experience Years */}
          <div className="form-group">
            <label htmlFor="years_of_experience">Erfarenhet i år:</label>
            <input
              type="number"
              id="years_of_experience"
              name="years_of_experience"
              value={applicationData.years_of_experience}
              onChange={handleInputChange}
              min="0"
              step="0.1"  // Increments by 0.1
              placeholder="Ange antal år"
            />
          </div>

          {/* Submit Button */}
          <div className="button-container">
            <Button
              className="custom-button"
              text="Uppdatera"
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
