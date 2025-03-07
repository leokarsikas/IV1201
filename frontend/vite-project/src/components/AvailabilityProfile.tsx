import React from "react";
import CustomDateInput from "./InputDate";
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
  error: {availableFromError: string | null, availableToError: string | null};
}

export default function AvailabilityProfile({
  applicationData,
  updateApplication,
  removeAvailability,
  index,
  error,
}: AvailabilityProfileProps) {
  const availability = applicationData.availabilityProfile[index] || {};
  const currentDate = new Date().toISOString().split("T")[0]; // Get current date in YYYY-MM-DD format

  const handleFromDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFromDateStr = e.target.value;
    const newFromDate = new Date(newFromDateStr);
    /*const currentToDate = availability.availabilityTo
      ? new Date(availability.availabilityTo)
      : null;*/


    // Ensure fromDate is not earlier than the current date
    if (new Date(newFromDate) < new Date(currentDate)) {
      updateApplication("availabilityProfile", index, "availabilityFrom", currentDate);
      updateApplication("availabilityProfile", index, "availabilityTo", currentDate);
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
   // const currentFromDate = availability.availabilityFrom
   //   ? new Date(availability.availabilityFrom)
   //   : null;

   
   
   

    // Update availabilityTo if all conditions are met
    updateApplication("availabilityProfile", index, "availabilityTo", newToDate);
  };

  return (
    <div className="period-form">
      <div>
     
        <CustomDateInput
          placeholder=""
          name="availabilityFrom"
          borderColor={!!error.availableFromError ? "red" : ""}
          value={availability.availabilityFrom
            ? new Date(availability.availabilityFrom)
                .toISOString()
                .split("T")[0]
            : ""}
          onChange={handleFromDateChange}
          min={currentDate} // Prevent selection of dates before today
        />
        <p>Från och med den</p>
      </div>
      <div>
        <CustomDateInput
          placeholder=""
          borderColor={!!error.availableToError ? "red" : ""}
          name="availabilityTo"
          value={
            availability.availabilityTo
              ? new Date(availability.availabilityTo)
                  .toISOString()
                  .split("T")[0]
              : ""
          }
          onChange={handleToDateChange}
          min={availability.availabilityFrom instanceof Date
            ? availability.availabilityFrom.toISOString().split("T")[0]
            : currentDate} // Prevent selecting dates before availabilityFrom
        />
        <p>Till och med den</p>
      </div>
      <button onClick={() => removeAvailability(index)} className="btn-remove">
        Ta bort
      </button>
    </div>
  );
}
