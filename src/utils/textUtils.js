export const truncateText = (text, maxLength = 150) => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + '...';
};

export const highlightText = (text, searchTerm) => {
  if (!searchTerm) return text;
  
  const regex = new RegExp(`(${searchTerm})`, 'gi');
  return text.replace(regex, '<span class="search-highlight">$1</span>');
};

export const stripHtml = (html) => {
  const div = document.createElement('div');
  div.innerHTML = html;
  return div.textContent || div.innerText || '';
};

export const getWordCount = (text) => {
  return text.trim().split(/\s+/).filter(word => word.length > 0).length;
};

export const getReadingTime = (text) => {
  const wordsPerMinute = 200;
  const wordCount = getWordCount(text);
  const minutes = Math.ceil(wordCount / wordsPerMinute);
  return minutes === 1 ? '1 minute' : `${minutes} minutes`;
};