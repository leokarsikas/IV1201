import { useState } from "react";
import Button from "./button";
import { ApplicationData } from "../types/applicationData";
import AvailabiltyProfile from "./AvailabilityProfile";
import CompetenceProfile from "./CompetenceProfile";
import { useApplicationForm } from "../hooks/useApplicationForm";
import "../styling/ApplicationForm.css";

export default function ApplicationForm() {
  const  { submitApplication, loading, error } = useApplicationForm();
  const [applicationData, setApplicationData] = useState<ApplicationData>({
    competenceProfile: [
      {
        profession: "",
        years_of_experience: 0,
      },
    ],
    availabilityProfile: [
      {
        availabilityFrom: null,
        availabilityTo: null,
      },
    ],
  });

  const addNewCompetence = () => {
    setApplicationData((prevData) => ({
      ...prevData,
      competenceProfile: [
        ...prevData.competenceProfile,
        { profession: "", years_of_experience: 0 },
      ],
    }));
  };

  console.log(applicationData)

  const addNewAvailability = () => {
    setApplicationData((prevData) => ({
      ...prevData,
      availabilityProfile: [
        ...prevData.availabilityProfile,
        { availabilityFrom: null, availabilityTo: null },
      ],
    }));
  };

  const removeCompetence = (index: number) => {
    setApplicationData((prevData) => ({
      ...prevData,
      competenceProfile: prevData.competenceProfile.filter((_, i) => i !== index),
    }));
  };

  const removeAvailability = (index: number) => {
    setApplicationData((prevData) => ({
      ...prevData,
      availabilityProfile: prevData.availabilityProfile.filter((_, i) => i !== index),
    }));
  };

  const updateApplication = (
    profileType: "competenceProfile" | "availabilityProfile",
    index: number,
    field: keyof ApplicationData["competenceProfile"][0] | keyof ApplicationData["availabilityProfile"][0],
    updatedValue: any
  ) => {
    setApplicationData((prevData) => ({
      ...prevData,
      [profileType]: prevData[profileType].map((item, i) =>
        i === index ? { ...item, [field]: updatedValue } : item
      ),
    }));
  };

  const handleSubmit = () => {
    if (
      applicationData.availabilityProfile.some((doesExist) => !doesExist.availabilityFrom || !doesExist.availabilityTo) ||
      applicationData.competenceProfile.some((doesExist) => !doesExist.profession || doesExist.years_of_experience <= 0)
    ) {
      alert("Fyll i alla fält innan du skickar in ansökan.");
      return;
    }

    submitApplication(applicationData);
  };


  return (
    <div style={{height: "100%"}} className="page-container">
      <a href="/" className="company-name">Leos Jobbland</a>
      <div >
        <h2>Ansökningsformulär</h2>
        <p>Fyll i din kompetensprofil och när du är tillgänglig nedan</p>

        {applicationData.competenceProfile.map((_, index) => (
          <CompetenceProfile
            key={index}
            index={index}
            applicationData={applicationData}
            updateApplication={updateApplication}
            removeCompetence={removeCompetence}
          />
        ))}

        <button className="btn-add-new-competence" type="button" onClick={addNewCompetence}>
          Lägg till ny kompetens
        </button>

        <h3>Tillgänglighet</h3>
        <p>Ange mellan vilka datum du kommer kunna jobba</p>

        {applicationData.availabilityProfile.map((_, index) => (
          <AvailabiltyProfile
            key={index}
            index={index}
            applicationData={applicationData}
            updateApplication={updateApplication}
            removeAvailability={removeAvailability}
          />
        ))}

        <button className="btn-add-new-period" type="button" onClick={addNewAvailability}>
          Lägg till ny period
        </button>

        <div className="button-container">
          <Button
            onClick={handleSubmit}
            className="custom-button"
            text={"Skicka ansökan"}
            type="submit"
            padding="15px 100px"
            borderRadius="99px"
            fontWeight="600px"
            border="none"
          />
        </div>
      </div>
    </div>
  );
}
