import React from "react";
import Input from "./input";
import RoleDropdown from "./DropDown";
import { ApplicationData } from "../types/applicationData";
import { Plus, Trash } from "lucide-react";

interface CompetenceProfileProps {
  applicationData: ApplicationData;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  removeCompetence: (index: number) => void;
  index: number;
}

export default function CompetenceProfile({
  applicationData,
  handleInputChange,
  removeCompetence,
  index,
}: CompetenceProfileProps) {
  return (
    <div className="competence-form">
      <div>
        <RoleDropdown options={applicationData.proffesion} />
        <p>Välj den roll som du vill ansöka med</p>
      </div>

      <div>
        <Input
          type="number"
          name="experience"
          step="0.1"
          width="256px"
          placeholder="År av erfarenhet"
          value={0}
          onChange={handleInputChange}
        />
        <p>Hur många års erfarenhet har du inom denna roll?</p>
      </div>
      {index > 0 && ( // Show the button for index 1 and above
        <button type="button" onClick={() => removeCompetence(index)} style={{backgroundColor:'red', border:'none', padding: '5px', borderRadius:'8px', cursor:'pointer'}}>
          <Trash size={20} />
        </button>
      )}
    </div>
  );
}
