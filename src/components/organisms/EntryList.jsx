import React from 'react';
import { motion } from 'framer-motion';
import { useEntries } from '@/hooks/useEntries';
import EntryCard from '@/components/molecules/EntryCard';
import Loading from '@/components/ui/Loading';
import Error from '@/components/ui/Error';
import Empty from '@/components/ui/Empty';

const EntryList = ({ searchTerm = '', entries: externalEntries, className = "" }) => {
  const { entries: internalEntries, loading, error, loadEntries, deleteEntry } = useEntries();
  
  const entries = externalEntries || internalEntries;

  const handleDelete = async (entryId) => {
    await deleteEntry(entryId);
  };

  if (loading) {
    return <Loading type="entries" />;
  }

  if (error) {
    return <Error message={error} onRetry={loadEntries} />;
  }

  if (!entries || entries.length === 0) {
    return (
      <Empty
        type={searchTerm ? "search" : "entries"}
        onAction={searchTerm ? () => window.location.reload() : undefined}
        actionText={searchTerm ? "Clear Search" : "Write Your First Entry"}
      />
    );
  }

  return (
    <motion.div
      className={`space-y-6 ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-800">
          {searchTerm ? `Search Results (${entries.length})` : `Your Entries (${entries.length})`}
        </h3>
      </div>
      
      <div className="space-y-4">
        {entries.map((entry, index) => (
          <motion.div
            key={entry.Id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <EntryCard
              entry={entry}
              searchTerm={searchTerm}
              onDelete={handleDelete}
            />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default EntryList;