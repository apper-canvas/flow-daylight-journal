import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { formatDate, getRelativeTime } from '@/utils/dateUtils';
import { truncateText, getWordCount, getReadingTime } from '@/utils/textUtils';
import { useMoods } from '@/hooks/useMoods';
import ApperIcon from '@/components/ApperIcon';
import Badge from '@/components/atoms/Badge';

const EntryCard = ({ entry, searchTerm = '', onDelete, className = "" }) => {
  const navigate = useNavigate();
  const { getMoodByValue } = useMoods();
  
  const mood = getMoodByValue(entry.mood);
  const wordCount = getWordCount(entry.content);
  const readingTime = getReadingTime(entry.content);

  const handleClick = () => {
    navigate(`/entry/${entry.date}`);
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this entry?')) {
      onDelete(entry.Id);
    }
  };

  const highlightText = (text) => {
    if (!searchTerm) return text;
    const regex = new RegExp(`(${searchTerm})`, 'gi');
    return text.replace(regex, '<mark class="bg-warning/30 text-warning-dark rounded px-1">$1</mark>');
  };

  return (
    <motion.div
      className={`paper-texture rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer group ${className}`}
      onClick={handleClick}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02, y: -5 }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-800 font-display mb-1">
            {formatDate(entry.date)}
          </h3>
          <p className="text-sm text-gray-500">
            {getRelativeTime(entry.date)}
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          {mood && (
            <Badge
              variant="mood"
              className="text-white font-medium"
              style={{ backgroundColor: mood.color }}
            >
              <span className="mr-1">{mood.emoji}</span>
              <span className="capitalize">{mood.value}</span>
            </Badge>
          )}
          
          <motion.button
            onClick={handleDelete}
            className="opacity-0 group-hover:opacity-100 p-1 rounded-full hover:bg-red-100 text-red-500 transition-all duration-200"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ApperIcon name="Trash2" size={16} />
          </motion.button>
        </div>
      </div>
      
      <div className="mb-4">
        <p 
          className="text-gray-700 leading-relaxed"
          dangerouslySetInnerHTML={{ 
            __html: highlightText(truncateText(entry.content, 200)) 
          }}
        />
      </div>
      
      <div className="flex items-center justify-between text-xs text-gray-500">
        <div className="flex items-center space-x-4">
          <span className="flex items-center">
            <ApperIcon name="FileText" size={12} className="mr-1" />
            {wordCount} words
          </span>
          <span className="flex items-center">
            <ApperIcon name="Clock" size={12} className="mr-1" />
            {readingTime} read
          </span>
        </div>
        
        <div className="flex items-center text-primary">
          <span className="mr-1">Read more</span>
          <ApperIcon name="ArrowRight" size={12} className="group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </motion.div>
  );
};

export default EntryCard;