import React, { useState } from 'react';
import { AtSign, Lock, Phone } from 'lucide-react';
import Input from '../../ui/Input';
import Select from '../../ui/Select';
import ProgressBar from '../../ui/ProgressBar';
import { FormField } from '../../../hooks/useFormValidation';
import { calculatePasswordStrength, getPasswordStrengthLabel } from '../../../utils/validation';

interface AccountInfoStepProps {
  formData: Record<string, any>;
  errors: Record<string, string>;
  touched: Record<string, boolean>;
  handleChange: (field: FormField, value: string) => void;
  handleBlur: (field: FormField) => void;
}

const AccountInfoStep: React.FC<AccountInfoStepProps> = ({
  formData,
  errors,
  touched,
  handleChange,
  handleBlur
}) => {
  const [passwordStrength, setPasswordStrength] = useState(
    calculatePasswordStrength(formData.password)
  );
  
  const strengthInfo = getPasswordStrengthLabel(passwordStrength);
  
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    handleChange('password', newPassword);
    setPasswordStrength(calculatePasswordStrength(newPassword));
  };
  
  const countryCodes = [
    { value: '+1', label: '+1 (US/Canada)' },
    { value: '+44', label: '+44 (UK)' },
    { value: '+91', label: '+91 (India)' },
    { value: '+61', label: '+61 (Australia)' },
    { value: '+33', label: '+33 (France)' },
    { value: '+49', label: '+49 (Germany)' },
    { value: '+81', label: '+81 (Japan)' },
  ];
  
  return (
    <div className="space-y-4 animate-fadeIn">
      <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-4">
        Account Information
      </h2>
      
      <Input
        label="Email Address"
        id="email"
        name="email"
        type="email"
        value={formData.email}
        onChange={(e) => handleChange('email', e.target.value)}
        onBlur={() => handleBlur('email')}
        error={errors.email}
        touched={touched.email}
        required
        placeholder="Enter your email address"
        autoComplete="email"
        prefix={<AtSign size={16} />}
      />
      
      <div className="space-y-2">
        <Input
          label="Password"
          id="password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handlePasswordChange}
          onBlur={() => handleBlur('password')}
          error={errors.password}
          touched={touched.password}
          required
          placeholder="Create a strong password"
          autoComplete="new-password"
          prefix={<Lock size={16} />}
          showPasswordToggle={true}
          helperText="Password must contain at least 8 characters, including uppercase, lowercase, number and special character"
        />
        
        {formData.password && (
          <div className="mt-2">
            <ProgressBar
              value={passwordStrength}
              size="sm"
              color={strengthInfo.color}
              darkColor={strengthInfo.darkColor}
            />
            <p className="text-xs mt-1 text-slate-600 dark:text-slate-400">
              Password Strength: <span className="font-medium">{strengthInfo.label}</span>
            </p>
          </div>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-1">
          <Select
            label="Country Code"
            id="countryCode"
            name="countryCode"
            value={formData.countryCode}
            onChange={(e) => handleChange('countryCode', e.target.value)}
            onBlur={() => handleBlur('countryCode')}
            options={countryCodes}
            required
          />
        </div>
        
        <div className="md:col-span-2">
          <Input
            label="Phone Number"
            id="phoneNumber"
            name="phoneNumber"
            type="tel"
            value={formData.phoneNumber}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, '');
              handleChange('phoneNumber', value);
            }}
            onBlur={() => handleBlur('phoneNumber')}
            error={errors.phoneNumber}
            touched={touched.phoneNumber}
            required
            placeholder="Enter your 10-digit phone number"
            autoComplete="tel"
            prefix={<Phone size={16} />}
            maxLength={10}
            characterCount={true}
          />
        </div>
      </div>
      
      <div className="pt-4 border-t border-slate-200 dark:border-slate-700 mt-6">
        <p className="text-sm text-slate-600 dark:text-slate-400">
          We'll never share your email or phone number with anyone else.
          Your account information is securely stored and protected.
        </p>
      </div>
    </div>
  );
};

export default AccountInfoStep;