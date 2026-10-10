import { statusOptions } from '@pm/constants';
import { Project } from '@pm/types';

type SidebarItemAvatarProps = {
  title: string;
  status: Project['status'];
};

const getAvatar = (title: string): string => {
  const parts = title.trim().split(' ');
  const firstLetter = parts[0]?.[0] || '';
  const secondLetter = parts[1]?.[0] || '';

  return `${firstLetter}${secondLetter}`.toUpperCase();
};

const SidebarItemAvatar = ({ title, status }: SidebarItemAvatarProps) => {
  const statusConfig = statusOptions.find(opt => opt.value === status);
  const colorClasses = statusConfig ? statusConfig.className : 'bg-accent/10 text-accent-soft';

  return (
    title && (
      <span
        className={`grid h-9 w-9 shrink-0 place-items-center rounded-lg text-xs font-semibold ${colorClasses}`}
      >
        {getAvatar(title)}
      </span>
    )
  );
};

export default SidebarItemAvatar;
