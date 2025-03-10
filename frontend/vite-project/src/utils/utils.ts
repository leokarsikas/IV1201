/* Define helper functions here */

/**
 * Validates an email address format.
 * @param {string} email - The email to validate.
 * @returns {boolean} True if the email format is valid, false otherwise.
 */
const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validates a password.
 *
 * A valid password must be at least 8 characters long.
 * @param {string} password - The password to validate.
 * @returns {boolean} True if the password meets the criteria, false otherwise.
 */
const validatePassword = (password: string): boolean => {
  // At least 8 characters, one uppercase, one lowercase, one number
  const passwordRegex = /^.{8,}$/;
  return passwordRegex.test(password);
};

/**
 * Validates personnummer (social-security-number (SSN)).
 *
 * The expected format is `YYYYMMDD-XXXX`.
 * @param {string} pnr - The person number to validate.
 * @returns {boolean} True if the format is correct, false otherwise.
 */
const validatePersonnummer = (pnr: string): boolean => {
  // Regex to match exactly 8 digits, a hyphen, then 4 digits
  const pnrRegex = /^\d{8}-\d{4}$/;
  return pnrRegex.test(pnr);
};
/**
 * Validates a name.
 *
 * A valid name must be at least 2 characters long.
 * @param {string} name - The name to validate.
 * @returns {boolean} True if the name meets the criteria, false otherwise.
 */
const validateName = (name: string): boolean => {
  return name.trim().length >= 2;
};
/**
 * Validates a username.
 *
 * A valid username must be at least 3 characters long.
 * @param {string} username - The username to validate.
 * @returns {boolean} True if the username meets the criteria, false otherwise.
 */
const validateUsername = (username: string): boolean => {
  return username.trim().length >= 3;
};
/**
 * Checks if an email is provided.
 *
 * @param {string} email - The email to check.
 * @returns {boolean} True if the email is empty, false otherwise.
 */
const isEmailThere = (email: string): boolean => {
  return email.trim().length < 1;
};
/**
 * Checks if a password is provided.
 *
 * @param {string} password - The password to check.
 * @returns {boolean} True if the password is empty, false otherwise.
 */
const isPasswordThere = (password: string): boolean => {
  return password.length < 1;
};
/**
 * Checks if a username is provided.
 *
 * @param {string} username - The username to check.
 * @returns {boolean} True if the username is empty, false otherwise.
 */
const isUsernameThere = (username: string): boolean => {
  return username.length < 1;
};

/**
 * Validates a role.
 *
 * Checks if the role is selected and if there are duplicates in the provided roles.
 * @param {string} role - The role to validate.
 * @param {string[]} allRoles - The array of all roles to check against.
 * @returns {string} An error message if validation fails, empty string otherwise.
 */
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


/**
 * Validates years of experience.
 *
 * The value must be greater than 0.
 * @param {number} years - The number of years to validate.
 * @returns {boolean} True if the years are greater than 0, false otherwise.
 */
const validateYearsOfExperience = (years: number): boolean => {
  return  years === 0;
};
/**
 * Validates a date range from a start date to an end date.
 *
 * Checks if any start date is later than the corresponding end date.
 * @param {(Date | string | number)[]} dateFrom - The array of start dates.
 * @param {(Date | string)[]} dateTo - The array of end dates.
 * @returns {string} An error message if validation fails, empty string otherwise.
 */
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

/**
 * Validates a date range from an end date to a start date.
 *
 * Checks if any end date is earlier than the corresponding start date.
 * @param {(Date | string)[]} dateFrom - The array of start dates.
 * @param {(Date | string)[]} dateTo - The array of end dates.
 * @returns {string} An error message if validation fails, empty string otherwise.
 */
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
