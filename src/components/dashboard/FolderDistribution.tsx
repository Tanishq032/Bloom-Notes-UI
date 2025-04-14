
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip, Sector } from "recharts";
import { FolderOpen, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { useTheme } from "@/components/layout/ThemeProvider";

const colorSchemes = {
  light: [
    "#8B5CF6",
    "#F59E0B",
    "#10B981",
    "#EC4899",
    "#3B82F6",
    "#F43F5E",
    "#14B8A6",
  ],
  dark: [
    "#A78BFA",
    "#FBBF24",
    "#34D399",
    "#F472B6",
    "#60A5FA",
    "#FB7185",
    "#2DD4BF",
  ]
};

const data = [
  { name: "Personal", value: 8, color: "#FCE4EC" },
  { name: "Work", value: 15, color: "#F3E5F5" },
  { name: "Projects", value: 6, color: "#E8F5E9" },
  { name: "Archive", value: 3, color: "#FFF3E0" },
];

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
        className="drop-shadow-md transition-all duration-300"
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={innerRadius - 6}
        outerRadius={innerRadius - 2}
        fill={fill}
        className="transition-all duration-300"
      />
      <text x={cx} y={cy} dy={-15} textAnchor="middle" fill="currentColor" className="text-[10px] animate-fade-in">
        {payload.name}
      </text>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill="currentColor" className="text-[14px] font-medium animate-fade-in">
        {payload.value}
      </text>
      <text x={cx} y={cy} dy={25} textAnchor="middle" fill="currentColor" className="text-[10px] animate-fade-in">
        {`${(percent * 100).toFixed(1)}%`}
      </text>
    </g>
  );
};

export function FolderDistribution() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [animationKey, setAnimationKey] = useState(0);
  const [chartReady, setChartReady] = useState(false);
  const { theme } = useTheme();
  
  const colors = theme === 'dark' ? colorSchemes.dark : colorSchemes.light;
  
  useEffect(() => {
    setChartReady(true);
  }, []);
  
  useEffect(() => {
    setAnimationKey(prev => prev + 1);
  }, [theme]);
  
  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index);
  };
  
  const onPieLeave = () => {
    setActiveIndex(null);
  };

  const handleMouseEnter = (data: any, index: number) => {
    setActiveIndex(index);
  };

  const handleMouseLeave = () => {
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
        <motion.div 
          className="h-[240px] w-full p-4"
          key={animationKey}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ 
            duration: 0.5,
            ease: "easeOut"
          }}
        >
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
                className="transition-all duration-300 hover:cursor-pointer"
                isAnimationActive={chartReady}
                animationDuration={1000}
                animationBegin={0}
                animationEasing="ease"
              >
                {data.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={colors[index % colors.length]} 
                    className="transition-all duration-300 hover:opacity-80"
                    style={{
                      filter: activeIndex === index ? 'drop-shadow(0px 0px 4px rgba(0,0,0,0.3))' : 'none',
                      transform: activeIndex === index ? 'scale(1.05)' : 'scale(1)',
                      transformOrigin: 'center',
                      transformBox: 'fill-box',
                      transition: 'transform 0.3s ease, filter 0.3s ease',
                    }}
                    onMouseEnter={() => handleMouseEnter(entry, index)}
                    onMouseLeave={handleMouseLeave}
                  />
                ))}
              </Pie>
              <Tooltip 
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <motion.div 
                        className="bg-background border border-border rounded-lg p-2 shadow-lg"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <p className="font-medium">{payload[0].name}</p>
                        <p className="text-sm">
                          {`${payload[0].value} notes (${((Number(payload[0].value) / totalValue) * 100).toFixed(1)}%)`}
                        </p>
                      </motion.div>
                    );
                  }
                  return null;
                }}
                wrapperStyle={{ outline: "none" }}
              />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>
        
        <div className="p-4 border-t border-border/50 flex items-center justify-between">
          <div className="flex flex-wrap gap-3">
            {data.map((item, index) => (
              <motion.div 
                key={index} 
                className="flex items-center gap-1.5"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.3,
                  delay: index * 0.1 + 0.3
                }}
                onMouseEnter={() => setActiveIndex(index)}
                onMouseLeave={() => setActiveIndex(null)}
              >
                <div 
                  className="h-3 w-3 rounded-full transition-transform duration-200 hover:scale-125" 
                  style={{ 
                    backgroundColor: colors[index % colors.length],
                    transform: activeIndex === index ? 'scale(1.25)' : 'scale(1)',
                  }}
                ></div>
                <span className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                  {item.name}
                </span>
              </motion.div>
            ))}
          </div>
          <motion.button 
            className="text-xs text-accent flex items-center gap-1 hover:underline"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            whileHover={{ scale: 1.05 }}
          >
            View all <ArrowUpRight className="h-3 w-3" />
          </motion.button>
        </div>
      </CardContent>
    </Card>
  );
}
