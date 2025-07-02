import React from 'react';
import { motion } from 'framer-motion';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  disabled = false,
  className = '',
  ...props 
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'bg-gradient-to-r from-primary to-secondary text-white hover:shadow-lg hover:scale-105 focus:ring-primary/50 active:scale-95',
    secondary: 'bg-gradient-to-r from-secondary to-info text-white hover:shadow-lg hover:scale-105 focus:ring-secondary/50 active:scale-95',
    outline: 'border-2 border-primary text-primary bg-transparent hover:bg-primary hover:text-white focus:ring-primary/50',
    ghost: 'text-gray-600 hover:text-primary hover:bg-primary/10 focus:ring-primary/50',
    danger: 'bg-gradient-to-r from-error to-accent text-white hover:shadow-lg hover:scale-105 focus:ring-error/50 active:scale-95',
    success: 'bg-gradient-to-r from-success to-secondary text-white hover:shadow-lg hover:scale-105 focus:ring-success/50 active:scale-95'
  };
  
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
    xl: 'px-8 py-4 text-lg'
  };
  
  const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`;
  
  return (
    <motion.button
      className={classes}
      disabled={disabled}
      whileHover={!disabled ? { scale: 1.02 } : {}}
      whileTap={!disabled ? { scale: 0.98 } : {}}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default Button;