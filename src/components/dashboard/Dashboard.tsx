
import { motion } from "framer-motion";
import { StatCard } from "./StatCard";
import { NotesChart } from "./NotesChart";
import { FolderDistribution } from "./FolderDistribution";
import { ActivityCalendar } from "./ActivityCalendar";
import { FileText, FolderOpen, Star, Clock, Users, Tag } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function Dashboard() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };
  
  return (
    <div className="space-y-6">
      <motion.h1 
        className="text-3xl font-bold tracking-tight"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Dashboard
      </motion.h1>
      
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.div variants={item}>
          <StatCard 
            title="Total Notes" 
            value={42} 
            icon={<FileText className="h-4 w-4 text-muted-foreground" />}
            description="+8 from last week"
          />
        </motion.div>
        
        <motion.div variants={item}>
          <StatCard 
            title="Folders" 
            value={7} 
            icon={<FolderOpen className="h-4 w-4 text-muted-foreground" />}
          />
        </motion.div>
        
        <motion.div variants={item}>
          <StatCard 
            title="Starred Notes" 
            value={5} 
            icon={<Star className="h-4 w-4 text-muted-foreground" />}
          />
        </motion.div>
        
        <motion.div variants={item}>
          <StatCard 
            title="Writing Streak" 
            value="6 days" 
            icon={<Clock className="h-4 w-4 text-muted-foreground" />}
            description="Keep going! Your best is 14 days."
          />
        </motion.div>
      </motion.div>
      
      <Tabs defaultValue="charts" className="w-full">
        <TabsList>
          <TabsTrigger value="charts">Charts & Analytics</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
        </TabsList>
        
        <TabsContent value="charts" className="mt-4 space-y-4">
          <motion.div 
            className="grid grid-cols-1 lg:grid-cols-2 gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <NotesChart />
            <FolderDistribution />
            
            <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-4">
              <StatCard 
                title="Tags" 
                value={12} 
                icon={<Tag className="h-4 w-4 text-muted-foreground" />}
                description="Most used: project, meeting, idea"
                className="h-full"
              />
              
              <StatCard 
                title="Shared Notes" 
                value={8} 
                icon={<Users className="h-4 w-4 text-muted-foreground" />}
                description="3 collaborators"
                className="h-full"
              />
              
              <StatCard 
                title="Reminders" 
                value={5} 
                icon={<Clock className="h-4 w-4 text-muted-foreground" />}
                description="Next: Team Meeting (Tomorrow)"
                className="h-full"
              />
            </div>
          </motion.div>
        </TabsContent>
        
        <TabsContent value="activity" className="mt-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <ActivityCalendar />
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
