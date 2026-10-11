import { useMutationState } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";

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

const getRandomQuote = (current?: string) => {
  const available = motivationalQuotes.filter(q => q !== current);

  return available[Math.floor(Math.random() * available.length)];
}

const Motivator = () => {
  const location = useLocation();
  const mutationCount = useMutationState({
    filters: { status: 'success' },
    select: (mutation) => mutation.state.submittedAt,
  }).length;
  const [phrase, setPhrase] = useState(() => getRandomQuote());

  useEffect(() => {
    setPhrase(prev => getRandomQuote(prev));
  }, [location.key, mutationCount])

  return (<p className="mt-5 text-center text-xs text-foreground-faint">{phrase}</p>)
};

export default Motivator;
