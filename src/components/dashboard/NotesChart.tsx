
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { Calendar, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

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
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [chartMode, setChartMode] = useState<"week" | "month">("week");
  
  const handleBarMouseEnter = (data: any, index: number) => {
    setActiveIndex(index);
  };
  
  const handleBarMouseLeave = () => {
    setActiveIndex(null);
  };
  
  return (
    <Card className="overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="flex flex-col gap-1">
          <CardTitle className="text-sm font-medium">Notes Created</CardTitle>
          <p className="text-xs text-muted-foreground">This {chartMode}</p>
        </div>
        <div className="flex items-center gap-2">
          <motion.div 
            className="relative"
            whileHover={{ scale: 1.05 }}
          >
            <button 
              className={`
                px-2 py-1 text-xs rounded-md transition-colors
                ${chartMode === "week" ? 'bg-accent text-white' : 'bg-muted text-muted-foreground'}
              `}
              onClick={() => setChartMode("week")}
            >
              Week
            </button>
          </motion.div>
          <motion.div 
            className="relative"
            whileHover={{ scale: 1.05 }}
          >
            <button 
              className={`
                px-2 py-1 text-xs rounded-md transition-colors
                ${chartMode === "month" ? 'bg-accent text-white' : 'bg-muted text-muted-foreground'}
              `}
              onClick={() => setChartMode("month")}
            >
              Month
            </button>
          </motion.div>
          <Calendar className="h-4 w-4 text-muted-foreground" />
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="h-[240px] w-full p-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart 
              data={data}
              margin={{ top: 10, right: 10, bottom: 10, left: -20 }}
              onMouseLeave={handleBarMouseLeave}
            >
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
                cursor={{ fill: 'rgba(0, 0, 0, 0.05)' }}
                contentStyle={{
                  backgroundColor: "var(--background)",
                  borderColor: "var(--border)",
                  borderRadius: "var(--radius)",
                  fontSize: "12px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                }}
                wrapperStyle={{ outline: "none" }}
              />
              <Bar 
                dataKey="count" 
                radius={4} 
                barSize={chartMode === "week" ? 30 : 12}
                className="fill-accent"
                onMouseEnter={handleBarMouseEnter}
              >
                {data.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={activeIndex === index ? "hsl(var(--accent))" : "hsl(var(--accent)/70)"} 
                    className={`transition-all duration-300 ${activeIndex === index ? 'fill-accent' : 'fill-accent/60'}`}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        <div className="p-4 border-t border-border/50 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-accent"></div>
            <span className="text-xs text-muted-foreground">Total: 37 notes</span>
          </div>
          <button className="text-xs text-accent flex items-center gap-1 hover:underline">
            View details <ArrowUpRight className="h-3 w-3" />
          </button>
        </div>
      </CardContent>
    </Card>
  );
}
