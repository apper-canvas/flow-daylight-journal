import React from 'react';
import { motion } from 'framer-motion';

const Badge = ({ 
  children, 
  variant = 'default', 
  size = 'md',
  className = '',
  ...props 
}) => {
  const baseClasses = 'inline-flex items-center font-medium rounded-full transition-all duration-200';
  
  const variants = {
    default: 'bg-gray-100 text-gray-800',
    primary: 'bg-gradient-to-r from-primary/20 to-secondary/20 text-primary border border-primary/30',
    secondary: 'bg-gradient-to-r from-secondary/20 to-info/20 text-secondary border border-secondary/30',
    success: 'bg-gradient-to-r from-success/20 to-secondary/20 text-success border border-success/30',
    warning: 'bg-gradient-to-r from-warning/20 to-accent/20 text-warning border border-warning/30',
    error: 'bg-gradient-to-r from-error/20 to-accent/20 text-error border border-error/30',
    mood: 'shadow-md border border-white/50 backdrop-blur-sm'
  };
  
  const sizes = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
    lg: 'px-4 py-2 text-base'
  };
  
  const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`;
  
  return (
    <motion.span
      className={classes}
      whileHover={{ scale: 1.05 }}
      {...props}
    >
      {children}
    </motion.span>
  );
};

export default Badge;