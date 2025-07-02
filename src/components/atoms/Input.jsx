import React from 'react';

const Input = ({ 
  label, 
  error, 
  className = '', 
  containerClassName = '',
  ...props 
}) => {
  const baseClasses = 'w-full px-4 py-3 rounded-lg border-2 transition-all duration-200 focus:outline-none focus:ring-0 bg-white';
  const normalClasses = 'border-gray-200 focus:border-primary focus:shadow-lg';
  const errorClasses = 'border-error focus:border-error';
  
  const inputClasses = `${baseClasses} ${error ? errorClasses : normalClasses} ${className}`;
  
  return (
    <div className={`space-y-2 ${containerClassName}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <input
        className={inputClasses}
        {...props}
      />
      {error && (
        <p className="text-sm text-error mt-1">{error}</p>
      )}
    </div>
  );
};

export default Input;