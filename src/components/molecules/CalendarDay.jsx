import React from 'react';
import { motion } from 'framer-motion';
import { format, isToday, isSameMonth } from 'date-fns';
import { useMoods } from '@/hooks/useMoods';

const CalendarDay = ({ 
  date, 
  entry, 
  isCurrentMonth = true, 
  onClick,
  className = "" 
}) => {
  const { getMoodByValue } = useMoods();
  const dayNumber = format(date, 'd');
  const isCurrentDay = isToday(date);
  const hasEntry = !!entry;
  const mood = hasEntry ? getMoodByValue(entry.mood) : null;

  const handleClick = () => {
    if (onClick) {
      onClick(date, entry);
    }
  };

  return (
    <motion.button
      onClick={handleClick}
      className={`calendar-day ${isCurrentDay ? 'today' : ''} ${hasEntry ? 'has-entry' : ''} ${
        !isCurrentMonth ? 'text-gray-300' : 'text-gray-700'
      } ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      style={{
        '--mood-color': mood?.color || '#6B5B95'
      }}
    >
      <span className="relative z-10">{dayNumber}</span>
      
      {hasEntry && mood && (
        <motion.div
          className="absolute inset-0 rounded-full opacity-20"
          style={{ backgroundColor: mood.color }}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.1 }}
        />
      )}
      
      {isCurrentDay && (
        <motion.div
          className="absolute inset-0 rounded-full bg-gradient-to-br from-primary to-secondary"
          style={{ zIndex: -1 }}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 300 }}
        />
      )}
    </motion.button>
  );
};

export default CalendarDay;