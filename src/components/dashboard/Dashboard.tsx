
import { StatCard } from "./StatCard";
import { NotesChart } from "./NotesChart";
import { FolderDistribution } from "./FolderDistribution";
import { FileText, FolderOpen, Star, Clock } from "lucide-react";

export function Dashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          title="Total Notes" 
          value={42} 
          icon={<FileText className="h-4 w-4 text-muted-foreground" />}
          description="+8 from last week"
        />
        
        <StatCard 
          title="Folders" 
          value={7} 
          icon={<FolderOpen className="h-4 w-4 text-muted-foreground" />}
        />
        
        <StatCard 
          title="Starred Notes" 
          value={5} 
          icon={<Star className="h-4 w-4 text-muted-foreground" />}
        />
        
        <StatCard 
          title="Writing Streak" 
          value="6 days" 
          icon={<Clock className="h-4 w-4 text-muted-foreground" />}
          description="Keep going! Your best is 14 days."
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <NotesChart />
        <FolderDistribution />
      </div>
    </div>
  );
}
