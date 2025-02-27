import React from 'react';
import Input from "./input";
import { ApplicationData } from '../types/applicationData';


interface AvailabilityProfileProps {
  applicationData: ApplicationData;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}


export default function AvailabiltyProfile({ applicationData, handleInputChange }: AvailabilityProfileProps){

    return(   <div className="period-form">
        <div>
          <Input
            type="date"
            name="experience"
            step="0.1"
            width="256px"
            placeholder="År av erfarenhet"
            value={0}
            onChange={handleInputChange}
          ></Input>
          <p>Från och med den</p>
        </div>
        <div>
          <Input
            type="date"
            width="256px"
            name="experience"
            step="0.1"
            placeholder="År av erfarenhet"
            value={0}
            onChange={handleInputChange}
          ></Input>
          <p>Till och med den</p>
        </div>
        
      </div>);
}