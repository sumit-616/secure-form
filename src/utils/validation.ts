const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
const PHONE_REGEX = /^\d{10}$/;
const PAN_REGEX = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
const AADHAR_REGEX = /^\d{12}$/;
const USERNAME_REGEX = /^[a-zA-Z0-9_]{5,15}$/;

export const validateRequired = (value: string): boolean => {
  return value.trim() !== '';
};

export const validateEmail = (email: string): boolean => {
  return EMAIL_REGEX.test(email);
};

export const validatePassword = (password: string): boolean => {
  return PASSWORD_REGEX.test(password);
};

export const validatePhone = (phone: string): boolean => {
  return PHONE_REGEX.test(phone);
};

export const validatePAN = (pan: string): boolean => {
  return PAN_REGEX.test(pan);
};

export const validateAadhar = (aadhar: string): boolean => {
  return AADHAR_REGEX.test(aadhar);
};

export const validateUsername = (username: string): boolean => {
  return USERNAME_REGEX.test(username);
};

export const calculatePasswordStrength = (password: string): number => {
  if (!password) return 0;
  
  let strength = 0;
  
  strength += Math.min(25, Math.floor(password.length * 2.5));
  
  if (/[a-z]/.test(password)) strength += 15; 
  if (/[A-Z]/.test(password)) strength += 15; 
  if (/[0-9]/.test(password)) strength += 15; 
  if (/[^A-Za-z0-9]/.test(password)) strength += 15; 
  
  const uniqueChars = new Set(password).size;
  strength += Math.min(15, uniqueChars);
  
  return Math.min(100, strength);
};

export const getPasswordStrengthLabel = (strength: number): { 
  label: string; 
  color: string;
  darkColor: string;
} => {
  if (strength < 30) return { label: 'Very Weak', color: 'bg-red-600', darkColor: 'dark:bg-red-500' };
  if (strength < 50) return { label: 'Weak', color: 'bg-orange-500', darkColor: 'dark:bg-orange-400' };
  if (strength < 70) return { label: 'Moderate', color: 'bg-yellow-500', darkColor: 'dark:bg-yellow-400' };
  if (strength < 90) return { label: 'Strong', color: 'bg-green-500', darkColor: 'dark:bg-green-400' };
  return { label: 'Very Strong', color: 'bg-emerald-600', darkColor: 'dark:bg-emerald-500' };
};

export const getErrorMessage = (field: string, value: string): string => {
  if (!validateRequired(value)) {
    return `${field} is required`;
  }

  switch (field) {
    case 'Email':
      return validateEmail(value) ? '' : 'Please enter a valid email address';
    case 'Password':
      return validatePassword(value) 
        ? '' 
        : 'Password must be at least 8 characters and include uppercase, lowercase, number and special character';
    case 'Phone Number':
      return validatePhone(value) ? '' : 'Please enter a valid 10-digit phone number';
    case 'PAN Number':
      return validatePAN(value) ? '' : 'Please enter a valid PAN number (e.g., ABCDE1234F)';
    case 'Aadhar Number':
      return validateAadhar(value) ? '' : 'Please enter a valid 12-digit Aadhar number';
    case 'Username':
      return validateUsername(value) 
        ? '' 
        : 'Username must be 5-15 characters and can contain letters, numbers and underscores';
    default:
      return '';
  }
};

export const calculateFormCompletion = (formData: Record<string, any>): number => {
  const requiredFields = [
    'firstName', 'lastName', 'username', 'email', 
    'password', 'phoneNumber', 'country', 'city', 
    'panNumber', 'aadharNumber'
  ];
  
  const filledFields = requiredFields.filter(field => 
    formData[field] && validateRequired(formData[field].toString())
  );
  
  return Math.floor((filledFields.length / requiredFields.length) * 100);
};