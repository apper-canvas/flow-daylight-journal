import moodsData from '@/services/mockData/moods.json';

const moods = [...moodsData];

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const moodService = {
  async getAll() {
    await delay(100);
    return [...moods];
  },

  async getByValue(value) {
    await delay(100);
    const mood = moods.find(mood => mood.value === value);
    return mood ? { ...mood } : null;
  }
};