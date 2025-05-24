import React, { useEffect, useState } from 'react';
import { MapPin, CreditCard, FileText } from 'lucide-react';
import Input from '../../ui/Input';
import Select from '../../ui/Select';
import { FormField } from '../../../hooks/useFormValidation';
import { countryCityData } from '../../../data/countryCityData';
import { detectUserCountry } from '../../../utils/helpers';

interface LocationInfoStepProps {
  formData: Record<string, any>;
  errors: Record<string, string>;
  touched: Record<string, boolean>;
  handleChange: (field: FormField, value: string) => void;
  handleBlur: (field: FormField) => void;
}

const LocationInfoStep: React.FC<LocationInfoStepProps> = ({
  formData,
  errors,
  touched,
  handleChange,
  handleBlur
}) => {
  const [availableCities, setAvailableCities] = useState<string[]>([]);
  
  useEffect(() => {
    if (!formData.country) {
      const detectedCountry = detectUserCountry();
      if (detectedCountry && countryCityData[detectedCountry]) {
        handleChange('country', detectedCountry);
      }
    }
  }, []);
  
  useEffect(() => {
    if (formData.country && countryCityData[formData.country]) {
      setAvailableCities(countryCityData[formData.country]);
      
      if (formData.city && !countryCityData[formData.country].includes(formData.city)) {
        handleChange('city', '');
      }
    } else {
      setAvailableCities([]);
    }
  }, [formData.country]);
  
  const countries = Object.keys(countryCityData).map(country => ({
    value: country,
    label: country
  }));
  
  const cities = availableCities.map(city => ({
    value: city,
    label: city
  }));
  
  return (
    <div className="space-y-4 animate-fadeIn">
      <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-4">
        Location & Identity
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Select
          label="Country"
          id="country"
          name="country"
          value={formData.country}
          onChange={(e) => handleChange('country', e.target.value)}
          onBlur={() => handleBlur('country')}
          error={errors.country}
          touched={touched.country}
          options={countries}
          required
          placeholder="Select your country"
        />
        
        <Select
          label="City"
          id="city"
          name="city"
          value={formData.city}
          onChange={(e) => handleChange('city', e.target.value)}
          onBlur={() => handleBlur('city')}
          error={errors.city}
          touched={touched.city}
          options={cities}
          required
          placeholder={formData.country ? "Select your city" : "Select country first"}
          disabled={!formData.country}
        />
      </div>
      
      <Input
        label="PAN Number"
        id="panNumber"
        name="panNumber"
        value={formData.panNumber}
        onChange={(e) => {
          const value = e.target.value.toUpperCase();
          handleChange('panNumber', value);
        }}
        onBlur={() => handleBlur('panNumber')}
        error={errors.panNumber}
        touched={touched.panNumber}
        required
        placeholder="Enter your PAN Number (e.g., ABCDE1234F)"
        prefix={<CreditCard size={16} />}
        maxLength={10}
        characterCount={true}
        helperText="PAN must be in format: ABCDE1234F"
      />
      
      <Input
        label="Aadhar Number"
        id="aadharNumber"
        name="aadharNumber"
        value={formData.aadharNumber}
        onChange={(e) => {
          const value = e.target.value.replace(/\D/g, '');
          handleChange('aadharNumber', value);
        }}
        onBlur={() => handleBlur('aadharNumber')}
        error={errors.aadharNumber}
        touched={touched.aadharNumber}
        required
        placeholder="Enter your 12-digit Aadhar Number"
        prefix={<FileText size={16} />}
        maxLength={12}
        characterCount={true}
        helperText="Aadhar must be 12 digits"
      />
      
      <div className="pt-4 border-t border-slate-200 dark:border-slate-700 mt-6">
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Your personal identity information is encrypted and secure.
          We only use this information for verification purposes as required by regulations.
        </p>
      </div>
    </div>
  );
};

export default LocationInfoStep;