import { useState, useEffect, useRef } from 'react';
import { getErrorMessage, calculateFormCompletion } from '../utils/validation';
import { saveFormToLocalStorage, loadFormFromLocalStorage } from '../utils/helpers';

const initialFormData = {
  firstName: '',
  lastName: '',
  username: '',
  email: '',
  password: '',
  phoneNumber: '',
  countryCode: '+91',
  country: '',
  city: '',
  panNumber: '',
  aadharNumber: '',
  formStep: 1
};

export type FormField = keyof typeof initialFormData;

interface UseFormValidationResult {
  formData: typeof initialFormData;
  errors: Record<string, string>;
  touched: Record<string, boolean>;
  formCompletion: number;
  handleChange: (field: FormField, value: string) => void;
  handleBlur: (field: FormField) => void;
  validateField: (field: FormField, value: string) => string;
  resetForm: () => void;
  setFormData: React.Dispatch<React.SetStateAction<typeof initialFormData>>;
  isStepValid: (step: number) => boolean;
  goToNextStep: () => void;
  goToPrevStep: () => void;
  isFormValid: boolean;
  validateForm: () => boolean;
}

export const useFormValidation = (): UseFormValidationResult => {
  const savedData = loadFormFromLocalStorage();
  const [formData, setFormData] = useState(savedData || initialFormData);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [formCompletion, setFormCompletion] = useState(0);
  const [isFormValid, setIsFormValid] = useState(false);
  const isInitialMount = useRef(true);

  useEffect(() => {
    const completion = calculateFormCompletion(formData);
    setFormCompletion(completion);
    saveFormToLocalStorage(formData);
  }, [formData]);

  const validateField = (field: FormField, value: string): string => {
    const fieldName = field
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, str => str.toUpperCase());
    
    return getErrorMessage(fieldName, value);
  };

  const handleChange = (field: FormField, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleBlur = (field: FormField) => {
    setTouched(prev => ({
      ...prev,
      [field]: true
    }));
  };

  const resetForm = () => {
    setFormData(initialFormData);
    setErrors({});
    setTouched({});
    setIsFormValid(false);
  };

  const isStepValid = (step: number): boolean => {
    const stepFields: Record<number, FormField[]> = {
      1: ['firstName', 'lastName', 'username'],
      2: ['email', 'password', 'phoneNumber', 'countryCode'],
      3: ['country', 'city', 'panNumber', 'aadharNumber']
    };
    
    const fieldsToValidate = stepFields[step] || [];
    const newErrors: Record<string, string> = {};
    
    const stepIsValid = fieldsToValidate.every(field => {
      const errorMessage = validateField(field, formData[field]?.toString() || '');
      if (errorMessage) {
        newErrors[field] = errorMessage;
      }
      return !errorMessage;
    });
    
    setErrors(prev => ({ ...prev, ...newErrors }));
    return stepIsValid;
  };

  const goToNextStep = () => {
    if (formData.formStep < 3 && isStepValid(formData.formStep)) {
      setFormData(prev => ({
        ...prev,
        formStep: prev.formStep + 1
      }));
    }
  };

  const goToPrevStep = () => {
    if (formData.formStep > 1) {
      setFormData(prev => ({
        ...prev,
        formStep: prev.formStep - 1
      }));
    }
  };

  const validateForm = (): boolean => {
    const allFields: FormField[] = [
      'firstName', 'lastName', 'username', 'email', 
      'password', 'phoneNumber', 'country', 'city', 
      'panNumber', 'aadharNumber'
    ];
    
    const newErrors: Record<string, string> = {};
    const formIsValid = allFields.every(field => {
      const value = formData[field]?.toString() || '';
      const errorMessage = validateField(field, value);
      if (errorMessage) {
        newErrors[field] = errorMessage;
      }
      return !errorMessage;
    });
    
    setErrors(newErrors);
    setIsFormValid(formIsValid);
    
    return formIsValid;
  };

  return {
    formData,
    errors,
    touched,
    formCompletion,
    handleChange,
    handleBlur,
    validateField,
    resetForm,
    setFormData,
    isStepValid,
    goToNextStep,
    goToPrevStep,
    isFormValid,
    validateForm
  };
};