import React from "react";
import Input from "./input";
import RoleDropdown from "./DropDown";
import { ApplicationData } from "../types/applicationData";

interface CompetenceProfileProps {
  applicationData: ApplicationData;
  updateApplication: (
    profileType: "competenceProfile",
    index: number,
    field: keyof ApplicationData["competenceProfile"][0],
    updatedValue: any
  ) => void;
  removeCompetence: (index: number) => void;
  index: number;
}

export default function CompetenceProfile({
  applicationData,
  updateApplication,
  removeCompetence,
  index,
}: CompetenceProfileProps) {
  const competenceOptions = ["Biljettförsäljare", "Lotteriförsäljare", "Berg och dalbansoperatör"];

  const competence = applicationData.competenceProfile[index] || {
    profession: "",
    years_of_experience: 0,
  };

  return (
    <div className="competence-form">
      <div>
        <RoleDropdown
          options={competenceOptions}
          onSelect={(selectedRole) =>
            updateApplication("competenceProfile", index, "profession", selectedRole)
          }
        />
        <p>Välj den roll som du vill ansöka med</p>
      </div>

      <div>
        <Input
          type="number"
          name="years_of_experience"
          step="0.1"
          width="256px"
          placeholder="År av erfarenhet"
          value={competence.years_of_experience}
          onChange={(e) =>
            updateApplication("competenceProfile", index, "years_of_experience", e.target.value)
          }
        />
        <p>År av erfarenhet inom denna roll</p>
      </div>
      <button onClick={() => removeCompetence(index)} className="btn-remove">
        Ta bort
      </button>
    </div>
  );
}
