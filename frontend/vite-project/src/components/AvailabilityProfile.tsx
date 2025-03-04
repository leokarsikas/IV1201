import React from "react";
import Input from "./input";
import { ApplicationData } from "../types/applicationData";

interface AvailabilityProfileProps {
  applicationData: ApplicationData;
  updateApplication: (
    profileType: "availabilityProfile",
    index: number,
    field: keyof ApplicationData["availabilityProfile"][0],
    updatedValue: any
  ) => void;
  removeAvailability: (index: number) => void;
  index: number;
}

export default function AvailabilityProfile({
  applicationData,
  updateApplication,
  removeAvailability,
  index,
}: AvailabilityProfileProps) {
  const availability = applicationData.availabilityProfile[index] || {};

  const handleFromDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFromDate = e.target.value;
    const currentToDate = availability.availabilityTo ?? "";

    // Convert to Date objects 
    if (currentToDate && new Date(newFromDate) > new Date(currentToDate)) {
      alert("Startdatum kan inte vara senare än slutdatum!");
      return;
    }

    updateApplication("availabilityProfile", index, "availabilityFrom", newFromDate);
  };

  const handleToDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newToDate = e.target.value;
    const currentFromDate = availability.availabilityFrom ?? "";

    // Convert to Date 
    if (currentFromDate && new Date(newToDate) < new Date(currentFromDate)) {
      alert("Slutdatum kan inte vara tidigare än startdatum!");
      return;
    }

    updateApplication("availabilityProfile", index, "availabilityTo", newToDate);
  };


  return (
    <div className="period-form">
      <div>
        <Input
          type="date"
          placeholder=""
          name="availabilityFrom"
          width="256px"
          value={availability.availabilityFrom ?? ""}
          onChange={handleFromDateChange}
        />
        <p>Från och med den</p>
      </div>
      <div>
        <Input
          type="date"
          placeholder=""
          name="availabilityTo"
          width="256px"
          value={availability.availabilityTo ?? ""}
          onChange={handleToDateChange}
        />
        <p>Till och med den</p>
      </div>
      <button onClick={() => removeAvailability(index)} className="btn-remove">
        Ta bort
      </button>
    </div>
  );
}
