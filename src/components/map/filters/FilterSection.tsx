import { ReactNode } from 'react';

interface FilterSectionProps {
  title: ReactNode;
  children: ReactNode;
}

export const FilterSection = ({ title, children }: FilterSectionProps) => {
  return (
    <div className="space-y-2">
      <div className="font-medium">{title}</div>
      {children}
    </div>
  );
};