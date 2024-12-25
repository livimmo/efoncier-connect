import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { useMediaQuery } from "@/hooks/use-media-query";

interface PriceDistributionProps {
  data: {
    range: string;
    percentage: number;
    price: number;
  }[];
}

export const PriceDistributionChart = ({ data }: PriceDistributionProps) => {
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <div className="mt-4">
      <p className="text-xs text-muted-foreground mb-2">Distribution des prix au m²</p>
      <ResponsiveContainer width="100%" height={isMobile ? 100 : 150}>
        <BarChart data={data}>
          <XAxis 
            dataKey="range" 
            fontSize={10}
            tickFormatter={(value) => value.split(' ')[0]}
          />
          <YAxis 
            fontSize={10}
            tickFormatter={(value) => `${value}%`}
          />
          <Tooltip
            formatter={(value: number) => [`${value}%`, 'Proportion']}
            labelFormatter={(label) => `${label} DH/m²`}
          />
          <Bar dataKey="percentage" fill="#2563eb" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};