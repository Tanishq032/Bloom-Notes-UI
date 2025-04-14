
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { FolderOpen } from "lucide-react";

const data = [
  { name: "Personal", value: 8, color: "#FCE4EC" },
  { name: "Work", value: 15, color: "#F3E5F5" },
  { name: "Projects", value: 6, color: "#E8F5E9" },
  { name: "Archive", value: 3, color: "#FFF3E0" },
];

export function FolderDistribution() {
  return (
    <Card className="animate-fade-in">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">Folder Distribution</CardTitle>
        <FolderOpen className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent className="p-0">
        <div className="h-[200px] w-full p-4">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={30}
                outerRadius={60}
                paddingAngle={5}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Legend 
                verticalAlign="bottom" 
                align="center" 
                layout="horizontal"
                iconSize={8}
                iconType="circle"
                formatter={(value) => <span style={{ fontSize: 12 }}>{value}</span>}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: "var(--background)",
                  borderColor: "var(--border)",
                  borderRadius: "var(--radius)",
                  fontSize: "12px",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
