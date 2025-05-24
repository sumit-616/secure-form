import React, { forwardRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: Array<{ value: string; label: string }>;
  error?: string;
  touched?: boolean;
  helperText?: string;
  placeholder?: string;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(({
  label,
  options,
  error,
  touched,
  helperText,
  placeholder = 'Select an option',
  className = '',
  id,
  ...props
}, ref) => {
  const [isFocused, setIsFocused] = useState(false);
  
  const inputId = id || label.toLowerCase().replace(/\s+/g, '-');
  const showError = touched && error;

  return (
    <div className="mb-4">
      <label 
        htmlFor={inputId} 
        className="block text-sm font-medium mb-1 text-slate-700 dark:text-slate-300"
      >
        {label}
        {props.required && <span className="text-red-500 ml-1">*</span>}
      </label>
      
      <div className="relative">
        <select
          id={inputId}
          ref={ref}
          className={`
            w-full py-2 pl-3 pr-10 appearance-none rounded-md transition-all duration-200
            border text-slate-900 dark:text-slate-100 bg-white dark:bg-slate-800

            disabled:opacity-60 disabled:cursor-not-allowed
            ${showError 
              ? 'border-red-500 dark:border-red-400' 
              : isFocused 
                ? 'border-blue-500 dark:border-blue-400 ring-1 ring-blue-500 dark:ring-blue-400' 
                : 'border-slate-300 dark:border-slate-600'
            }
            ${className}
          `}
          onFocus={() => setIsFocused(true)}
          onBlur={(e) => {
            setIsFocused(false);
            if (props.onBlur) props.onBlur(e);
          }}
          aria-invalid={showError ? 'true' : 'false'}
          aria-describedby={showError ? `${inputId}-error` : undefined}
          {...props}
        >
          <option value="" disabled hidden>
            {placeholder}
          </option>
          
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        
        <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none text-slate-500 dark:text-slate-400">
          <ChevronDown size={18} />
        </div>
      </div>

      {(showError || helperText) && (
        <p 
          id={showError ? `${inputId}-error` : undefined}
          className={`mt-1 text-sm ${showError ? 'text-red-500 dark:text-red-400' : 'text-slate-500 dark:text-slate-400'}`}
        >
          {showError ? error : helperText}
        </p>
      )}
    </div>
  );
});

Select.displayName = 'Select';

export default Select;