import { ReactNode } from "react";

interface FilterSectionProps {
  title: string;
  children: ReactNode;
}

export const FilterSection = ({ title, children }: FilterSectionProps) => {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">{title}</label>
      {children}
    </div>
  );
};