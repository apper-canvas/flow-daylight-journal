import { format, isToday, isThisWeek, isThisMonth, startOfMonth, endOfMonth, eachDayOfInterval, getDay } from 'date-fns';

export const formatDate = (date, formatStr = 'MMMM d, yyyy') => {
  return format(new Date(date), formatStr);
};

export const formatDateShort = (date) => {
  return format(new Date(date), 'MMM d');
};

export const formatDateISO = (date) => {
  return format(new Date(date), 'yyyy-MM-dd');
};

export const isDateToday = (date) => {
  return isToday(new Date(date));
};

export const isDateThisWeek = (date) => {
  return isThisWeek(new Date(date));
};

export const isDateThisMonth = (date) => {
  return isThisMonth(new Date(date));
};

export const getCalendarDays = (date) => {
  const start = startOfMonth(new Date(date));
  const end = endOfMonth(new Date(date));
  const days = eachDayOfInterval({ start, end });
  
  // Add empty days at the beginning for proper calendar layout
  const startDay = getDay(start);
  const emptyDays = Array(startDay).fill(null);
  
  return [...emptyDays, ...days];
};

export const getTodayISO = () => {
  return formatDateISO(new Date());
};

export const getRelativeTime = (date) => {
  const now = new Date();
  const entryDate = new Date(date);
  const diffInDays = Math.floor((now - entryDate) / (1000 * 60 * 60 * 24));
  
  if (diffInDays === 0) return 'Today';
  if (diffInDays === 1) return 'Yesterday';
  if (diffInDays < 7) return `${diffInDays} days ago`;
  if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`;
  return formatDate(date, 'MMM d, yyyy');
};