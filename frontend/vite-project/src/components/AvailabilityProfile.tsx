import React from "react";
import CustomDateInput from "./InputDate";
import { ApplicationData } from "../types/applicationData";

/**
 * Interface defining the properties for the AvailabilityProfile component.
 *
 * @interface AvailabilityProfileProps
 * @property {ApplicationData} applicationData - The application data containing availability profiles.
 * @property {void} updateApplication - Function to update availability data.
 * @property {void} removeAvailability - Function to remove an availability entry.
 * @property {number} index - Index of the availability entry being edited.
 * @property {Object} error - Object containing validation errors for start and end date.
 * @property {string | null} error.availableFromError - Error message related to start date.
 * @property {string | null} error.availableToError - Error message related to end date.
 */

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

/**
 * AvailabilityProfile Component
 *
 * A component that allows users to input their availability dates.
 *
 * @component
 * @param {AvailabilityProfileProps} props - The properties passed to the component.
 * @returns The rendered availability profile form.
 */

export default function AvailabilityProfile({
  applicationData,
  updateApplication,
  removeAvailability,
  index,
  error,
}: AvailabilityProfileProps) {
  const availability = applicationData.availabilityProfile[index] || {};
  const currentDate = new Date().toISOString().split("T")[0]; // Get current date in YYYY-MM-DD format


  /**
   * Handles the change of the availabilityFrom date.
   * Ensures that the selected date is not earlier than the current date.
   *
   * @param {React.ChangeEvent<HTMLInputElement>} e - The event triggered by the input change.
   */
  const handleFromDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFromDateStr = e.target.value;
    const newFromDate = new Date(newFromDateStr);

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

    /**
   * Handles the change of the availabilityTo date.
   * Ensures that the selected date is not before the availabilityFrom date.
   *
   * @param {React.ChangeEvent<HTMLInputElement>} e - The event triggered by the input change.
   */

  const handleToDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newToDateStr = e.target.value;
    const newToDate = new Date(newToDateStr);

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
