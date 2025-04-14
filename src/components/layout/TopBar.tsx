
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Moon, PlusCircle, Search, Sun } from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { useTheme } from "./ThemeProvider";

export function TopBar() {
  const { theme, setTheme } = useTheme();
  
  return (
    <div className="h-16 border-b flex items-center px-4 justify-between">
      <div className="flex items-center w-full max-w-xl">
        <div className="relative w-full">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search notes..." 
            className="w-full pl-8 focus:ring-2 focus:ring-accent/20 transition-all duration-300"
          />
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <Button size="sm" className="rounded-full gap-2 bg-accent hover:bg-accent/90">
          <PlusCircle className="h-4 w-4" />
          <span>New Note</span>
        </Button>
        
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="rounded-full"
        >
          {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </Button>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="rounded-full p-0">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Log out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
