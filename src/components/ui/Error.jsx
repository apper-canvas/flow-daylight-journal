import React from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';

const Error = ({ 
  message = "Something went wrong. Please try again.", 
  onRetry = null,
  type = "general"
}) => {
  const getErrorContent = () => {
    switch (type) {
      case 'network':
        return {
          icon: 'WifiOff',
          title: 'Connection Error',
          message: 'Unable to connect to the server. Please check your internet connection.',
          color: 'text-error'
        };
      case 'notFound':
        return {
          icon: 'FileX',
          title: 'Entry Not Found',
          message: 'The entry you are looking for does not exist or has been deleted.',
          color: 'text-warning'
        };
      case 'search':
        return {
          icon: 'SearchX',
          title: 'Search Failed',
          message: 'Unable to search entries at this time. Please try again.',
          color: 'text-error'
        };
      default:
        return {
          icon: 'AlertCircle',
          title: 'Something Went Wrong',
          message: message,
          color: 'text-error'
        };
    }
  };

  const errorContent = getErrorContent();

  return (
    <motion.div
      className="flex flex-col items-center justify-center py-12 px-6 text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className={`mb-6 p-4 rounded-full bg-gradient-to-br from-surface to-background shadow-lg ${errorContent.color}`}
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
      >
        <ApperIcon name={errorContent.icon} size={48} />
      </motion.div>
      
      <motion.h3
        className="text-xl font-semibold text-gray-800 mb-2 font-display"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {errorContent.title}
      </motion.h3>
      
      <motion.p
        className="text-gray-600 mb-6 max-w-md leading-relaxed"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        {errorContent.message}
      </motion.p>
      
      {onRetry && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Button
            onClick={onRetry}
            variant="primary"
            className="group"
          >
            <ApperIcon name="RefreshCw" size={16} className="mr-2 group-hover:animate-spin" />
            Try Again
          </Button>
        </motion.div>
      )}
    </motion.div>
  );
};

export default Error;