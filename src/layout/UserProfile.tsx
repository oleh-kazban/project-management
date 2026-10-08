type UserProfileProps = {
  className?: string;
};

const UserProfile = ({
  className = 'border border-accent/20 bg-accent/10 text-accent-soft',
}: UserProfileProps) => {
  return (
    <span
      className={`grid h-9 w-9 place-items-center rounded-full text-xs font-semibold ${className}`}
    >
      JD
    </span>
  );
};

export default UserProfile;
