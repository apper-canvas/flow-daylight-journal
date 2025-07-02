import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { formatDate, formatDateISO, getTodayISO } from '@/utils/dateUtils';
import { getWordCount, getReadingTime } from '@/utils/textUtils';
import { useDebounce } from '@/hooks/useDebounce';
import { entryService } from '@/services/api/entryService';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';
import MoodSelector from '@/components/molecules/MoodSelector';
import { toast } from 'react-toastify';

const EntryEditor = ({ onSave, className = "" }) => {
  const { date: routeDate } = useParams();
  const navigate = useNavigate();
  const currentDate = routeDate || getTodayISO();
  
  const [content, setContent] = useState('');
  const [mood, setMood] = useState('');
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState(null);
  
  const debouncedContent = useDebounce(content, 1000);
  const debouncedMood = useDebounce(mood, 500);

  // Load existing entry
  useEffect(() => {
    const loadEntry = async () => {
      if (!currentDate) return;
      
      setLoading(true);
      try {
        const entry = await entryService.getByDate(currentDate);
        if (entry) {
          setContent(entry.content);
          setMood(entry.mood);
        }
      } catch (error) {
        toast.error('Failed to load entry');
      } finally {
        setLoading(false);
      }
    };

    loadEntry();
  }, [currentDate]);

  // Auto-save functionality
  const autoSave = useCallback(async () => {
    if (!content.trim() && !mood) return;
    
    setSaving(true);
    try {
      await entryService.updateByDate(currentDate, {
        content: content.trim(),
        mood: mood
      });
      setLastSaved(new Date());
      if (onSave) onSave();
    } catch (error) {
      toast.error('Failed to save entry');
    } finally {
      setSaving(false);
    }
  }, [content, mood, currentDate, onSave]);

  // Trigger auto-save when content or mood changes
  useEffect(() => {
    if (debouncedContent.trim() || debouncedMood) {
      autoSave();
    }
  }, [debouncedContent, debouncedMood, autoSave]);

  const handleDateChange = (newDate) => {
    if (newDate !== currentDate) {
      navigate(`/entry/${newDate}`);
    }
  };

  const handleGoToToday = () => {
    const today = getTodayISO();
    if (today !== currentDate) {
      navigate(`/entry/${today}`);
    }
  };

  const wordCount = getWordCount(content);
  const readingTime = getReadingTime(content);

  if (loading) {
    return (
      <div className={`space-y-6 ${className}`}>
        <div className="flex items-center justify-between">
          <div className="shimmer h-8 w-48 rounded"></div>
          <div className="shimmer h-10 w-32 rounded"></div>
        </div>
        <div className="shimmer h-40 rounded-xl"></div>
        <div className="flex space-x-2">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="shimmer h-8 w-16 rounded-full"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <motion.div
      className={`space-y-6 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h2 className="text-2xl font-bold text-gray-800 font-display">
            {formatDate(currentDate)}
          </h2>
          <input
            type="date"
            value={currentDate}
            onChange={(e) => handleDateChange(e.target.value)}
            className="px-3 py-1 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
          />
        </div>
        
        <div className="flex items-center space-x-3">
          {lastSaved && (
            <motion.div
              className="flex items-center text-sm text-success"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              key={lastSaved.toISOString()}
            >
              <ApperIcon name="Check" size={16} className="mr-1" />
              Saved
            </motion.div>
          )}
          
          {saving && (
            <div className="flex items-center text-sm text-gray-500">
              <ApperIcon name="Loader2" size={16} className="mr-1 animate-spin" />
              Saving...
            </div>
          )}
          
          {currentDate !== getTodayISO() && (
            <Button
              onClick={handleGoToToday}
              variant="outline"
              size="sm"
            >
              <ApperIcon name="Calendar" size={16} className="mr-1" />
              Today
            </Button>
          )}
        </div>
      </div>

      {/* Editor */}
      <div className="paper-texture rounded-xl shadow-sm overflow-hidden">
        <div className="editor-toolbar flex items-center space-x-2">
          <div className="flex items-center space-x-1">
            <button
              type="button"
              className="p-2 rounded hover:bg-gray-100 transition-colors"
              title="Bold"
            >
              <ApperIcon name="Bold" size={16} />
            </button>
            <button
              type="button"
              className="p-2 rounded hover:bg-gray-100 transition-colors"
              title="Italic"
            >
              <ApperIcon name="Italic" size={16} />
            </button>
            <button
              type="button"
              className="p-2 rounded hover:bg-gray-100 transition-colors"
              title="List"
            >
              <ApperIcon name="List" size={16} />
            </button>
          </div>
          
          <div className="flex-1"></div>
          
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <span>{wordCount} words</span>
            <span>{readingTime} read</span>
          </div>
        </div>
        
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="What's on your mind today? Start writing your thoughts, experiences, or reflections..."
          className="editor-content w-full border-none focus:outline-none resize-none min-h-[400px]"
          style={{ fontFamily: 'Inter, sans-serif' }}
        />
      </div>

      {/* Mood Selector */}
      <div className="space-y-3">
        <label className="block text-sm font-medium text-gray-700">
          How are you feeling today?
        </label>
        <MoodSelector
          selectedMood={mood}
          onMoodChange={setMood}
        />
      </div>
    </motion.div>
  );
};

export default EntryEditor;