import { useState } from "react";
import { Plus, Trash } from "lucide-react";
import Button from "./button";

export default function ApplicationForm() {
  const [roles] = useState(["Biljettförsäljare", "Lotteriförsäljare", "Berg och dalbansoperatör"]);
  const [selectedRoles, setSelectedRoles] = useState<{ role: string; experience: number }[]>([]);
  const [periods, setPeriods] = useState<{ startDate: string; endDate: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async () => {
    if (!isValidForm()) return; // Prevent submitting invalid form

    setLoading(true);
    setMessage("");

    const formData = { roles: selectedRoles, periods };
    
    try {
      const response = await fetch("https://your-backend-api.com/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setMessage("Ansökan skickades in!");
        setSelectedRoles([]);
        setPeriods([]);
      } else {
        setMessage("Något gick fel. Försök igen.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setMessage("Ett nätverksfel uppstod.");
    }

    setLoading(false);
  };

  const isValidForm = () => {
    const hasValidExperience = selectedRoles.length > 0 && selectedRoles.every((role) => role.experience > 0);

    const hasValidPeriods =
      periods.length > 0 &&
      periods.every((p) => p.startDate && p.endDate && new Date(p.startDate) < new Date(p.endDate)); // Ensuring valid dates
    return hasValidExperience && hasValidPeriods;
  };

  return (
    <div className="page-container">
      <a href="#" className="company-name">Leos Jobbland</a>

      <div className="form-container">
        <h2>Ansökningsformulär</h2>

        {/* Role Selection */}
        {selectedRoles.map((entry, index) => (
          <div key={index} className="mb-2 flex items-center gap-2">
            <select
              value={entry.role}
              onChange={(e) => {
                const newRoles = [...selectedRoles];
                newRoles[index].role = e.target.value;
                setSelectedRoles(newRoles);
              }}
            >
              {roles
                .filter((role) => role === entry.role || !selectedRoles.some((selected) => selected.role === role))
                .map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
            </select>

            <input
              type="number"
              step="0.1"
              value={entry.experience}
              min={0}
              onChange={(e) => {
                const newRoles = [...selectedRoles];
                newRoles[index].experience = parseFloat(e.target.value);
                setSelectedRoles(newRoles);
              }}
            />

            <button onClick={() => setSelectedRoles(selectedRoles.filter((_, i) => i !== index))}>
              <Trash size={16} />
            </button>
          </div>
        ))}

        <button
          onClick={() =>
            setSelectedRoles([...selectedRoles, { role: roles.find((r) => !selectedRoles.some((sr) => sr.role === r)) || "", experience: 0 }])
          }
          disabled={selectedRoles.length >= roles.length}
        >
          <Plus size={16} /> Lägg till roll
        </button>

        {/* Work Periods */}
        <h3 className="mt-4">Arbetsperioder</h3>

        {periods.map((period, index) => {
          const isInvalidPeriod =
            period.startDate && period.endDate && new Date(period.startDate) >= new Date(period.endDate);

          return (
            <div key={index} className="mb-2 flex flex-col">
              <div className="flex items-center gap-2">
                <input
                  type="date"
                  value={period.startDate}
                  onChange={(e) => {
                    const newPeriods = [...periods];
                    newPeriods[index].startDate = e.target.value;
                    setPeriods(newPeriods);
                  }}
                />

                <input
                  type="date"
                  value={period.endDate}
                  onChange={(e) => {
                    const newPeriods = [...periods];
                    newPeriods[index].endDate = e.target.value;
                    setPeriods(newPeriods);
                  }}
                />

                <button onClick={() => setPeriods(periods.filter((_, i) => i !== index))}>
                  <Trash size={16} />
                </button>
              </div>

              {isInvalidPeriod && <p className="text-red-500">Slutdatum måste vara efter startdatum!</p>}
            </div>
          );
        })}

        <button onClick={() => setPeriods([...periods, { startDate: "", endDate: "" }])}>
          <Plus size={16} /> Lägg till period
        </button>

        {/* Submit Button */}
        <div className="button-container">
          <Button
            text={loading ? "Skickar..." : "Skicka Ansökan"}
            type="submit"
            onClick={handleSubmit}
            disabled={!isValidForm() || loading}
          >
            
          </Button>
        </div>

        {/* Success/Error Message */}
        {message && <p className="mt-2">{message}</p>}
      </div>
    </div>
  );
}
