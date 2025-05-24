import React from 'react';
import Input from '../../ui/Input';
import { FormField } from '../../../hooks/useFormValidation';

interface PersonalInfoStepProps {
  formData: Record<string, any>;
  errors: Record<string, string>;
  touched: Record<string, boolean>;
  handleChange: (field: FormField, value: string) => void;
  handleBlur: (field: FormField) => void;
}

const PersonalInfoStep: React.FC<PersonalInfoStepProps> = ({
  formData,
  errors,
  touched,
  handleChange,
  handleBlur
}) => {
  return (
    <div className="space-y-4 animate-fadeIn">
      <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-4">
        Personal Information
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="First Name"
          id="firstName"
          name="firstName"
          value={formData.firstName}
          onChange={(e) => handleChange('firstName', e.target.value)}
          onBlur={() => handleBlur('firstName')}
          error={errors.firstName}
          touched={touched.firstName}
          required
          placeholder="Enter your first name"
          autoComplete="given-name"
        />
        
        <Input
          label="Last Name"
          id="lastName"
          name="lastName"
          value={formData.lastName}
          onChange={(e) => handleChange('lastName', e.target.value)}
          onBlur={() => handleBlur('lastName')}
          error={errors.lastName}
          touched={touched.lastName}
          required
          placeholder="Enter your last name"
          autoComplete="family-name"
        />
      </div>
      
      <Input
        label="Username"
        id="username"
        name="username"
        value={formData.username}
        onChange={(e) => handleChange('username', e.target.value)}
        onBlur={() => handleBlur('username')}
        error={errors.username}
        touched={touched.username}
        required
        placeholder="Choose a username (5-15 characters)"
        autoComplete="username"
        helperText="Username must be 5-15 characters and can contain letters, numbers and underscores"
      />
      
      <div className="pt-4 border-t border-slate-200 dark:border-slate-700 mt-6">
        <p className="text-sm text-slate-600 dark:text-slate-400">
          All fields marked with <span className="text-red-500">*</span> are required.
          Enter your basic personal information to proceed to the next step.
        </p>
      </div>
    </div>
  );
};

export default PersonalInfoStep;