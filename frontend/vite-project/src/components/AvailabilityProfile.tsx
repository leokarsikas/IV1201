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
    const newFromDateStr = e.target.value;
    const newFromDate = new Date(newFromDateStr);
    const currentToDate = availability.availabilityTo
      ? new Date(availability.availabilityTo)
      : null;

    if (currentToDate && newFromDate > currentToDate) {
      alert("Startdatum kan inte vara senare än slutdatum!");
      return;
    }

    updateApplication(
      "availabilityProfile",
      index,
      "availabilityFrom",
      newFromDate
    );
  };

  const handleToDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newToDateStr = e.target.value;
    const newToDate = new Date(newToDateStr);
    const currentFromDate = availability.availabilityFrom
      ? new Date(availability.availabilityFrom)
      : null;

    // Convert to Date
    if (currentFromDate && new Date(newToDate) < new Date(currentFromDate)) {
      alert("Slutdatum kan inte vara tidigare än startdatum!");
      return;
    }

    updateApplication(
      "availabilityProfile",
      index,
      "availabilityTo",
      newToDate
    );
  };

  return (
    <div className="period-form">
      <div>
        <Input
          type="date"
          name="availabilityFrom"
          width="256px"
          placeholder=""
          value={
            availability.availabilityFrom
              ? new Date(availability.availabilityFrom)
                  .toISOString()
                  .split("T")[0]
              : ""
          }
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
          value={
            availability.availabilityTo
              ? new Date(availability.availabilityTo)
                  .toISOString()
                  .split("T")[0]
              : ""
          }
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
