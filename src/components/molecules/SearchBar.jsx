import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import Input from '@/components/atoms/Input';
import Button from '@/components/atoms/Button';

const SearchBar = ({ 
  onSearch, 
  placeholder = "Search your entries...",
  className = ""
}) => {
  const [query, setQuery] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  const handleClear = () => {
    setQuery('');
    onSearch('');
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className={`relative ${className}`}
      initial={false}
      animate={{ width: isExpanded ? '100%' : 'auto' }}
    >
      <div className="relative flex items-center">
        <div className="relative flex-1">
          <ApperIcon 
            name="Search" 
            size={20} 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
          />
          <Input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsExpanded(true)}
            onBlur={() => setIsExpanded(false)}
            placeholder={placeholder}
            className="pl-10 pr-20 bg-white/80 backdrop-blur-sm border-gray-200 focus:border-primary focus:bg-white"
          />
          {query && (
            <motion.button
              type="button"
              onClick={handleClear}
              className="absolute right-12 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ApperIcon name="X" size={16} />
            </motion.button>
          )}
        </div>
        
        <Button
          type="submit"
          variant="primary"
          size="md"
          className="ml-2 px-3"
          disabled={!query.trim()}
        >
          <ApperIcon name="Search" size={16} />
        </Button>
      </div>
    </motion.form>
  );
};

export default SearchBar;