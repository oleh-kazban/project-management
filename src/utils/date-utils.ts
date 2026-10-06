import { formatDateOnly } from './date-formatter';

const hourInMilliseconds = 60 * 60 * 1000;

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
  const hoursSinceUpdate = (now.getTime() - updatedDate.getTime()) / hourInMilliseconds;

  if (isToday && hoursSinceUpdate >= 0 && hoursSinceUpdate < 8) {
    const hours = Math.max(1, Math.floor(hoursSinceUpdate));
    return `${hours} hour${hours === 1 ? '' : 's'} ago`;
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
