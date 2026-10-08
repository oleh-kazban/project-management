import { ReactNode } from 'react';

type PageContainerProps = {
  children: ReactNode;
};

const PageContainer = ({ children }: PageContainerProps) => {
  return (
    <div className="w-full px-4 py-7 sm:px-6 sm:py-9 lg:px-8 lg:py-11 xl:px-12">{children}</div>
  );
};

export default PageContainer;
