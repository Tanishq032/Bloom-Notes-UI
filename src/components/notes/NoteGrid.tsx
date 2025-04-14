
import { useState, useEffect } from "react";
import { NoteCard } from "./NoteCard";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Filter, List, Grid, Plus } from "lucide-react";
import { SearchFilters } from "./SearchFilters";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

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
  const [notes, setNotes] = useState(dummyNotes);
  const [filteredNotes, setFilteredNotes] = useState(dummyNotes);
  const [sortBy, setSortBy] = useState<"date" | "title">("date");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [activeFilters, setActiveFilters] = useState({
    folders: [] as string[],
    tags: [] as string[],
    priorities: [] as string[],
    isPinned: false,
    isRecent: false,
  });
  
  const navigate = useNavigate();
  const { toast } = useToast();

  // Apply filters when activeFilters change
  useEffect(() => {
    let result = [...notes];
    
    // Filter by folders
    if (activeFilters.folders.length > 0) {
      result = result.filter(note => 
        activeFilters.folders.includes(note.folder.name.toLowerCase())
      );
    }
    
    // Filter by tags
    if (activeFilters.tags.length > 0) {
      result = result.filter(note => 
        note.tags && note.tags.some(tag => activeFilters.tags.includes(tag))
      );
    }
    
    // Filter by priorities
    if (activeFilters.priorities.length > 0) {
      result = result.filter(note => 
        note.priority && activeFilters.priorities.includes(note.priority)
      );
    }
    
    // Filter by pinned status
    if (activeFilters.isPinned) {
      result = result.filter(note => note.isPinned);
    }
    
    // Filter by recent (last 7 days)
    if (activeFilters.isRecent) {
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
      result = result.filter(note => {
        const noteDate = new Date(note.date);
        return noteDate >= sevenDaysAgo;
      });
    }
    
    // Sort the filtered results
    result = sortNotes(result, sortBy, sortDirection);
    
    setFilteredNotes(result);
  }, [activeFilters, notes, sortBy, sortDirection]);
  
  // Sort notes function
  const sortNotes = (notesToSort: typeof dummyNotes, sortByField: "date" | "title", direction: "asc" | "desc") => {
    return [...notesToSort].sort((a, b) => {
      if (sortByField === "date") {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return direction === "asc" ? dateA.getTime() - dateB.getTime() : dateB.getTime() - dateA.getTime();
      } else {
        // Sort by title
        return direction === "asc" 
          ? a.title.localeCompare(b.title) 
          : b.title.localeCompare(a.title);
      }
    });
  };
  
  // Handle toggling pin status
  const handleTogglePin = (id: string) => {
    const updatedNotes = notes.map(note => 
      note.id === id ? { ...note, isPinned: !note.isPinned } : note
    );
    setNotes(updatedNotes);
    
    const pinnedNote = updatedNotes.find(note => note.id === id);
    toast({
      title: pinnedNote?.isPinned ? "Note pinned" : "Note unpinned",
      description: pinnedNote?.isPinned 
        ? "This note will now appear at the top of your list" 
        : "This note has been unpinned",
    });
  };
  
  // Handle deleting a note
  const handleDeleteNote = (id: string) => {
    const updatedNotes = notes.filter(note => note.id !== id);
    setNotes(updatedNotes);
    
    toast({
      title: "Note deleted",
      description: "Your note has been permanently removed",
      variant: "destructive",
    });
  };
  
  // Update filter settings
  const handleFilterUpdate = (newFilters: any) => {
    setActiveFilters({ ...activeFilters, ...newFilters });
  };
  
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="gap-2 animate-fade-in"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="h-4 w-4" />
            Filters {Object.values(activeFilters).some(v => Array.isArray(v) ? v.length > 0 : v) && 
              <span className="bg-accent text-accent-foreground rounded-full px-1.5 py-0.5 text-xs">
                Active
              </span>}
          </Button>
          
          <Button 
            variant="default"
            size="sm"
            className="gap-2 animate-fade-in"
            onClick={() => navigate("/notes")}
          >
            <Plus className="h-4 w-4" />
            New Note
          </Button>
        </div>
        
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
            <SearchFilters 
              onFilterChange={handleFilterUpdate} 
              activeFilters={activeFilters}
              onSortChange={(field, direction) => {
                setSortBy(field as "date" | "title");
                setSortDirection(direction as "asc" | "desc");
              }}
            />
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
          {filteredNotes.map((note, index) => (
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
                onClick={() => navigate(`/notes?id=${note.id}`)}
                onEdit={() => navigate(`/notes?id=${note.id}`)}
                onPin={() => handleTogglePin(note.id)}
                onDelete={() => handleDeleteNote(note.id)}
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
