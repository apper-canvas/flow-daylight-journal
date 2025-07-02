import React from 'react';
import { motion } from 'framer-motion';
import { formatDate } from '@/utils/dateUtils';
import ApperIcon from '@/components/ApperIcon';
import SearchBar from '@/components/molecules/SearchBar';

const Header = ({ onSearch, showSearch = true, className = "" }) => {
  const today = new Date();

  return (
    <motion.header
      className={`bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-40 ${className}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <motion.div
              className="flex items-center space-x-3"
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center shadow-lg">
                <ApperIcon name="BookOpen" size={24} className="text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold gradient-text font-display">
                  DayLight Journal
                </h1>
                <p className="text-sm text-gray-500">
                  {formatDate(today, 'EEEE, MMMM d')}
                </p>
              </div>
            </motion.div>
          </div>
          
          {showSearch && (
            <div className="flex-1 max-w-md mx-8">
              <SearchBar 
                onSearch={onSearch}
                placeholder="Search your thoughts..."
              />
            </div>
          )}
          
          <div className="flex items-center space-x-2">
            <motion.button
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ApperIcon name="Settings" size={20} className="text-gray-600" />
            </motion.button>
            
            <motion.button
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ApperIcon name="Download" size={20} className="text-gray-600" />
            </motion.button>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;