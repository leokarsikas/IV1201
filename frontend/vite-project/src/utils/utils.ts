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
    const cleanedPnr = pnr.replace(/[\s-]/g, '');
    
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


  const isEmailThere = (email: string) : boolean =>{
    return email.trim().length < 1
  }

  const isPasswordThere = (password : string) : boolean => {
    return password.length < 1
  }

  const isUsernameThere = (username : string) : boolean => {
    return username.length < 1
  }

  export {validateEmail, validateName, validatePassword, validatePersonnummer, validateUsername, isEmailThere, isPasswordThere, isUsernameThere}