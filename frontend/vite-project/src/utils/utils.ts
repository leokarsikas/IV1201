/* Define helper functions here */

// Validation Functions
const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validatePassword = (password: string): boolean => {
  // At least 8 characters, one uppercase, one lowercase, one number
  const passwordRegex = /^.{8,}$/;
  return passwordRegex.test(password);
};

const validatePersonnummer = (pnr: string): boolean => {
  const cleanedPnr = pnr.replace(/[\s-]/g, "");

  // Regex to match 10-12 digits
  const pnrRegex = /^\d{10,12}$/;

  // First check if the format is correct (10-12 digits)
  return pnrRegex.test(cleanedPnr);
};

const validateName = (name: string): boolean => {
  return name.trim().length >= 2;
};

const validateUsername = (username: string): boolean => {
  return username.trim().length >= 3;
};

const isEmailThere = (email: string): boolean => {
  return email.trim().length < 1;
};

const isPasswordThere = (password: string): boolean => {
  return password.length < 1;
};

const isUsernameThere = (username: string): boolean => {
  return username.length < 1;
};

// New Set removes duplicates from an array. If the array argument have the same length as the new set: return true, else return false
const validateRole = (role: string, allRoles: string[]): string => {
  if (role === "") {
    return "Välj en roll";
  }

  const roleOccurrences = allRoles.filter((r) => r === role).length;
  if (roleOccurrences > 1) {
    return "Du får inte ha två, eller fler av samma roll";
  }

  return "";
};
// Should be larger than 0
const validateYearsOfExperience = (years: number): boolean => {
  return  years === 0;
};

const validateFromDate = (dateFrom: (Date | string | number)[], dateTo: (Date | string)[]): string => {
  if(dateFrom.some(i => i === null) || dateTo.some(i => i === null)){
    return "Du måste fylla i ett datum"
  }
  for (let i = 0; i < dateFrom.length; i++) {
    if (new Date (dateFrom[i]) > new Date(dateTo[i])) {
      return "Startdatum kan inte vara senare än slutdatum" // Return true if any dateFrom is greater than corresponding dateTo
    }
  }
  return ''; // Return false if all dateFrom are less than or equal to dateTo
};


const validateToDate = (dateFrom : (Date | string)[], dateTo: (Date | string) []) : string => {

  if(dateFrom.some(i => i === null) || dateTo.some(i => i === null)){
    return "Du måste fylla i ett datum"
  }
  for (let i = 0; i < dateFrom.length; i++) {
    if (new Date(dateTo[i]) < new Date(dateFrom[i])) {
      return "Slutdatum kan inte vara tidigare än startdatum"; // Return true if any dateFrom is greater than corresponding dateTo
    }
  }
  return ''; // Return false if all dateFrom are less than or equal to dateTo
}


export {
  validateEmail,
  validateName,
  validatePassword,
  validatePersonnummer,
  validateUsername,
  isEmailThere,
  isPasswordThere,
  isUsernameThere,
  validateRole,
  validateYearsOfExperience,
  validateFromDate,validateToDate
};
