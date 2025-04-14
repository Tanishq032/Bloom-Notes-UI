
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { 
  ChevronLeft, ChevronRight, FolderPlus, 
  Inbox, Archive, Star, Trash, Settings,
  FolderOpen, File, Home
} from "lucide-react";

interface SidebarProps {
  className?: string;
}

const folderColors = [
  "blue", "pink", "purple", "green", "yellow", "orange", "red", "teal"
];

const folders = [
  { id: "inbox", name: "Inbox", icon: Inbox, count: 12, color: "blue" },
  { id: "personal", name: "Personal", icon: FolderOpen, count: 8, color: "pink" },
  { id: "work", name: "Work", icon: FolderOpen, count: 15, color: "purple" },
  { id: "projects", name: "Projects", icon: FolderOpen, count: 6, color: "green" },
  { id: "starred", name: "Starred", icon: Star, count: 4, color: "yellow" },
  { id: "archive", name: "Archive", icon: Archive, count: 20, color: "orange" },
  { id: "trash", name: "Trash", icon: Trash, count: 3, color: "red" },
];

export function Sidebar({ className }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedFolder, setSelectedFolder] = useState("inbox");

  return (
    <div 
      className={cn(
        "flex flex-col border-r bg-sidebar transition-all duration-300 h-screen",
        collapsed ? "w-16" : "w-64",
        className
      )}
    >
      <div className="flex items-center justify-between p-4">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <File className="h-6 w-6 text-accent" />
            <h1 className="text-xl font-bold">Bloom Notes</h1>
          </div>
        )}
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => setCollapsed(!collapsed)}
          className="ml-auto"
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>
      
      <div className="flex-1 overflow-auto">
        <div className="p-2">
          <Button 
            variant="ghost" 
            className={cn(
              "w-full justify-start font-normal animate-fade-in mb-2",
              collapsed ? "px-2" : "px-4"
            )}
          >
            <Home className="h-4 w-4 mr-2" />
            {!collapsed && <span>Dashboard</span>}
          </Button>
          
          <div className="mt-4">
            {!collapsed && <h2 className="px-4 text-xs font-semibold tracking-tight mb-2">FOLDERS</h2>}
            
            <div className="space-y-1">
              {folders.map((folder) => (
                <Button
                  key={folder.id}
                  variant="ghost"
                  className={cn(
                    "w-full justify-start font-normal transition-all duration-200",
                    collapsed ? "px-2" : "px-3",
                    selectedFolder === folder.id ? "bg-sidebar-accent" : "",
                  )}
                  onClick={() => setSelectedFolder(folder.id)}
                >
                  <div 
                    className={cn(
                      "p-1 rounded-md mr-2",
                      `bg-folder-${folder.color}`
                    )}
                  >
                    <folder.icon className="h-4 w-4" />
                  </div>
                  {!collapsed && (
                    <div className="flex items-center justify-between w-full">
                      <span>{folder.name}</span>
                      <span className="text-xs text-muted-foreground">{folder.count}</span>
                    </div>
                  )}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <div className="p-4 border-t flex flex-col gap-2">
        <Button 
          variant="outline" 
          className="w-full justify-start gap-2" 
          size={collapsed ? "icon" : "default"}
        >
          <FolderPlus className="h-4 w-4" />
          {!collapsed && <span>New Folder</span>}
        </Button>
        
        <Button 
          variant="ghost" 
          size={collapsed ? "icon" : "default"}
          className="w-full justify-start gap-2"
        >
          <Settings className="h-4 w-4" />
          {!collapsed && <span>Settings</span>}
        </Button>
      </div>
    </div>
  );
}
