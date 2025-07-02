import React from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';

const Empty = ({ 
  type = "entries",
  onAction = null,
  actionText = "Get Started"
}) => {
  const getEmptyContent = () => {
    switch (type) {
      case 'entries':
        return {
          icon: 'BookOpen',
          title: 'Your Journal Awaits',
          message: 'Start your journaling journey by writing your first entry. Capture your thoughts, feelings, and experiences in this personal space.',
          actionText: 'Write Your First Entry',
          gradient: 'from-primary to-secondary'
        };
      case 'search':
        return {
          icon: 'Search',
          title: 'No Entries Found',
          message: 'We couldn\'t find any entries matching your search. Try adjusting your search terms or date range.',
          actionText: 'Clear Search',
          gradient: 'from-secondary to-info'
        };
      case 'calendar':
        return {
          icon: 'Calendar',
          title: 'No Entries This Month',
          message: 'You haven\'t written any entries this month yet. Start documenting your daily experiences and thoughts.',
          actionText: 'Write Today\'s Entry',
          gradient: 'from-info to-primary'
        };
      case 'mood':
        return {
          icon: 'Heart',
          title: 'Track Your Mood',
          message: 'Start tracking your daily mood to gain insights into your emotional patterns and well-being.',
          actionText: 'Add Mood',
          gradient: 'from-accent to-warning'
        };
      default:
        return {
          icon: 'Smile',
          title: 'Nothing Here Yet',
          message: 'This space is waiting for your content. Take the first step and create something meaningful.',
          actionText: actionText,
          gradient: 'from-primary to-accent'
        };
    }
  };

  const emptyContent = getEmptyContent();

  return (
    <motion.div
      className="flex flex-col items-center justify-center py-16 px-6 text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <motion.div
        className={`mb-8 p-8 rounded-full bg-gradient-to-br ${emptyContent.gradient} shadow-lg`}
        initial={{ scale: 0.8, rotate: -10 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
        whileHover={{ scale: 1.05, rotate: 5 }}
      >
        <ApperIcon name={emptyContent.icon} size={64} className="text-white" />
      </motion.div>
      
      <motion.h3
        className="text-2xl font-bold text-gray-800 mb-4 font-display gradient-text"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {emptyContent.title}
      </motion.h3>
      
      <motion.p
        className="text-gray-600 mb-8 max-w-lg leading-relaxed text-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        {emptyContent.message}
      </motion.p>
      
      {onAction && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Button
            onClick={onAction}
            variant="primary"
            size="lg"
            className="group shadow-lg"
          >
            <ApperIcon name="Plus" size={20} className="mr-2 group-hover:rotate-90 transition-transform duration-200" />
            {emptyContent.actionText}
          </Button>
        </motion.div>
      )}
      
      <motion.div
        className="mt-8 text-sm text-gray-400 italic"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        "Every journey begins with a single step."
      </motion.div>
    </motion.div>
  );
};

export default Empty;