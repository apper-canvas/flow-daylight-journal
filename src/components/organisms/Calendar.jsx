import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, getDay } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { formatDateISO } from '@/utils/dateUtils';
import { entryService } from '@/services/api/entryService';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';
import CalendarDay from '@/components/molecules/CalendarDay';
import Loading from '@/components/ui/Loading';
import { toast } from 'react-toastify';

const Calendar = ({ className = "" }) => {
  const navigate = useNavigate();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(false);

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd });
  
  // Add empty days at the beginning for proper calendar layout
  const startDay = getDay(monthStart);
  const emptyDays = Array(startDay).fill(null);
  
  const calendarDays = [...emptyDays, ...monthDays];

  // Load entries for the current month
  useEffect(() => {
    const loadMonthEntries = async () => {
      setLoading(true);
      try {
        const startDate = formatDateISO(monthStart);
        const endDate = formatDateISO(monthEnd);
        const monthEntries = await entryService.search('', startDate, endDate);
        setEntries(monthEntries);
      } catch (error) {
        toast.error('Failed to load calendar entries');
      } finally {
        setLoading(false);
      }
    };

    loadMonthEntries();
  }, [monthStart, monthEnd]);

  const handlePrevMonth = () => {
    setCurrentDate(prev => subMonths(prev, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(prev => addMonths(prev, 1));
  };

  const handleToday = () => {
    setCurrentDate(new Date());
  };

  const handleDayClick = (date, entry) => {
    const dateString = formatDateISO(date);
    navigate(`/entry/${dateString}`);
  };

  const getEntryForDate = (date) => {
    const dateString = formatDateISO(date);
    return entries.find(entry => entry.date === dateString);
  };

  if (loading) {
    return <Loading type="calendar" />;
  }

  return (
    <motion.div
      className={`space-y-6 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Calendar Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h3 className="text-xl font-semibold text-gray-800 font-display">
            {format(currentDate, 'MMMM yyyy')}
          </h3>
          <Button
            onClick={handleToday}
            variant="outline"
            size="sm"
          >
            Today
          </Button>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            onClick={handlePrevMonth}
            variant="ghost"
            size="sm"
            className="p-2"
          >
            <ApperIcon name="ChevronLeft" size={20} />
          </Button>
          <Button
            onClick={handleNextMonth}
            variant="ghost"
            size="sm"
            className="p-2"
          >
            <ApperIcon name="ChevronRight" size={20} />
          </Button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        {/* Day Labels */}
        <div className="calendar-grid mb-4">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
              {day}
            </div>
          ))}
        </div>
        
        {/* Calendar Days */}
        <div className="calendar-grid">
          {calendarDays.map((day, index) => (
            <div key={index} className="aspect-square">
              {day ? (
                <CalendarDay
                  date={day}
                  entry={getEntryForDate(day)}
                  isCurrentMonth={true}
                  onClick={handleDayClick}
                />
              ) : (
                <div className="w-full h-full"></div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Calendar Legend */}
      <div className="bg-gradient-to-r from-surface to-background rounded-xl p-4">
        <h4 className="text-sm font-medium text-gray-700 mb-2">Legend</h4>
        <div className="flex items-center space-x-6 text-sm text-gray-600">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 rounded-full bg-gradient-to-br from-primary to-secondary"></div>
            <span>Today</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 rounded-full bg-success"></div>
            <span>Has Entry</span>
          </div>
          <div className="flex items-center space-x-2">
            <ApperIcon name="Smile" size={16} className="text-primary" />
            <span>Mood tracked</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Calendar;