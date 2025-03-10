import Input from "./input";
import RoleDropdown from "./DropDown";
import { ApplicationData } from "../types/applicationData";

/**
 * Interface for the properties of the CompetenceProfile component.
 *
 * @interface CompetenceProfileProps
 * @property {ApplicationData} applicationData - The application data containing the user's competence profile.
 * @property {Function} updateApplication - Function to update the application data.
 * @property {Function} removeCompetence - Function to remove a competence entry.
 * @property {number} index - The index of the competence profile in the list.
 * @property {Object} error - Object containing validation errors for years of experience and role selection.
 * @property {string | null} error.yearsError - Error message related to years of experience.
 * @property {string | null} error.roleError - Error message related to role selection.
 */

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

/**
 * CompetenceProfile Component
 *
 * A form component for users to input their competence profile, including profession and years of experience.
 *
 * @component
 * @param {CompetenceProfileProps} props - The properties passed to the component.
 * @returns The rendered competence profile form.
 */

export default function CompetenceProfile({
  applicationData,
  updateApplication,
  removeCompetence,
  index,
  error,
}: CompetenceProfileProps) {

   /**
   * Available competence options that users can select from.
   * 
   * @constant {string[]} competenceOptions
   */

  const competenceOptions = [
    "Biljettförsäljare",
    "Lotteriförsäljare",
    "Berg och dalbansoperatör",
  ];

  /**
   * Retrieves the competence profile at the given index or initializes an empty profile.
   *
   * @property {string} profession - The selected profession.
   * @property {number} years_of_experience - The years of experience in the profession.
   */

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
        <p>Välj den roll som du vill ansöka med</p>
      </div>

      <div>
        <Input
          borderColor = {!!error.yearsError ? "red" : ""}
          type="number"
          name="years_of_experience"
          step="0.1"
          width="256px"
          placeholder="År av erfarenhet"
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
        <p>År av erfarenhet inom denna roll</p>
      </div>
      <button onClick={() => removeCompetence(index)} className="btn-remove">
        Ta bort
      </button>
    </div>
  );
}
