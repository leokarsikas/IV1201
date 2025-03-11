import { useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import Button from "./button";
import { ApplicationData } from "../types/applicationData";
import AvailabiltyProfile from "./AvailabilityProfile";
import CompetenceProfile from "./CompetenceProfile";
import { useApplicationForm } from "../hooks/useApplicationForm";
import "../styling/ApplicationForm.css";
import ".././styling/ErrorMessage.css";
import { useAuth } from "../hooks/useAuthLogin";
import {
  validateRole,
  validateYearsOfExperience,
  validateFromDate,
  validateToDate,
} from "../utils/utils";
import { useTranslation } from "react-i18next";

export default function ApplicationForm() {
  const { submitApplication, loading, error, success } = useApplicationForm();
  const navigate = useNavigate(); //user for navigation through endpoints
  const { userName } = useAuth();
  const { t} = useTranslation(); //for translation to other languages 
  const [competenceErrors, setCompetenceErrors] = useState<
    { roleError: string; yearsError: string }[]
  >([]);
  const [availabilityErrors, setAvailabilityErrors] = useState<
    { availableFromError: string; availableToError: string }[]
  >([]);

  // If no username is avaible throw out unauthorized user (non logged in users)
  useEffect(() => {
    if (!userName) {
      navigate("/");
    }
  }, [userName]);

  const [applicationData, setApplicationData] = useState<ApplicationData>(() => {
    const savedData = localStorage.getItem('applicationData');  
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        
        // Process competence profile to ensure years_of_experience is a number
        const processedCompetenceProfile = parsedData.competenceProfile.map((item: any) => ({
          profession: item.profession || "",
          years_of_experience: typeof item.years_of_experience === 'string' 
            ? parseFloat(item.years_of_experience) || 0 
            : item.years_of_experience || 0,
        }));
        
        // Process availability profile to ensure dates are Date objects
        const processedAvailabilityProfile = parsedData.availabilityProfile.map((item: any) => ({
          availabilityFrom: item.availabilityFrom ? new Date(item.availabilityFrom) : "",
          availabilityTo: item.availabilityTo ? new Date(item.availabilityTo) : "",
        }));
        
        return {
          userName: userName,
          competenceProfile: processedCompetenceProfile,
          availabilityProfile: processedAvailabilityProfile,
        };
      } catch (error) {
        console.error('Failed to parse saved application data:', error);
        localStorage.removeItem('applicationData');
      }
    }
    
    // Default initial state
    return {
      userName: userName,
      competenceProfile: [
        {
          profession: "",
          years_of_experience: 0,
        },
      ],
      availabilityProfile: [
        {
          availabilityFrom: "",
          availabilityTo: "",
        },
      ],
    };
  });
    // Save application data whenever it changes
    useEffect(() => {
      // Only save if userName exists (user is logged in)
      if (userName) {
        
        localStorage.setItem('applicationData', JSON.stringify(applicationData));
        
      }
    }, [applicationData, userName]);
    
  const addNewCompetence = () => {
    setApplicationData((prevData) => ({
      ...prevData,
      competenceProfile: [
        ...prevData.competenceProfile,
        { profession: "", years_of_experience: 0 },
      ],
    }));
  };

  const addNewAvailability = () => {
    setApplicationData((prevData) => ({
      ...prevData,
      availabilityProfile: [
        ...prevData.availabilityProfile,
        { availabilityFrom: "", availabilityTo: "" },
      ],
    }));
  };

  const removeCompetence = (index: number) => {
    setApplicationData((prevData) => ({
      ...prevData,
      competenceProfile: prevData.competenceProfile.filter(
        (_, i) => i !== index
      ),
    }));
  };

  const removeAvailability = (index: number) => {
    setApplicationData((prevData) => ({
      ...prevData,
      availabilityProfile: prevData.availabilityProfile.filter(
        (_, i) => i !== index
      ),
    }));
  };

  const updateApplication = (
    profileType: "competenceProfile" | "availabilityProfile",
    index: number,
    field:
      | keyof ApplicationData["competenceProfile"][0]
      | keyof ApplicationData["availabilityProfile"][0],
    updatedValue: any
  ) => {
    setApplicationData((prevData) => ({
      ...prevData,
      [profileType]: prevData[profileType].map((item, i) =>
        i === index ? { ...item, [field]: updatedValue } : item
      ),
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const allRoles = applicationData.competenceProfile.map((p) => p.profession);

    const validationCompetenceErrors = applicationData.competenceProfile.map(
      (profile) => ({
        yearsError: validateYearsOfExperience(profile.years_of_experience)
            ? "År av erfarenhet måste vara större än 0"
            : "",
        roleError: validateRole(profile.profession, allRoles),
      })
    );

    const validationAvailabilityErrors =
      applicationData.availabilityProfile.map((profile) => ({
        availableFromError: validateFromDate(
          [profile.availabilityFrom],
          [profile.availabilityTo]
        ),
        availableToError: validateToDate(
          [profile.availabilityFrom],
          [profile.availabilityTo]
        ),
      }));

    setCompetenceErrors(validationCompetenceErrors);
    setAvailabilityErrors(validationAvailabilityErrors);

    const hasCompetenceErrors = validationCompetenceErrors.some(
      (error) => error.roleError || error.yearsError
    );
    const hasAvailabilityErrors = validationAvailabilityErrors.some(
      (error) => error.availableFromError || error.availableToError
    );

    if (hasCompetenceErrors || hasAvailabilityErrors) {
      return;
    }

    submitApplication(applicationData);
  };

  const firstAvailabilityError = availabilityErrors.find(
    (error) => error.availableFromError || error.availableToError
  );

  const firstCompetenceError = competenceErrors.find(
    (error) => error.roleError || error.yearsError
  );

  return (
    <div style={{ height: "100%" }} className="page-container">
      <a href="/" className="company-name">
        Leos Jobbland
      </a>
      <div>
        <h2>{t("application-form")}</h2>
        <p>{t("application-subtext")}</p>
        <form onSubmit={handleSubmit}>
          {applicationData.competenceProfile.map((_, index) => (
            <CompetenceProfile
              key={index}
              error={
                competenceErrors[index] || { roleError: "", yearsError: "" }
              } 
              index={index}
              applicationData={applicationData}
              updateApplication={updateApplication}
              removeCompetence={removeCompetence}
            />
          ))}
          {firstCompetenceError && (
            <p className="error-message">
              {firstCompetenceError.roleError ||
                firstCompetenceError.yearsError}
            </p>
          )}
          <button
            className="btn-add-new-competence"
            type="button"
            onClick={addNewCompetence}
            disabled={applicationData.competenceProfile.length > 2}
          >
            {t("add-competence")}
          </button>

          <p>{t("application-availability-dates")}</p>

          {applicationData.availabilityProfile.map((_, index) => (
            <AvailabiltyProfile
              key={index}
              error={
                availabilityErrors[index] || {
                  availableFromError: "",
                  availableToError: "",
                }
              }
              index={index}
              applicationData={applicationData}
              updateApplication={updateApplication}
              removeAvailability={removeAvailability}
            />
          ))}
          {firstAvailabilityError && (
            <p className="error-message">
              {firstAvailabilityError.availableFromError ||
                firstAvailabilityError.availableToError}
            </p>
          )}
          <button
            className="btn-add-new-period"
            type="button"
            onClick={addNewAvailability}
          >
            {t("add-period")}
          </button>
          {error && <p  style={{justifySelf:'center'}}className="error-message">{error}</p>}
          {success && <p style={{justifySelf:'center', color:'green', fontWeight:'bold'}}>{t("application-succesfull")}</p>}
          <div className="button-container">
            <Button
              className="custom-button"
              text={loading ? t("sending-application") : t("send-application")}
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
