type SidebarItemAvatarProps = {
  title: string;
};

const getAvatar = (title: string): string => {
  const parts = title.trim().split(' ');
  const firstLetter = parts[0]?.[0] || '';
  const secondLetter = parts[1]?.[0] || '';

  return `${firstLetter}${secondLetter}`.toUpperCase();
};
const SidebarItemAvatar = ({ title }: SidebarItemAvatarProps) => {
  return (
    title && (
      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-accent/10 text-xs font-semibold text-accent-soft">
        {getAvatar(title)}
      </span>
    )
  );
};

export default SidebarItemAvatar;
