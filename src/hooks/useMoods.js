import { useState, useEffect } from 'react';
import { moodService } from '@/services/api/moodService';

export const useMoods = () => {
  const [moods, setMoods] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const loadMoods = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await moodService.getAll();
      setMoods(data);
    } catch (err) {
      setError('Failed to load moods. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getMoodByValue = (value) => {
    return moods.find(mood => mood.value === value);
  };

  useEffect(() => {
    loadMoods();
  }, []);

  return {
    moods,
    loading,
    error,
    loadMoods,
    getMoodByValue
  };
};