import React from 'react';
import { motion } from 'framer-motion';

const Loading = ({ type = 'entries' }) => {
  const renderEntriesLoading = () => (
    <div className="space-y-6">
      {[...Array(3)].map((_, index) => (
        <motion.div
          key={index}
          className="paper-texture rounded-xl p-6 shadow-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="shimmer h-6 w-32 rounded"></div>
            <div className="shimmer h-8 w-8 rounded-full"></div>
          </div>
          <div className="space-y-3">
            <div className="shimmer h-4 w-full rounded"></div>
            <div className="shimmer h-4 w-4/5 rounded"></div>
            <div className="shimmer h-4 w-3/4 rounded"></div>
          </div>
          <div className="flex items-center justify-between mt-4">
            <div className="shimmer h-3 w-24 rounded"></div>
            <div className="shimmer h-3 w-20 rounded"></div>
          </div>
        </motion.div>
      ))}
    </div>
  );

  const renderCalendarLoading = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="shimmer h-8 w-32 rounded"></div>
        <div className="flex space-x-2">
          <div className="shimmer h-8 w-8 rounded"></div>
          <div className="shimmer h-8 w-8 rounded"></div>
        </div>
      </div>
      <div className="calendar-grid">
        {[...Array(35)].map((_, index) => (
          <div key={index} className="shimmer h-10 rounded"></div>
        ))}
      </div>
    </div>
  );

  const renderEditorLoading = () => (
    <div className="space-y-4">
      <div className="flex items-center space-x-4">
        <div className="shimmer h-10 w-32 rounded"></div>
        <div className="flex space-x-2">
          {[...Array(5)].map((_, index) => (
            <div key={index} className="shimmer h-8 w-8 rounded"></div>
          ))}
        </div>
      </div>
      <div className="paper-texture rounded-xl p-6">
        <div className="space-y-4">
          <div className="shimmer h-6 w-48 rounded"></div>
          <div className="space-y-3">
            {[...Array(8)].map((_, index) => (
              <div key={index} className="shimmer h-4 w-full rounded"></div>
            ))}
          </div>
          <div className="shimmer h-4 w-2/3 rounded"></div>
        </div>
      </div>
    </div>
  );

  const renderSearchLoading = () => (
    <div className="space-y-4">
      <div className="shimmer h-12 w-full rounded-lg"></div>
      <div className="space-y-3">
        {[...Array(5)].map((_, index) => (
          <div key={index} className="flex items-center space-x-3 p-3 rounded-lg">
            <div className="shimmer h-6 w-6 rounded-full"></div>
            <div className="flex-1 space-y-2">
              <div className="shimmer h-4 w-32 rounded"></div>
              <div className="shimmer h-3 w-48 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const loadingTypes = {
    entries: renderEntriesLoading,
    calendar: renderCalendarLoading,
    editor: renderEditorLoading,
    search: renderSearchLoading
  };

  return (
    <div className="animate-pulse">
      {loadingTypes[type] ? loadingTypes[type]() : renderEntriesLoading()}
    </div>
  );
};

export default Loading;