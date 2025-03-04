export interface ApplicationData {
    competenceProfile: {
        profession: string;
        years_of_experience: number;
    }[];
    availabilityProfile: {
        availabilityFrom: Date | null;
        availabilityTo: Date | null;
    }[];
}
