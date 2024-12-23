import { Card } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

export function HistoryCharts() {
  const data = [
    { name: "Paiements", value: 35 },
    { name: "Messages", value: 15 },
    { name: "Modifications", value: 7 },
  ];

  const COLORS = ["#C1272D", "#006233", "#D4AF37"];

  return (
    <Card className="p-6">
      <h3 className="font-semibold mb-4">📈 Répartition des Activités</h3>
      <div className="h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              fill="#8884d8"
              paddingAngle={5}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 space-y-2">
        {data.map((entry, index) => (
          <div key={entry.name} className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: COLORS[index] }}
            />
            <span className="text-sm">
              {entry.name} ({entry.value})
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
}