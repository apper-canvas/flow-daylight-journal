import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';
import { useEntries } from '@/hooks/useEntries';
import Header from '@/components/organisms/Header';
import EntryEditor from '@/components/organisms/EntryEditor';
import EntryList from '@/components/organisms/EntryList';
import Calendar from '@/components/organisms/Calendar';

const JournalPage = () => {
  const { date } = useParams();
  const [activeTab, setActiveTab] = useState(date ? 'editor' : 'entries');
  const [searchResults, setSearchResults] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const { searchEntries, loadEntries } = useEntries();

  const handleSearch = async (query) => {
    setSearchTerm(query);
    if (query.trim()) {
      try {
        const results = await searchEntries(query);
        setSearchResults(results);
        setActiveTab('entries');
      } catch (error) {
        console.error('Search failed:', error);
      }
    } else {
      setSearchResults(null);
      await loadEntries();
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (tab !== 'entries') {
      setSearchResults(null);
      setSearchTerm('');
    }
  };

  const tabs = [
    { id: 'editor', label: 'Write', icon: 'PenTool' },
    { id: 'entries', label: 'Entries', icon: 'BookOpen' },
    { id: 'calendar', label: 'Calendar', icon: 'Calendar' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header onSearch={handleSearch} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          {/* Main Content */}
          <div className="lg:col-span-8">
            {/* Mobile Tab Navigation */}
            <div className="lg:hidden mb-6">
              <div className="flex space-x-1 bg-white rounded-lg p-1 shadow-sm">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => handleTabChange(tab.id)}
                    className={`flex-1 flex items-center justify-center space-x-2 py-2 px-3 rounded-md text-sm font-medium transition-all duration-200 ${
                      activeTab === tab.id
                        ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-sm'
                        : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                    }`}
                  >
                    <span>{tab.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Desktop Content */}
            <div className="space-y-8">
              {activeTab === 'editor' && (
                <motion.div
                  key="editor"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <EntryEditor onSave={loadEntries} />
                </motion.div>
              )}

              {activeTab === 'entries' && (
                <motion.div
                  key="entries"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <EntryList
                    searchTerm={searchTerm}
                    entries={searchResults}
                  />
                </motion.div>
              )}

              {activeTab === 'calendar' && (
                <motion.div
                  key="calendar"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className="lg:hidden"
                >
                  <Calendar />
                </motion.div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="hidden lg:block lg:col-span-4">
            <div className="sticky top-24 space-y-6">
              {/* Desktop Tab Navigation */}
              <div className="bg-white rounded-xl shadow-sm p-1">
                <div className="space-y-1">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => handleTabChange(tab.id)}
                      className={`w-full flex items-center space-x-3 py-3 px-4 rounded-lg text-sm font-medium transition-all duration-200 ${
                        activeTab === tab.id
                          ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-sm'
                          : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                      }`}
                    >
                      <span>{tab.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Calendar Widget */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <Calendar />
              </div>

              {/* Quick Stats */}
              <div className="bg-gradient-to-br from-surface to-background rounded-xl p-6">
                <h4 className="text-lg font-semibold text-gray-800 mb-4 font-display">
                  Your Journey
                </h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Total Entries</span>
                    <span className="text-2xl font-bold gradient-text">42</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Current Streak</span>
                    <span className="text-2xl font-bold gradient-text">7</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Words Written</span>
                    <span className="text-2xl font-bold gradient-text">12.5K</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JournalPage;