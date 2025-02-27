import { useState } from "react";
import { Plus, Trash } from "lucide-react";
import Button from "./button";
import { ApplicationData } from "../types/applicationData";
import { useApplicationForm } from "../hooks/useApplicationForm";
import AvailabiltyProfile from "./AvailabilityProfile";
import "../styling/ApplicationForm.css";
import CompetenceProfile from "./CompetenceProfile";

export default function ApplicationForm() {
  const [periods, setPeriods] = useState<
    { startDate: string; endDate: string }[]
  >([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const { competence } = useApplicationForm();

  const [applicationData, setApplicationData] = useState<ApplicationData>({
    proffesion: [
      "Biljettförsäljare",
      "Lotteriförsäljare",
      "Berg och dalbansoperatör",
    ],
    experience: null,
    competence_id: null,
    years_of_experience: null,
  });

  const handleSubmit = async () => {
    // if (!isValidForm()) return; // Prevent submitting invalid form

    setLoading(true);
    setMessage("");

    try {
      await competence(applicationData);
    } catch (error) {
      console.error("Error submitting form:", error);
      setMessage("Ett nätverksfel uppstod.");
    }

    setLoading(false);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setApplicationData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="page-container">
      <a href="/" className="company-name">
        Leos Jobbland
      </a>
      <div className="form-container">
        <h2>Ansökningsformulär</h2>
        <p>Fyll i din kompetensprofil och när du är tillgänglig nedan</p>

        <h3>Kompetensprofil</h3>
        <CompetenceProfile
          applicationData={applicationData}
          handleInputChange={handleInputChange}
        ></CompetenceProfile>

        <button className="btn-add-new-competence" type="submit">
          {"Lägg till ny kompetens"}
        </button>

        <h3>Tillgänglighet</h3>
        <p>Ange mellan vilka datum du kommer kunna jobba</p>

        <AvailabiltyProfile
          applicationData={applicationData}
          handleInputChange={handleInputChange}
        ></AvailabiltyProfile>

        <button className="btn-add-new-period" type="submit">
          {"Lägg till ny period"}
        </button>

        <div className="button-container">
          <Button
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
