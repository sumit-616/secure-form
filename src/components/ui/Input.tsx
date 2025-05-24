import React, { forwardRef, useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  touched?: boolean;
  helperText?: string;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  showPasswordToggle?: boolean;
  characterCount?: boolean;
  maxLength?: number;
}

const Input = forwardRef<HTMLInputElement, InputProps>(({
  label,
  error,
  touched,
  helperText,
  prefix,
  suffix,
  className = '',
  id,
  type = 'text',
  showPasswordToggle = false,
  characterCount = false,
  maxLength,
  ...props
}, ref) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  
  const inputId = id || label.toLowerCase().replace(/\s+/g, '-');
  const showError = touched && error;
  const currentLength = props.value?.toString().length || 0;
  
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  
  const inputType = type === 'password' && showPassword ? 'text' : type;
  
  return (
    <div className="mb-4">
      <label 
        htmlFor={inputId} 
        className="block text-sm font-medium mb-1 text-slate-700 dark:text-slate-300"
      >
        {label}
        {props.required && <span className="text-red-500 ml-1">*</span>}
      </label>
      
      <div 
        className={`
          relative flex items-center rounded-md border transition-all duration-200
          ${showError 
            ? 'border-red-500 dark:border-red-400' 
            : isFocused 
              ? 'border-blue-500 dark:border-blue-400 ring-1 ring-blue-500 dark:ring-blue-400' 
              : 'border-slate-300 dark:border-slate-600'
          }
          ${className}
        `}
      >
        {prefix && (
          <div className="flex items-center justify-center pl-3 pr-2 text-slate-500 dark:text-slate-400">
            {prefix}
          </div>
        )}
        
        <input
          id={inputId}
          ref={ref}
          type={inputType}
          className={`
            w-full py-2 px-3 rounded-md bg-transparent text-slate-900 dark:text-slate-100
            placeholder:text-slate-400 dark:placeholder:text-slate-500
            focus:outline-none disabled:opacity-60 disabled:cursor-not-allowed
            ${prefix ? 'pl-1' : ''}
            ${suffix || showPasswordToggle ? 'pr-10' : ''}
          `}
          onFocus={() => setIsFocused(true)}
          onBlur={(e) => {
            setIsFocused(false);
            if (props.onBlur) props.onBlur(e);
          }}
          aria-invalid={showError ? 'true' : 'false'}
          aria-describedby={showError ? `${inputId}-error` : undefined}
          maxLength={maxLength}
          {...props}
        />
        
        {showPasswordToggle && type === 'password' && (
          <button
            type="button"
            className="absolute right-3 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300"
            onClick={togglePasswordVisibility}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
            tabIndex={-1}
          >
            {showPassword ? (
              <EyeOff size={18} />
            ) : (
              <Eye size={18} />
            )}
          </button>
        )}
        
        {suffix && !showPasswordToggle && (
          <div className="absolute right-3 text-slate-500 dark:text-slate-400">
            {suffix}
          </div>
        )}
      </div>
      
      <div className="flex justify-between mt-1">
        {(showError || helperText) && (
          <p 
            id={showError ? `${inputId}-error` : undefined}
            className={`text-sm ${showError ? 'text-red-500 dark:text-red-400' : 'text-slate-500 dark:text-slate-400'}`}
          >
            {showError ? error : helperText}
          </p>
        )}
        
        {characterCount && maxLength && (
          <p className={`text-xs ml-auto ${currentLength >= maxLength ? 'text-amber-500' : 'text-slate-500 dark:text-slate-400'}`}>
            {currentLength}/{maxLength}
          </p>
        )}
      </div>
    </div>
  );
});

Input.displayName = 'Input';

export default Input;