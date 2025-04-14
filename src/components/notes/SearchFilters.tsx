
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Tag, Calendar, Star, AlertTriangle, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function SearchFilters() {
  const [selectedFolders, setSelectedFolders] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  
  const folders = [
    { id: "work", name: "Work", color: "purple" },
    { id: "personal", name: "Personal", color: "pink" },
    { id: "projects", name: "Projects", color: "green" },
  ];
  
  const tags = ["meeting", "project", "design", "client", "health", "travel", "reading", "shopping"];
  
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
  
  return (
    <Card className="mb-4 animate-fade-in">
      <CardContent className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-3">
          <div className="flex items-center gap-2 font-medium">
            <Tag className="h-4 w-4 text-accent" />
            <span>Folders</span>
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
              <Button variant="outline" size="sm" className="justify-start bg-blue-500/10 hover:bg-blue-500/20">
                <div className="w-2 h-2 rounded-full bg-blue-500 mr-2" /> Low
              </Button>
              <Button variant="outline" size="sm" className="justify-start bg-yellow-500/10 hover:bg-yellow-500/20">
                <div className="w-2 h-2 rounded-full bg-yellow-500 mr-2" /> Medium
              </Button>
              <Button variant="outline" size="sm" className="justify-start bg-red-500/10 hover:bg-red-500/20">
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
                <Checkbox id="pinned" />
                <label htmlFor="pinned" className="text-sm cursor-pointer">Pinned</label>
              </div>
              <div className="flex items-center gap-1.5">
                <Checkbox id="recent" />
                <label htmlFor="recent" className="text-sm cursor-pointer">Recent</label>
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center gap-2 font-medium">
              <Calendar className="h-4 w-4 text-accent" />
              <span>Date Range</span>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="text-xs w-full">
                <Calendar className="h-3 w-3 mr-1" /> Last 7 days
              </Button>
              <Button variant="outline" size="sm" className="text-xs w-full">
                <Calendar className="h-3 w-3 mr-1" /> Custom...
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
