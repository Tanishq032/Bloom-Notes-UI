
import { useState } from "react";
import { NoteCard } from "./NoteCard";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Filter, List, Grid } from "lucide-react";
import { SearchFilters } from "./SearchFilters";

const dummyNotes = [
  {
    id: "1",
    title: "Project Kickoff Meeting",
    content: "Discuss project timeline, deliverables, and team responsibilities. Set up weekly check-ins.",
    date: "Apr 10, 2025",
    folder: { name: "Work", color: "purple" },
    isPinned: true,
    priority: "high" as const,
    tags: ["meeting", "project"]
  },
  {
    id: "2",
    title: "Grocery List",
    content: "Eggs, milk, bread, cheese, apples, chicken, pasta, tomatoes, olive oil, cereal",
    date: "Apr 12, 2025",
    folder: { name: "Personal", color: "pink" },
    tags: ["shopping", "home"]
  },
  {
    id: "3",
    title: "Book Recommendations",
    content: "1. Atomic Habits by James Clear\n2. Deep Work by Cal Newport\n3. The Psychology of Money by Morgan Housel",
    date: "Apr 8, 2025",
    folder: { name: "Personal", color: "pink" },
    priority: "low" as const,
    tags: ["reading"]
  },
  {
    id: "4",
    title: "Website Redesign Ideas",
    content: "- Simplify navigation\n- Add testimonials section\n- Improve mobile responsiveness\n- Update color scheme to match brand",
    date: "Apr 14, 2025",
    folder: { name: "Projects", color: "green" },
    isPinned: true,
    priority: "medium" as const,
    tags: ["design", "website"]
  },
  {
    id: "5",
    title: "Vacation Planning",
    content: "Research flights to Barcelona, book accommodation, make list of sights to see and restaurants to try.",
    date: "Apr 5, 2025",
    folder: { name: "Personal", color: "pink" },
    tags: ["travel", "planning"]
  },
  {
    id: "6",
    title: "Quarterly Goals",
    content: "1. Complete certification\n2. Launch new product feature\n3. Improve team collaboration\n4. Reduce project turnaround time",
    date: "Apr 1, 2025",
    folder: { name: "Work", color: "purple" },
    priority: "medium" as const,
    tags: ["goals", "quarterly"]
  },
  {
    id: "7",
    title: "Fitness Plan",
    content: "Monday: Upper body\nTuesday: Cardio\nWednesday: Lower body\nThursday: Rest\nFriday: Full body\nWeekend: Active recovery",
    date: "Apr 3, 2025",
    folder: { name: "Personal", color: "pink" },
    tags: ["health", "exercise"]
  },
  {
    id: "8",
    title: "Client Meeting Notes",
    content: "Discussed new requirements for phase 2. Client wants to add user authentication and a dashboard feature.",
    date: "Apr 11, 2025",
    folder: { name: "Work", color: "purple" },
    priority: "high" as const,
    tags: ["client", "meeting"]
  },
];

export function NoteGrid() {
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Button 
          variant="outline" 
          size="sm" 
          className="gap-2 animate-fade-in"
          onClick={() => setShowFilters(!showFilters)}
        >
          <Filter className="h-4 w-4" />
          Filters
        </Button>
        
        <div className="flex items-center gap-2 animate-fade-in">
          <Button 
            variant={viewMode === "list" ? "secondary" : "ghost"} 
            size="icon" 
            className="h-8 w-8"
            onClick={() => setViewMode("list")}
          >
            <List className="h-4 w-4" />
          </Button>
          <Button 
            variant={viewMode === "grid" ? "secondary" : "ghost"} 
            size="icon" 
            className="h-8 w-8"
            onClick={() => setViewMode("grid")}
          >
            <Grid className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <SearchFilters />
          </motion.div>
        )}
      </AnimatePresence>
      
      <div className={cn(
        "transition-all duration-300",
        viewMode === "grid" 
          ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4" 
          : "flex flex-col gap-3"
      )}>
        <AnimatePresence>
          {dummyNotes.map((note, index) => (
            <motion.div
              key={note.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ 
                duration: 0.3,
                delay: index * 0.05,
                ease: "easeOut"
              }}
            >
              <NoteCard
                id={note.id}
                title={note.title}
                content={note.content}
                date={note.date}
                folder={note.folder}
                isPinned={note.isPinned}
                priority={note.priority}
                tags={note.tags}
                className={viewMode === "list" ? "w-full" : ""}
                onClick={() => console.log(`Open note: ${note.id}`)}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(" ");
}
