import Input from "./input";
import RoleDropdown from "./DropDown";
import { ApplicationData } from "../types/applicationData";
import { useTranslation } from "react-i18next";
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
  error: {yearsError: string | null, roleError: string | null}
}

export default function CompetenceProfile({
  applicationData,
  updateApplication,
  removeCompetence,
  index,
  error,
}: CompetenceProfileProps) {
  const competenceOptions = [
    "Biljettförsäljare",
    "Lotteriförsäljare",
    "Berg och dalbansoperatör",
  ];
  const { t} = useTranslation(); //for translation to other languages 
  const competence = applicationData.competenceProfile[index] || {
    profession: "",
    years_of_experience: 0,
  };

  return (
    <div className="competence-form">
      <div>
        <RoleDropdown
          borderColor = {!!error.roleError ? "red" : ""}
          color = {!!error.roleError ? "red" : ""}
          options={competenceOptions}
          value={competence.profession} // Pass the current profession value
          onSelect={(selectedRole) =>
            updateApplication(
              "competenceProfile",
              index,
              "profession",
              selectedRole
            )
          }
        />
        <p>{t("competence-choose-role")}</p>
      </div>

      <div>
        <Input
          borderColor = {!!error.yearsError ? "red" : ""}
          type="number"
          name="years_of_experience"
          step="0.1"
          width="256px"
          placeholder={t("competence-years-input")}
          min = {0}
          color={!!error.yearsError ? "red" : "black"}
          value={competence.years_of_experience}
          onChange={(e) =>
            updateApplication(
              "competenceProfile",
              index,
              "years_of_experience",
              e.target.value
            )
          }
        />
        <p>{t("competence-years")}</p>
      </div>
      <button onClick={() => removeCompetence(index)} className="btn-remove">
      {t("remove")}
      </button>
    </div>
  );
}
