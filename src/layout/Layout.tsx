import { ReactNode } from 'react';

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="w-full px-4 py-7 sm:px-6 sm:py-9 lg:px-8 lg:py-11 xl:px-12">{children}</div>
  );
};

export default Layout;
