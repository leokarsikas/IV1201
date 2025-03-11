import React from "react";
import CustomDateInput from "./InputDate";
import { ApplicationData } from "../types/applicationData";
import { useTranslation } from "react-i18next";
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
  const { t} = useTranslation(); //for translation to other languages
  const handleFromDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFromDate = e.target.value;

    // Ensure fromDate is not earlier than the current date
    if (new Date(newFromDate) < new Date(currentDate)) {
      updateApplication("availabilityProfile", index, "availabilityFrom", currentDate);
      updateApplication("availabilityProfile", index, "availabilityTo", currentDate);
      return;
    }

    updateApplication("availabilityProfile", index, "availabilityFrom", newFromDate);
  };

  const handleToDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newToDate = e.target.value;

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
          value={availability.availabilityFrom ?? ""}
          onChange={handleFromDateChange}
          min={currentDate} // Prevent selection of dates before today
        />
        <p>{t("availability-from")}</p>
      </div>
      <div>
        <CustomDateInput
          placeholder=""
          borderColor={!!error.availableToError ? "red" : ""}
          name="availabilityTo"
          value={availability.availabilityTo ?? ""}
          onChange={handleToDateChange}
          min={availability.availabilityFrom instanceof Date
            ? availability.availabilityFrom.toISOString().split("T")[0]
            : currentDate} // Prevent selecting dates before availabilityFrom
        />
        <p>{t("availability-to")}</p>
      </div>
      <button onClick={() => removeAvailability(index)} className="btn-remove" disabled={index < 1}>
        {t("remove")}
      </button>
    </div>
  );
}