
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { 
  ChevronLeft, ChevronRight, FolderPlus, 
  Inbox, Archive, Star, Trash, Settings,
  FolderOpen, File, Home, Users, Plus, MoreHorizontal, Calendar
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";

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
  { id: "shared", name: "Shared with me", icon: Users, count: 3, color: "yellow", collaborative: true },
  { id: "starred", name: "Starred", icon: Star, count: 4, color: "yellow" },
  { id: "reminders", name: "Reminders", icon: Calendar, count: 2, color: "orange" },
  { id: "archive", name: "Archive", icon: Archive, count: 20, color: "orange" },
  { id: "trash", name: "Trash", icon: Trash, count: 3, color: "red" },
];

export function Sidebar({ className }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedFolder, setSelectedFolder] = useState("inbox");
  const [hoveredFolder, setHoveredFolder] = useState<string | null>(null);

  return (
    <motion.div 
      className={cn(
        "flex flex-col border-r bg-sidebar transition-all duration-500 h-screen relative",
        collapsed ? "w-16" : "w-64",
        className
      )}
      layout
    >
      <div className="flex items-center justify-between p-4">
        <AnimatePresence>
          {!collapsed && (
            <motion.div 
              className="flex items-center gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <File className="h-6 w-6 text-accent" />
              <h1 className="text-xl font-bold">Bloom Notes</h1>
            </motion.div>
          )}
        </AnimatePresence>
        
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => setCollapsed(!collapsed)}
          className={cn("transition-all duration-300", collapsed ? "ml-auto rotate-180" : "")}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="flex-1 overflow-auto py-2 px-1.5">
        <TooltipProvider delayDuration={300}>
          <div className="space-y-1">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="ghost" 
                  className={cn(
                    "w-full justify-start font-normal transition-all duration-200",
                    collapsed ? "px-2" : "px-4",
                    selectedFolder === "dashboard" ? "bg-sidebar-accent" : ""
                  )}
                >
                  <Home className="h-4 w-4 mr-2" />
                  <AnimatePresence>
                    {!collapsed && (
                      <motion.span
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: "auto" }}
                        exit={{ opacity: 0, width: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        Dashboard
                      </motion.span>
                    )}
                  </AnimatePresence>
                </Button>
              </TooltipTrigger>
              {collapsed && <TooltipContent side="right">Dashboard</TooltipContent>}
            </Tooltip>
            
            <div className="mt-4 space-y-1">
              {!collapsed && (
                <div className="px-4 flex items-center justify-between">
                  <h2 className="text-xs font-semibold tracking-tight mb-1">FOLDERS</h2>
                  <Button variant="ghost" size="icon" className="h-5 w-5">
                    <Plus className="h-3 w-3" />
                  </Button>
                </div>
              )}
              
              <div className="space-y-1">
                {folders.map((folder) => (
                  <Tooltip key={folder.id}>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        className={cn(
                          "w-full justify-start font-normal group relative transition-all duration-200",
                          collapsed ? "px-2" : "px-3",
                          selectedFolder === folder.id ? "bg-sidebar-accent" : "",
                          hoveredFolder === folder.id ? "bg-sidebar-accent/50" : ""
                        )}
                        onClick={() => setSelectedFolder(folder.id)}
                        onMouseEnter={() => setHoveredFolder(folder.id)}
                        onMouseLeave={() => setHoveredFolder(null)}
                      >
                        <div 
                          className={cn(
                            "p-1 rounded-md mr-2 transition-all duration-300 z-10",
                            `bg-folder-${folder.color}`,
                            selectedFolder === folder.id ? "scale-110" : ""
                          )}
                        >
                          <folder.icon className="h-4 w-4" />
                        </div>
                        <AnimatePresence>
                          {!collapsed && (
                            <motion.div 
                              className="flex items-center justify-between w-full"
                              initial={{ opacity: 0, width: 0 }}
                              animate={{ opacity: 1, width: "auto" }}
                              exit={{ opacity: 0, width: 0 }}
                              transition={{ duration: 0.2 }}
                            >
                              <div className="flex items-center">
                                <span>{folder.name}</span>
                                {folder.collaborative && (
                                  <Badge className="ml-2 h-4 text-[0.6rem] px-1 py-0 bg-blue-500/20 text-blue-500">
                                    <Users className="h-2 w-2 mr-0.5" /> Shared
                                  </Badge>
                                )}
                              </div>
                              <span className="text-xs text-muted-foreground bg-muted px-1.5 rounded-full">
                                {folder.count}
                              </span>
                            </motion.div>
                          )}
                        </AnimatePresence>
                        
                        {!collapsed && (
                          <div className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button variant="ghost" size="icon" className="h-6 w-6 hover:bg-accent/10">
                              <MoreHorizontal className="h-3 w-3" />
                            </Button>
                          </div>
                        )}
                      </Button>
                    </TooltipTrigger>
                    {collapsed && (
                      <TooltipContent side="right">
                        <div className="flex items-center justify-between gap-4">
                          <span>{folder.name}</span>
                          <span className="text-xs text-muted-foreground">{folder.count}</span>
                        </div>
                      </TooltipContent>
                    )}
                  </Tooltip>
                ))}
              </div>
            </div>
          </div>
        </TooltipProvider>
      </div>
      
      <div className="p-3 border-t flex flex-col gap-2">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button 
              variant="outline" 
              className={cn(
                "w-full justify-start gap-2 transition-all duration-300",
                "bg-accent/5 hover:bg-accent/10 hover:text-accent border-accent/20"
              )}
              size={collapsed ? "icon" : "default"}
            >
              <FolderPlus className="h-4 w-4" />
              <AnimatePresence>
                {!collapsed && (
                  <motion.span
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: "auto" }}
                    exit={{ opacity: 0, width: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    New Folder
                  </motion.span>
                )}
              </AnimatePresence>
            </Button>
          </TooltipTrigger>
          {collapsed && <TooltipContent side="right">New Folder</TooltipContent>}
        </Tooltip>
        
        <Tooltip>
          <TooltipTrigger asChild>
            <Button 
              variant="ghost" 
              size={collapsed ? "icon" : "default"}
              className="w-full justify-start gap-2"
            >
              <Settings className="h-4 w-4" />
              <AnimatePresence>
                {!collapsed && (
                  <motion.span
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: "auto" }}
                    exit={{ opacity: 0, width: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    Settings
                  </motion.span>
                )}
              </AnimatePresence>
            </Button>
          </TooltipTrigger>
          {collapsed && <TooltipContent side="right">Settings</TooltipContent>}
        </Tooltip>
      </div>
    </motion.div>
  );
}
