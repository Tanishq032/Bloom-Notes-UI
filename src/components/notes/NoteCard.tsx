
import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Edit, Pin, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NoteCardProps {
  id: string;
  title: string;
  content: string;
  date: string;
  folder: {
    name: string;
    color: string;
  };
  isPinned?: boolean;
  className?: string;
  onClick?: () => void;
}

export function NoteCard({ 
  id, 
  title, 
  content, 
  date, 
  folder, 
  isPinned = false,
  className,
  onClick
}: NoteCardProps) {
  const [showActions, setShowActions] = useState(false);
  
  return (
    <Card 
      className={cn(
        "card-hover cursor-pointer relative overflow-hidden animate-scale-in", 
        className
      )}
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
      onClick={onClick}
    >
      {isPinned && (
        <div className="absolute top-2 right-2 z-10">
          <Pin className="h-4 w-4 text-accent" fill="currentColor" />
        </div>
      )}
      
      <CardHeader className="p-4 pb-0">
        <CardTitle className="text-lg font-semibold line-clamp-1">{title}</CardTitle>
      </CardHeader>
      
      <CardContent className="p-4 pt-2">
        <p className="text-sm text-muted-foreground line-clamp-3">{content}</p>
      </CardContent>
      
      <CardFooter className="p-4 pt-0 flex items-center justify-between">
        <Badge variant="outline" className={cn(
          "text-xs font-normal",
          `bg-folder-${folder.color} bg-opacity-50`
        )}>
          {folder.name}
        </Badge>
        <span className="text-xs text-muted-foreground">{date}</span>
      </CardFooter>
      
      {showActions && (
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent bg-opacity-80 flex items-end justify-center p-4 animate-fade-in">
          <div className="flex gap-2">
            <Button size="sm" variant="outline" className="rounded-full w-8 h-8 p-0">
              <Edit className="h-4 w-4" />
            </Button>
            <Button size="sm" variant="outline" className="rounded-full w-8 h-8 p-0">
              <Pin className="h-4 w-4" />
            </Button>
            <Button size="sm" variant="outline" className="rounded-full w-8 h-8 p-0 text-destructive">
              <Trash className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </Card>
  );
}
