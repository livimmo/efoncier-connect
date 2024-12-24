import { PropertyType, ZoneType } from "@/utils/mockData/types";

export interface FilterValue {
  value: string;
  label: string;
}

export interface FilterSectionProps {
  title: string;
  children: React.ReactNode;
}

export interface DateFilterProps {
  value: string | null;
  onChange: (value: string | null) => void;
}

export interface SelectFilterProps {
  value: string;
  onChange: (value: string) => void;
  options: FilterValue[];
  placeholder: string;
}

export interface RangeFilterProps {
  value: [number, number];
  onChange: (value: [number, number]) => void;
  min: number;
  max: number;
  step: number;
  unit: string;
}

export interface SearchFilterProps {
  value: string;
  onChange: (value: string) => void;
  type: "owner" | "title";
  placeholder: string;
}