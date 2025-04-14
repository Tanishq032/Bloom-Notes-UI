
import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Edit, Pin, Trash, Clock, Tag, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { motion } from "framer-motion";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

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
  priority?: "low" | "medium" | "high";
  tags?: string[];
  className?: string;
  onClick?: () => void;
  onEdit?: () => void;
  onPin?: () => void;
  onDelete?: () => void;
}

export function NoteCard({ 
  id, 
  title, 
  content, 
  date, 
  folder, 
  isPinned = false,
  priority,
  tags = [],
  className,
  onClick,
  onEdit,
  onPin,
  onDelete
}: NoteCardProps) {
  const [showActions, setShowActions] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  
  const priorityColors = {
    low: "bg-blue-500/20 text-blue-500",
    medium: "bg-yellow-500/20 text-yellow-500",
    high: "bg-red-500/20 text-red-500"
  };
  
  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowDeleteDialog(true);
  };
  
  const handleConfirmDelete = () => {
    setShowDeleteDialog(false);
    onDelete?.();
  };
  
  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    onEdit?.();
  };
  
  const handlePin = (e: React.MouseEvent) => {
    e.stopPropagation();
    onPin?.();
  };
  
  return (
    <>
      <Card 
        className={cn(
          "card-hover cursor-pointer relative overflow-hidden transition-all duration-300 group animate-scale-in",
          "hover:shadow-lg hover:-translate-y-1 hover:shadow-accent/20",
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
          <div className="flex items-start justify-between">
            <CardTitle className="text-lg font-semibold line-clamp-1">{title}</CardTitle>
            {priority && (
              <HoverCard>
                <HoverCardTrigger asChild>
                  <div className={cn("rounded-full p-1 ml-2", priorityColors[priority])}>
                    <AlertCircle className="h-3 w-3" />
                  </div>
                </HoverCardTrigger>
                <HoverCardContent className="w-auto p-2 text-xs animate-fade-in">
                  {priority.charAt(0).toUpperCase() + priority.slice(1)} Priority
                </HoverCardContent>
              </HoverCard>
            )}
          </div>
        </CardHeader>
        
        <CardContent className="p-4 pt-2">
          <p className="text-sm text-muted-foreground line-clamp-3">{content}</p>
        </CardContent>
        
        <CardFooter className="p-4 pt-0 flex flex-col gap-2 items-start">
          <div className="flex items-center justify-between w-full">
            <Badge variant="outline" className={cn(
              "text-xs font-normal transition-colors duration-300",
              `bg-folder-${folder.color} bg-opacity-50 hover:bg-opacity-70`
            )}>
              {folder.name}
            </Badge>
            <span className="text-xs text-muted-foreground flex items-center gap-1">
              <Clock className="h-3 w-3" /> {date}
            </span>
          </div>
          
          {tags.length > 0 && (
            <div className="flex items-center gap-1 flex-wrap mt-1">
              {tags.map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs px-1.5 py-0 bg-secondary/60">
                  <Tag className="h-2.5 w-2.5 mr-1" />{tag}
                </Badge>
              ))}
            </div>
          )}
        </CardFooter>
        
        {showActions && (
          <motion.div 
            className="absolute inset-0 bg-gradient-to-t from-background to-transparent bg-opacity-80 flex items-end justify-center p-4 transition-opacity duration-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="flex gap-2">
              <Button 
                size="sm" 
                variant="outline" 
                className="rounded-full w-8 h-8 p-0 transition-transform duration-200 hover:scale-110"
                onClick={handleEdit}
              >
                <Edit className="h-4 w-4" />
              </Button>
              <Button 
                size="sm" 
                variant="outline" 
                className="rounded-full w-8 h-8 p-0 transition-transform duration-200 hover:scale-110"
                onClick={handlePin}
              >
                <Pin className="h-4 w-4" fill={isPinned ? "currentColor" : "none"} />
              </Button>
              <Button 
                size="sm" 
                variant="outline" 
                className="rounded-full w-8 h-8 p-0 text-destructive transition-transform duration-200 hover:scale-110"
                onClick={handleDelete}
              >
                <Trash className="h-4 w-4" />
              </Button>
            </div>
          </motion.div>
        )}
      </Card>
      
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your note.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
