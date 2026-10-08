type MotivatorProps = {
  phrase: string;
};

const Motivator = ({ phrase }: MotivatorProps) => (
  <p className="mt-5 text-center text-xs text-foreground-faint">{phrase}</p>
);

export default Motivator;
