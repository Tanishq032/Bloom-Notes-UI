
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Moon, PlusCircle, Search, Sun, Bell, Users, 
  X, MessageSquare, Settings, Calendar, Tag, 
  File, Folder
} from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator,
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { useTheme } from "./ThemeProvider";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";

export function TopBar() {
  const { theme, setTheme } = useTheme();
  const [searching, setSearching] = useState(false);
  const [notifications, setNotifications] = useState(3);
  const [showQuickActions, setShowQuickActions] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const quickActionsRef = useRef<HTMLDivElement>(null);
  
  // Close search when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setSearching(false);
      }
      if (quickActionsRef.current && !quickActionsRef.current.contains(event.target as Node)) {
        setShowQuickActions(false);
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  
  return (
    <div className="h-16 border-b flex items-center px-4 justify-between bg-background/80 backdrop-blur-sm sticky top-0 z-10">
      <div className="flex items-center w-full max-w-xl" ref={searchRef}>
        <div className="relative w-full">
          <Search className={`absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground transition-all duration-300 ${searching ? 'text-accent' : ''}`} />
          <Input 
            placeholder="Search notes..." 
            className={`w-full transition-all duration-300 ${searching 
              ? 'pl-8 pr-8 ring-2 ring-accent/20 shadow-md' 
              : 'pl-8 focus:ring-2 focus:ring-accent/20'}`}
            onFocus={() => setSearching(true)}
          />
          {searching && (
            <button 
              className="absolute right-2 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground hover:text-foreground transition-colors duration-200"
              onClick={() => setSearching(false)}
            >
              <X className="h-4 w-4" />
            </button>
          )}
          
          {searching && (
            <motion.div 
              className="absolute top-full left-0 w-full mt-1 bg-background border rounded-md shadow-lg p-2 z-50"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <div className="text-xs text-muted-foreground mb-2">Try searching by tag, folder or content</div>
              <div className="text-xs font-medium text-foreground mt-1">Recent Searches:</div>
              <div className="flex flex-wrap gap-1 mt-1">
                <Badge variant="outline" className="text-xs hover:bg-accent/10 cursor-pointer">project ideas</Badge>
                <Badge variant="outline" className="text-xs hover:bg-accent/10 cursor-pointer">meeting notes</Badge>
                <Badge variant="outline" className="text-xs hover:bg-accent/10 cursor-pointer">tag:important</Badge>
              </div>
            </motion.div>
          )}
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <div className="relative" ref={quickActionsRef}>
          <Button 
            size="sm" 
            className="rounded-full gap-2 bg-accent hover:bg-accent/90 transition-all duration-200 hover:shadow-lg hover:shadow-accent/20"
            onClick={() => setShowQuickActions(!showQuickActions)}
          >
            <PlusCircle className="h-4 w-4" />
            <span>New</span>
          </Button>
          
          <AnimatePresence>
            {showQuickActions && (
              <motion.div 
                className="absolute right-0 mt-2 bg-background border rounded-lg shadow-lg py-1 min-w-36 z-20"
                initial={{ opacity: 0, scale: 0.95, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -10 }}
                transition={{ duration: 0.15 }}
              >
                <div className="px-2 py-1 text-xs font-medium text-muted-foreground">Create New</div>
                <DropdownMenu>
                  <DropdownMenuContent forceMount className="p-0 border-0 shadow-none min-w-0 bg-transparent">
                    <DropdownMenuItem className="cursor-pointer gap-2 py-1.5">
                      <File className="h-4 w-4 text-accent" />
                      <span>Note</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer gap-2 py-1.5">
                      <Folder className="h-4 w-4 text-accent" />
                      <span>Folder</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer gap-2 py-1.5">
                      <Tag className="h-4 w-4 text-accent" />
                      <span>Tag</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer gap-2 py-1.5">
                      <Calendar className="h-4 w-4 text-accent" />
                      <span>Reminder</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="ghost" 
              size="icon"
              className="rounded-full relative transition-all duration-200 hover:bg-accent/10"
            >
              <Bell className="h-5 w-5" />
              {notifications > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-accent text-white text-xs rounded-full h-4 w-4 flex items-center justify-center animate-pulse">
                  {notifications}
                </span>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <div className="flex items-center justify-between px-4 py-2">
              <span className="font-medium">Notifications</span>
              <Button variant="ghost" size="sm" className="h-8 px-2 text-xs">
                Mark all as read
              </Button>
            </div>
            <DropdownMenuSeparator />
            <div className="max-h-64 overflow-auto">
              <div className="p-3 hover:bg-accent/5 transition-colors border-l-2 border-accent">
                <div className="flex gap-2">
                  <div className="flex-shrink-0 mt-1">
                    <Bell className="h-4 w-4 text-accent" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Reminder: Team Meeting</p>
                    <p className="text-xs text-muted-foreground">Today at 2:00 PM</p>
                  </div>
                </div>
              </div>
              <div className="p-3 hover:bg-accent/5 transition-colors">
                <div className="flex gap-2">
                  <div className="flex-shrink-0 mt-1">
                    <Users className="h-4 w-4 text-blue-500" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Alex shared a note with you</p>
                    <p className="text-xs text-muted-foreground">Yesterday at 5:30 PM</p>
                  </div>
                </div>
              </div>
              <div className="p-3 hover:bg-accent/5 transition-colors">
                <div className="flex gap-2">
                  <div className="flex-shrink-0 mt-1">
                    <MessageSquare className="h-4 w-4 text-green-500" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">New comment on "Project Ideas"</p>
                    <p className="text-xs text-muted-foreground">2 days ago</p>
                  </div>
                </div>
              </div>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
        
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="rounded-full transition-all duration-300 hover:bg-accent/10"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={theme}
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 180 }}
              transition={{ duration: 0.3 }}
            >
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </motion.div>
          </AnimatePresence>
        </Button>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="rounded-full p-0 transition-all duration-200 hover:bg-accent/10">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <div className="flex items-center gap-2 p-2">
              <Avatar>
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div>
                <div className="font-medium">Jane Doe</div>
                <div className="text-xs text-muted-foreground">jane@example.com</div>
              </div>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="gap-2 cursor-pointer">
              <Settings className="h-4 w-4" /> Profile
            </DropdownMenuItem>
            <DropdownMenuItem className="gap-2 cursor-pointer">
              <Settings className="h-4 w-4" /> Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive gap-2 cursor-pointer">
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
