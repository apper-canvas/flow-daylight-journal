import React from 'react';
import { motion } from 'framer-motion';
import { useMoods } from '@/hooks/useMoods';
import Badge from '@/components/atoms/Badge';

const MoodSelector = ({ selectedMood, onMoodChange, className = "" }) => {
  const { moods, loading } = useMoods();

  if (loading) {
    return (
      <div className={`flex flex-wrap gap-2 ${className}`}>
        {[...Array(5)].map((_, index) => (
          <div key={index} className="shimmer h-8 w-16 rounded-full"></div>
        ))}
      </div>
    );
  }

  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {moods.map((mood) => (
        <motion.button
          key={mood.value}
          type="button"
          onClick={() => onMoodChange(mood.value)}
          className={`relative overflow-hidden rounded-full transition-all duration-200 ${
            selectedMood === mood.value 
              ? 'mood-glow ring-2 ring-white shadow-lg' 
              : 'hover:scale-105'
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{
            backgroundColor: mood.color,
            color: 'white'
          }}
        >
          <Badge
            variant="mood"
            className="text-white font-medium px-3 py-2"
            style={{
              backgroundColor: mood.color,
              border: selectedMood === mood.value ? '2px solid white' : '1px solid rgba(255,255,255,0.3)'
            }}
          >
            <span className="mr-2 text-lg">{mood.emoji}</span>
            <span className="capitalize">{mood.value}</span>
          </Badge>
          
          {selectedMood === mood.value && (
            <motion.div
              className="absolute inset-0 bg-white/20 rounded-full"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.2 }}
            />
          )}
        </motion.button>
      ))}
    </div>
  );
};

export default MoodSelector;