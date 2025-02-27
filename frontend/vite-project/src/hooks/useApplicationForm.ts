import { useState } from "react";
import { sendApplication } from "../services/applicationService";
import { ApplicationData } from "../types/applicationData";

export const useApplicationForm = () => {
    const [selectedRoles, setSelectedRoles] = useState<{ role: string; experience: number }[]>([]);
    const [periods, setPeriods] = useState<{ startDate: string; endDate: string }[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [message, setMessage] = useState<string | null>(null);

    const handleSubmit = async () => {
        setLoading(true);
        setError(null);
        setMessage(null);

        const applicationData: ApplicationData = { roles: selectedRoles, periods };

        try {
            await sendApplication(applicationData);
            setMessage("Ansökan skickades in!");
            setSelectedRoles([]);
            setPeriods([]);
        } catch (err: any) {
            setError(err.message || "Ett fel uppstod vid ansökan.");
        } finally {
            setLoading(false);
        }
    };

    return { selectedRoles, setSelectedRoles, periods, setPeriods, loading, error, message, handleSubmit };
};
