export interface ApplicationData {
    userName : string | null,
    competenceProfile: {
        profession: string;
        years_of_experience: number;
    }[];
    availabilityProfile: {
        availabilityFrom: Date | null;
        availabilityTo: Date | null;
    }[];
}
