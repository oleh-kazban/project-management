import { DayPart, getPartOfDay } from './date-utils';

const greetings: Record<DayPart, string> = {
  morning: 'Good morning',
  afternoon: 'Good afternoon',
  evening: 'Good evening',
  night: 'Good evening',
};

export const getGreeting = (userName: string, date: Date) =>
  `${greetings[getPartOfDay(date)]}, ${userName}`;
