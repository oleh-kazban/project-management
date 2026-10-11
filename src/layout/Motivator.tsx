import { useLocation } from 'react-router';

import { useMutationState } from '@tanstack/react-query';

const motivationalQuotes = [
  'A little progress every day adds up.',
  'Done is better than perfect.',
  'The secret of getting ahead is getting started.',
  'Every great project is built one task at a time.',
  'Focus on being productive, not just busy.',
  'Small steps lead to massive achievements.',
  'Make it work, make it right, make it fast.',
  'Success is the sum of small efforts repeated daily.',
  "Don't stop when you're tired. Stop when you're done.",
];

const getSeed = (str: string) => [...str].reduce((acc, char) => acc + char.charCodeAt(0), 0);

const Motivator = () => {
  const location = useLocation();
  const mutationCount = useMutationState({
    filters: { status: 'success' },
    select: mutation => mutation.state.submittedAt,
  }).length;

  const quoteIndex = (getSeed(location.key) + mutationCount) % motivationalQuotes.length;
  const phrase = motivationalQuotes[quoteIndex];

  return <p className="mt-5 text-center text-xs text-foreground-faint">{phrase}</p>;
};

export default Motivator;
