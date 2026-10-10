import { formatDateOnly } from './date-formatter';

export type DayPart = 'morning' | 'afternoon' | 'evening' | 'night';

const minuteInMilliseconds = 60 * 1000;

export const getDaysRemaining = (dueDate: string) => {
  const today = new Date();
  const todayAtUtcMidnight = Date.UTC(today.getFullYear(), today.getMonth(), today.getDate());
  const [year, month, day] = dueDate.split('-').map(Number);
  const dueDateAtUtcMidnight = Date.UTC(year, month - 1, day);

  return Math.round((dueDateAtUtcMidnight - todayAtUtcMidnight) / (1000 * 60 * 60 * 24));
};

export const getUpdateDateLabel = (updatedAt: string) => {
  const updatedDate = new Date(updatedAt);

  if (Number.isNaN(updatedDate.getTime())) {
    throw new RangeError(`Invalid update date: ${updatedAt}`);
  }

  const now = new Date();
  const isToday =
    updatedDate.getFullYear() === now.getFullYear() &&
    updatedDate.getMonth() === now.getMonth() &&
    updatedDate.getDate() === now.getDate();
  const minutesSinceUpdate = Math.floor((now.getTime() - updatedDate.getTime()) / minuteInMilliseconds);

  if (isToday && minutesSinceUpdate < 60) {
    if (minutesSinceUpdate < 1) return 'just now';
    return `${minutesSinceUpdate} minute${minutesSinceUpdate === 1 ? '' : 's'} ago`;
  }

  const hoursSinceUpdate = Math.floor(minutesSinceUpdate / 60);

  if (isToday && hoursSinceUpdate < 8) {
    return `${hoursSinceUpdate} hour${hoursSinceUpdate === 1 ? '' : 's'} ago`;
  }

  if (isToday) {
    return 'today';
  }

  const localDate = [
    updatedDate.getFullYear(),
    String(updatedDate.getMonth() + 1).padStart(2, '0'),
    String(updatedDate.getDate()).padStart(2, '0'),
  ].join('-');

  return formatDateOnly(localDate);
};

export const getPartOfDay = (date: Date): DayPart => {
  const hour = date.getHours();

  if (hour < 5) return 'night';
  if (hour < 12) return 'morning';
  if (hour < 18) return 'afternoon';
  if (hour < 22) return 'evening';

  return 'night';
};
