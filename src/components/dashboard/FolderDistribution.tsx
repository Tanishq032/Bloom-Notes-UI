
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip, Sector } from "recharts";
import { FolderOpen, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { useTheme } from "@/components/layout/ThemeProvider";

// Theme-aware color schemes
const colorSchemes = {
  light: [
    "#8B5CF6", // Vibrant purple
    "#F59E0B", // Amber
    "#10B981", // Emerald
    "#EC4899", // Pink
    "#3B82F6", // Blue
    "#F43F5E", // Rose
    "#14B8A6", // Teal
  ],
  dark: [
    "#A78BFA", // Brighter purple
    "#FBBF24", // Brighter amber
    "#34D399", // Brighter emerald
    "#F472B6", // Brighter pink
    "#60A5FA", // Brighter blue
    "#FB7185", // Brighter rose
    "#2DD4BF", // Brighter teal
  ]
};

const data = [
  { name: "Personal", value: 8, color: "#FCE4EC" },
  { name: "Work", value: 15, color: "#F3E5F5" },
  { name: "Projects", value: 6, color: "#E8F5E9" },
  { name: "Archive", value: 3, color: "#FFF3E0" },
];

// Calculate the total value for percentage calculations
const totalValue = data.reduce((sum, item) => sum + item.value, 0);

const renderActiveShape = (props: any) => {
  const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent } = props;

  return (
    <g>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius + 6}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
        className="drop-shadow-md"
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={innerRadius - 6}
        outerRadius={innerRadius - 2}
        fill={fill}
      />
      <text x={cx} y={cy} dy={-15} textAnchor="middle" fill="currentColor" className="text-[10px]">
        {payload.name}
      </text>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill="currentColor" className="text-[14px] font-medium">
        {payload.value}
      </text>
      <text x={cx} y={cy} dy={25} textAnchor="middle" fill="currentColor" className="text-[10px]">
        {`${(percent * 100).toFixed(1)}%`}
      </text>
    </g>
  );
};

export function FolderDistribution() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const { theme } = useTheme();
  
  const colors = theme === 'dark' ? colorSchemes.dark : colorSchemes.light;
  
  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index);
  };
  
  const onPieLeave = () => {
    setActiveIndex(null);
  };
  
  return (
    <Card className="overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="flex flex-col gap-1">
          <CardTitle className="text-sm font-medium">Folder Distribution</CardTitle>
          <p className="text-xs text-muted-foreground">Notes by folder</p>
        </div>
        <FolderOpen className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent className="p-0">
        <div className="h-[240px] w-full p-4">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={activeIndex !== null ? 40 : 35}
                outerRadius={activeIndex !== null ? 70 : 60}
                paddingAngle={5}
                dataKey="value"
                activeIndex={activeIndex !== null ? activeIndex : undefined}
                activeShape={renderActiveShape}
                onMouseEnter={onPieEnter}
                onMouseLeave={onPieLeave}
                className="transition-all duration-300"
              >
                {data.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={colors[index % colors.length]} 
                    className="transition-all duration-300 hover:opacity-80"
                    style={{
                      filter: activeIndex === index ? 'drop-shadow(0px 0px 4px rgba(0,0,0,0.3))' : 'none',
                    }}
                  />
                ))}
              </Pie>
              <Tooltip 
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-background border border-border rounded-lg p-2 shadow-lg">
                        <p className="font-medium">{payload[0].name}</p>
                        <p className="text-sm">
                          {`${payload[0].value} notes (${((Number(payload[0].value) / totalValue) * 100).toFixed(1)}%)`}
                        </p>
                      </div>
                    );
                  }
                  return null;
                }}
                wrapperStyle={{ outline: "none" }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        
        <div className="p-4 border-t border-border/50 flex items-center justify-between">
          <div className="flex flex-wrap gap-3">
            {data.map((item, index) => (
              <div key={index} className="flex items-center gap-1.5">
                <div 
                  className="h-3 w-3 rounded-full" 
                  style={{ backgroundColor: colors[index % colors.length] }}
                ></div>
                <span className="text-xs text-muted-foreground">
                  {item.name}
                </span>
              </div>
            ))}
          </div>
          <button className="text-xs text-accent flex items-center gap-1 hover:underline">
            View all <ArrowUpRight className="h-3 w-3" />
          </button>
        </div>
      </CardContent>
    </Card>
  );
}
