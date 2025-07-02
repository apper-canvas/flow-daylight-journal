import { useState, useEffect } from 'react';
import { entryService } from '@/services/api/entryService';
import { toast } from 'react-toastify';

export const useEntries = () => {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const loadEntries = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await entryService.getAll();
      setEntries(data);
    } catch (err) {
      setError('Failed to load entries. Please try again.');
      toast.error('Failed to load entries');
    } finally {
      setLoading(false);
    }
  };

  const createEntry = async (entryData) => {
    try {
      const newEntry = await entryService.create(entryData);
      setEntries(prev => [newEntry, ...prev]);
      toast.success('Entry saved successfully!');
      return newEntry;
    } catch (err) {
      toast.error('Failed to save entry');
      throw err;
    }
  };

  const updateEntry = async (id, entryData) => {
    try {
      const updatedEntry = await entryService.update(id, entryData);
      if (updatedEntry) {
        setEntries(prev => prev.map(entry => 
          entry.Id === id ? updatedEntry : entry
        ));
        toast.success('Entry updated successfully!');
        return updatedEntry;
      }
    } catch (err) {
      toast.error('Failed to update entry');
      throw err;
    }
  };

  const updateEntryByDate = async (date, entryData) => {
    try {
      const updatedEntry = await entryService.updateByDate(date, entryData);
      if (updatedEntry) {
        setEntries(prev => {
          const existingIndex = prev.findIndex(entry => entry.date === date);
          if (existingIndex >= 0) {
            return prev.map(entry => 
              entry.date === date ? updatedEntry : entry
            );
          } else {
            return [updatedEntry, ...prev];
          }
        });
        return updatedEntry;
      }
    } catch (err) {
      toast.error('Failed to save entry');
      throw err;
    }
  };

  const deleteEntry = async (id) => {
    try {
      const success = await entryService.delete(id);
      if (success) {
        setEntries(prev => prev.filter(entry => entry.Id !== id));
        toast.success('Entry deleted successfully');
        return true;
      }
    } catch (err) {
      toast.error('Failed to delete entry');
      throw err;
    }
  };

  const searchEntries = async (query, startDate, endDate) => {
    setLoading(true);
    setError('');
    try {
      const results = await entryService.search(query, startDate, endDate);
      setEntries(results);
      return results;
    } catch (err) {
      setError('Failed to search entries. Please try again.');
      toast.error('Search failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEntries();
  }, []);

  return {
    entries,
    loading,
    error,
    loadEntries,
    createEntry,
    updateEntry,
    updateEntryByDate,
    deleteEntry,
    searchEntries
  };
};