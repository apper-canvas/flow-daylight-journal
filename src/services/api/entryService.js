import entriesData from '@/services/mockData/entries.json';

let entries = [...entriesData];

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const entryService = {
  async getAll() {
    await delay(300);
    return [...entries].sort((a, b) => new Date(b.date) - new Date(a.date));
  },

  async getById(id) {
    await delay(200);
    const entry = entries.find(entry => entry.Id === parseInt(id));
    return entry ? { ...entry } : null;
  },

  async getByDate(date) {
    await delay(200);
    const entry = entries.find(entry => entry.date === date);
    return entry ? { ...entry } : null;
  },

  async create(entryData) {
    await delay(400);
    const newEntry = {
      ...entryData,
      Id: Math.max(...entries.map(e => e.Id), 0) + 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    entries.push(newEntry);
    return { ...newEntry };
  },

  async update(id, entryData) {
    await delay(300);
    const index = entries.findIndex(entry => entry.Id === parseInt(id));
    if (index === -1) return null;
    
    entries[index] = {
      ...entries[index],
      ...entryData,
      updatedAt: new Date().toISOString()
    };
    return { ...entries[index] };
  },

  async updateByDate(date, entryData) {
    await delay(300);
    const index = entries.findIndex(entry => entry.date === date);
    if (index === -1) {
      // Create new entry if doesn't exist
      return this.create({ ...entryData, date });
    }
    
    entries[index] = {
      ...entries[index],
      ...entryData,
      updatedAt: new Date().toISOString()
    };
    return { ...entries[index] };
  },

  async delete(id) {
    await delay(200);
    const index = entries.findIndex(entry => entry.Id === parseInt(id));
    if (index === -1) return false;
    
    entries.splice(index, 1);
    return true;
  },

  async search(query, startDate = null, endDate = null) {
    await delay(300);
    let filteredEntries = [...entries];

    if (startDate && endDate) {
      filteredEntries = filteredEntries.filter(entry => {
        const entryDate = new Date(entry.date);
        return entryDate >= new Date(startDate) && entryDate <= new Date(endDate);
      });
    }

    if (query && query.trim()) {
      const searchTerm = query.toLowerCase();
      filteredEntries = filteredEntries.filter(entry =>
        entry.content.toLowerCase().includes(searchTerm) ||
        entry.mood.toLowerCase().includes(searchTerm)
      );
    }

    return filteredEntries.sort((a, b) => new Date(b.date) - new Date(a.date));
  }
};