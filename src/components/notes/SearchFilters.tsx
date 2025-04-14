
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Tag, Calendar, Star, AlertTriangle, Clock, ArrowUpDown, SortAsc, SortDesc } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface SearchFiltersProps {
  onFilterChange: (filters: any) => void;
  activeFilters: {
    folders: string[];
    tags: string[];
    priorities: string[];
    isPinned: boolean;
    isRecent: boolean;
  };
  onSortChange: (field: string, direction: string) => void;
}

export function SearchFilters({ onFilterChange, activeFilters, onSortChange }: SearchFiltersProps) {
  const [selectedFolders, setSelectedFolders] = useState<string[]>(activeFilters.folders || []);
  const [selectedTags, setSelectedTags] = useState<string[]>(activeFilters.tags || []);
  const [selectedPriorities, setSelectedPriorities] = useState<string[]>(activeFilters.priorities || []);
  const [isPinned, setIsPinned] = useState<boolean>(activeFilters.isPinned || false);
  const [isRecent, setIsRecent] = useState<boolean>(activeFilters.isRecent || false);
  const [sortField, setSortField] = useState<"date" | "title">("date");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  
  const folders = [
    { id: "work", name: "Work", color: "purple" },
    { id: "personal", name: "Personal", color: "pink" },
    { id: "projects", name: "Projects", color: "green" },
  ];
  
  const tags = ["meeting", "project", "design", "client", "health", "travel", "reading", "shopping"];
  
  useEffect(() => {
    // Update local state when active filters change
    setSelectedFolders(activeFilters.folders);
    setSelectedTags(activeFilters.tags);
    setSelectedPriorities(activeFilters.priorities);
    setIsPinned(activeFilters.isPinned);
    setIsRecent(activeFilters.isRecent);
  }, [activeFilters]);
  
  useEffect(() => {
    // Notify parent component when filters change
    onFilterChange({
      folders: selectedFolders,
      tags: selectedTags,
      priorities: selectedPriorities,
      isPinned,
      isRecent,
    });
  }, [selectedFolders, selectedTags, selectedPriorities, isPinned, isRecent]);
  
  const toggleFolder = (id: string) => {
    if (selectedFolders.includes(id)) {
      setSelectedFolders(selectedFolders.filter(f => f !== id));
    } else {
      setSelectedFolders([...selectedFolders, id]);
    }
  };
  
  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };
  
  const togglePriority = (priority: string) => {
    if (selectedPriorities.includes(priority)) {
      setSelectedPriorities(selectedPriorities.filter(p => p !== priority));
    } else {
      setSelectedPriorities([...selectedPriorities, priority]);
    }
  };
  
  const handleSortChange = (field: "date" | "title", direction: "asc" | "desc") => {
    setSortField(field);
    setSortDirection(direction);
    onSortChange(field, direction);
  };
  
  const handleClearFilters = () => {
    setSelectedFolders([]);
    setSelectedTags([]);
    setSelectedPriorities([]);
    setIsPinned(false);
    setIsRecent(false);
  };
  
  return (
    <Card className="mb-4 animate-fade-in">
      <CardContent className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 font-medium">
              <Tag className="h-4 w-4 text-accent" />
              <span>Folders</span>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-7 w-7">
                  <ArrowUpDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Sort By</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => handleSortChange("date", "desc")}>
                  <Clock className="mr-2 h-4 w-4" /> Date (Newest)
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleSortChange("date", "asc")}>
                  <Clock className="mr-2 h-4 w-4" /> Date (Oldest)
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleSortChange("title", "asc")}>
                  <SortAsc className="mr-2 h-4 w-4" /> Title (A-Z)
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleSortChange("title", "desc")}>
                  <SortDesc className="mr-2 h-4 w-4" /> Title (Z-A)
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="flex flex-wrap gap-2">
            {folders.map((folder) => (
              <button
                key={folder.id}
                className={`
                  flex items-center gap-1.5 py-1 px-2 rounded-md text-sm transition-all duration-200
                  ${selectedFolders.includes(folder.id) 
                    ? `bg-folder-${folder.color} text-accent-foreground` 
                    : 'bg-secondary/40 hover:bg-secondary text-muted-foreground'}
                `}
                onClick={() => toggleFolder(folder.id)}
              >
                <div className={`w-2 h-2 rounded-full bg-folder-${folder.color}`} />
                {folder.name}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-2 font-medium">
            <Tag className="h-4 w-4 text-accent" />
            <span>Tags</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {tags.map((tag) => (
              <Badge 
                key={tag}
                variant={selectedTags.includes(tag) ? "default" : "outline"}
                className="cursor-pointer transition-all hover:scale-105"
                onClick={() => toggleTag(tag)}
              >
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <div className="space-y-2">
            <div className="flex items-center gap-2 font-medium">
              <AlertTriangle className="h-4 w-4 text-accent" />
              <span>Priority</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <Button 
                variant={selectedPriorities.includes("low") ? "default" : "outline"} 
                size="sm" 
                className="justify-start bg-blue-500/10 hover:bg-blue-500/20"
                onClick={() => togglePriority("low")}
              >
                <div className="w-2 h-2 rounded-full bg-blue-500 mr-2" /> Low
              </Button>
              <Button 
                variant={selectedPriorities.includes("medium") ? "default" : "outline"} 
                size="sm" 
                className="justify-start bg-yellow-500/10 hover:bg-yellow-500/20"
                onClick={() => togglePriority("medium")}
              >
                <div className="w-2 h-2 rounded-full bg-yellow-500 mr-2" /> Medium
              </Button>
              <Button 
                variant={selectedPriorities.includes("high") ? "default" : "outline"} 
                size="sm" 
                className="justify-start bg-red-500/10 hover:bg-red-500/20"
                onClick={() => togglePriority("high")}
              >
                <div className="w-2 h-2 rounded-full bg-red-500 mr-2" /> High
              </Button>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center gap-2 font-medium">
              <Star className="h-4 w-4 text-accent" />
              <span>Other</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                <Checkbox 
                  id="pinned" 
                  checked={isPinned}
                  onCheckedChange={() => setIsPinned(!isPinned)}
                />
                <label htmlFor="pinned" className="text-sm cursor-pointer">Pinned</label>
              </div>
              <div className="flex items-center gap-1.5">
                <Checkbox 
                  id="recent" 
                  checked={isRecent}
                  onCheckedChange={() => setIsRecent(!isRecent)}
                />
                <label htmlFor="recent" className="text-sm cursor-pointer">Recent</label>
              </div>
            </div>
          </div>
          
          <div className="pt-2 flex justify-between">
            <Button variant="outline" size="sm" className="text-xs w-full" onClick={handleClearFilters}>
              Clear Filters
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
