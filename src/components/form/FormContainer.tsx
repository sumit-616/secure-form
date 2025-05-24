import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Moon, Sun, Download } from 'lucide-react';

import { useFormValidation } from '../../hooks/useFormValidation';
import { useTheme } from '../../hooks/useTheme';
import { downloadFile, convertToCSV, generatePDFContent } from '../../utils/helpers';

import Button from '../ui/Button';
import ProgressBar from '../ui/ProgressBar';
import PersonalInfoStep from './steps/PersonalInfoStep';
import AccountInfoStep from './steps/AccountInfoStep';
import LocationInfoStep from './steps/LocationInfoStep';
import ToastContainer from '../ui/ToastContainer';

const FormContainer: React.FC = () => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<'success' | 'error' | 'info' | 'warning'>('info');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const {
    formData,
    errors,
    touched,
    formCompletion,
    handleChange,
    handleBlur,
    isStepValid,
    goToNextStep,
    goToPrevStep,
    isFormValid,
    validateForm,
    resetForm
  } = useFormValidation();
  
  const handleNextStep = () => {
    if (isStepValid(formData.formStep)) {
      showNotification('Form step saved', 'success');
      goToNextStep();
    } else {
      showNotification('Please fill all required fields correctly', 'error');
    }
  };
  
  const handlePrevStep = () => {
    goToPrevStep();
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      showNotification('Please complete all required fields correctly', 'error');
      return;
    }
    
    setIsSubmitting(true);
    
    setTimeout(() => {
      setIsSubmitting(false);
      showNotification('Form submitted successfully!', 'success');
      navigate('/summary', { state: { formData } });
    }, 1500);
  };
  
  const handleReset = () => {
    resetForm();
    showNotification('Form has been reset', 'info');
  };
  
  const showNotification = (message: string, type: 'success' | 'error' | 'info' | 'warning') => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);
  };
  
  const handleDownloadPDF = () => {
    const pdfContent = generatePDFContent(formData);
    downloadFile(pdfContent, 'user-form-data.txt', 'text/plain');
    showNotification('Downloaded as Text file', 'success');
  };
  
  const handleDownloadCSV = () => {
    const csvContent = convertToCSV(formData);
    downloadFile(csvContent, 'user-form-data.csv', 'text/csv');
    showNotification('Downloaded as CSV', 'success');
  };

  useEffect(()=>{
    console.log(isSubmitting);
    console.log(!isFormValid);
    console.log(formData);
  },[]);
  
  const renderFormStep = () => {
    switch (formData.formStep) {
      case 1:
        return (
          <PersonalInfoStep
            formData={formData}
            errors={errors}
            touched={touched}
            handleChange={handleChange}
            handleBlur={handleBlur}
          />
        );
      case 2:
        return (
          <AccountInfoStep
            formData={formData}
            errors={errors}
            touched={touched}
            handleChange={handleChange}
            handleBlur={handleBlur}
          />
        );
      case 3:
        return (
          <LocationInfoStep
            formData={formData}
            errors={errors}
            touched={touched}
            handleChange={handleChange}
            handleBlur={handleBlur}
          />
        );
      default:
        return null;
    }
  };
  
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-slate-100">
            Advanced Registration Form
          </h1>
          
          <Button
            variant="outline"
            size="sm"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
          </Button>
        </div>
        
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md overflow-hidden transition-colors duration-300">
          <div className="p-6">
            <div className="mb-6">
              <ProgressBar 
                value={formCompletion} 
                label="Form Completion" 
                showLabel={true}
                size="md"
              />
              
              <div className="flex justify-between mt-2">
                <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
                  Step {formData.formStep} of 3
                </span>
                <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
                  {formCompletion}% Complete
                </span>
              </div>
            </div>
            
            <form onSubmit={handleSubmit}>
              {renderFormStep()}
              
              <div className="flex flex-wrap justify-between mt-8 gap-3">
                {formData.formStep > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handlePrevStep}
                  >
                    Previous
                  </Button>
                )}
                
                {formData.formStep < 3 ? (
                  <Button
                    type="button"
                    onClick={handleNextStep}
                  >
                    Next
                  </Button>
                ) : (
                  <div className="flex flex-wrap gap-3">
                    <Button
                      type="submit"
                      variant="success"
                      isLoading={isSubmitting}
                    >
                      Submit
                    </Button>
                    
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleReset}
                    >
                      Reset
                    </Button>
                    
                    <Button
                      type="button"
                      variant="secondary"
                      onClick={handleDownloadPDF}
                    >
                      <Download size={16} />
                      <span>Download Text</span>
                    </Button>
                    
                    <Button
                      type="button"
                      variant="secondary"
                      onClick={handleDownloadCSV}
                    >
                      <Download size={16} />
                      <span>Download CSV</span>
                    </Button>
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
      
      <ToastContainer
        show={showToast}
        message={toastMessage}
        type={toastType}
        onClose={() => setShowToast(false)}
      />
    </div>
  );
};

export default FormContainer;