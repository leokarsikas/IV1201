import React from 'react';
import Input from "./input";
import RoleDropdown from "./DropDown";
import { ApplicationData } from '../types/applicationData';

interface CompetenceProfileProps {
  applicationData: ApplicationData;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}


export default function CompetenceProfile({ applicationData, handleInputChange }: CompetenceProfileProps) {
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
    </div>
  );
}