import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Property } from "@/types";
import { Building2, MapPin, AlertTriangle, CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface PropertiesStatsProps {
  data: Property[];
}

export const PropertiesStats = ({ data }: PropertiesStatsProps) => {
  const navigate = useNavigate();

  const stats = [
    {
      title: "Total des biens",
      value: data.length,
      icon: Building2,
      onClick: () => navigate('/properties'),
    },
    {
      title: "Biens localisés",
      value: data.filter(p => p.location).length,
      icon: MapPin,
      onClick: () => navigate('/map'),
    },
    {
      title: "Non conformes",
      value: data.filter(p => p.fiscal_status === "UNPAID").length,
      icon: AlertTriangle,
      onClick: () => navigate('/properties?status=non_compliant'),
    },
    {
      title: "Conformes",
      value: data.filter(p => p.fiscal_status === "PAID").length,
      icon: CheckCircle2,
      onClick: () => navigate('/properties?status=compliant'),
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <Card 
            key={index}
            className="cursor-pointer transition-all hover:shadow-md"
            onClick={stat.onClick}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};