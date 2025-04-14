
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Calendar } from "lucide-react";

const data = [
  { name: "Mon", count: 4 },
  { name: "Tue", count: 6 },
  { name: "Wed", count: 8 },
  { name: "Thu", count: 5 },
  { name: "Fri", count: 9 },
  { name: "Sat", count: 3 },
  { name: "Sun", count: 2 },
];

export function NotesChart() {
  return (
    <Card className="animate-fade-in">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">Notes Created This Week</CardTitle>
        <Calendar className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent className="p-0">
        <div className="h-[200px] w-full p-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <XAxis 
                dataKey="name" 
                axisLine={false} 
                tickLine={false} 
                fontSize={12}
                dy={10} 
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                fontSize={12}
                dx={-10}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: "var(--background)",
                  borderColor: "var(--border)",
                  borderRadius: "var(--radius)",
                  fontSize: "12px",
                }}
              />
              <Bar 
                dataKey="count" 
                fill="hsl(var(--accent))" 
                radius={4} 
                barSize={20}
                className="fill-accent"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
