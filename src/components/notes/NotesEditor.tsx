
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlusCircle, Save, Trash2, FileText, Tag, Clock } from "lucide-react";
import { Note } from "@/types/notes";
import { format } from "date-fns";
import { useTheme } from "@/components/layout/ThemeProvider";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";

interface NotesEditorProps {
  notes: Note[];
  selectedNote: Note | null;
  setSelectedNote: (note: Note | null) => void;
  onCreateNote: (note: Note) => void;
  onUpdateNote: (note: Note) => void;
  onDeleteNote: (id: string) => void;
}

export function NotesEditor({
  notes,
  selectedNote,
  setSelectedNote,
  onCreateNote,
  onUpdateNote,
  onDeleteNote,
}: NotesEditorProps) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [mode, setMode] = useState<"create" | "edit">("create");
  const [activeTab, setActiveTab] = useState<"editor" | "preview">("editor");
  const { theme } = useTheme();

  // Reset form when selectedNote changes
  useEffect(() => {
    if (selectedNote) {
      setTitle(selectedNote.title);
      setContent(selectedNote.content);
      setTags(selectedNote.tags || []);
      setMode("edit");
    } else {
      setTitle("");
      setContent("");
      setTags([]);
      setMode("create");
    }
  }, [selectedNote]);

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleSubmit = () => {
    if (!title.trim() || !content.trim()) return;

    const now = new Date().toISOString();
    
    if (mode === "create") {
      const newNote: Note = {
        id: Date.now().toString(),
        title,
        content,
        tags,
        createdAt: now,
        updatedAt: now,
      };
      onCreateNote(newNote);
      setTitle("");
      setContent("");
      setTags([]);
    } else {
      if (!selectedNote) return;
      
      const updatedNote: Note = {
        ...selectedNote,
        title,
        content,
        tags,
        updatedAt: now,
      };
      onUpdateNote(updatedNote);
    }
  };

  const handleCancel = () => {
    setSelectedNote(null);
    setTitle("");
    setContent("");
    setTags([]);
    setMode("create");
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Notes List */}
      <Card className="md:col-span-1 overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-medium">Your Notes</h2>
          <Button 
            size="sm" 
            onClick={() => {
              setSelectedNote(null);
              setMode("create");
            }}
            className="gap-1"
          >
            <PlusCircle className="h-4 w-4" />
            New
          </Button>
        </div>
        <div className="h-[calc(100vh-280px)] overflow-y-auto p-2">
          {notes.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground p-4">
              <FileText className="h-12 w-12 mb-2 opacity-50" />
              <p>You don't have any notes yet</p>
              <p className="text-sm mt-1">Create your first note to get started</p>
            </div>
          ) : (
            <AnimatePresence>
              {notes.map((note) => (
                <motion.div
                  key={note.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <Button
                    variant="ghost"
                    className={`w-full justify-start text-left p-3 mb-1 rounded-md ${
                      selectedNote?.id === note.id ? "bg-accent/50" : ""
                    }`}
                    onClick={() => setSelectedNote(note)}
                  >
                    <div className="w-full overflow-hidden">
                      <div className="font-medium truncate">{note.title}</div>
                      <div className="text-xs text-muted-foreground flex items-center mt-1">
                        <Clock className="h-3 w-3 mr-1" />
                        {format(new Date(note.updatedAt), "MMM d, yyyy")}
                      </div>
                      {note.tags && note.tags.length > 0 && (
                        <div className="flex mt-2 flex-wrap gap-1">
                          {note.tags.map(tag => (
                            <Badge key={tag} variant="outline" className="text-xs px-1 py-0">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  </Button>
                </motion.div>
              ))}
            </AnimatePresence>
          )}
        </div>
      </Card>

      {/* Note Editor */}
      <Card className="md:col-span-2">
        <Tabs defaultValue="editor" className="w-full" value={activeTab} onValueChange={(value) => setActiveTab(value as "editor" | "preview")}>
          <div className="flex items-center justify-between p-4 border-b">
            <TabsList>
              <TabsTrigger value="editor">Editor</TabsTrigger>
              <TabsTrigger value="preview">Preview</TabsTrigger>
            </TabsList>
            <div className="flex gap-2">
              {mode === "edit" && (
                <Button 
                  variant="destructive" 
                  size="sm"
                  onClick={() => {
                    if (selectedNote) onDeleteNote(selectedNote.id);
                  }}
                >
                  <Trash2 className="h-4 w-4 mr-1" />
                  Delete
                </Button>
              )}
              <Button 
                variant="default" 
                size="sm"
                onClick={handleSubmit}
                disabled={!title.trim() || !content.trim()}
              >
                <Save className="h-4 w-4 mr-1" />
                {mode === "create" ? "Save" : "Update"}
              </Button>
            </div>
          </div>

          <TabsContent value="editor" className="m-0 p-4">
            <div className="space-y-4">
              <div>
                <Input
                  placeholder="Note title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="text-lg font-medium"
                />
              </div>
              
              <div className="flex items-center gap-2">
                <Input
                  placeholder="Add tag"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddTag();
                    }
                  }}
                  className="flex-grow"
                />
                <Button 
                  size="sm" 
                  variant="outline" 
                  onClick={handleAddTag}
                  disabled={!tagInput.trim()}
                >
                  <Tag className="h-4 w-4 mr-1" />
                  Add
                </Button>
              </div>

              {tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {tags.map(tag => (
                    <Badge 
                      key={tag} 
                      variant="secondary"
                      className="gap-1 cursor-pointer hover:bg-secondary/80"
                      onClick={() => handleRemoveTag(tag)}
                    >
                      {tag}
                      <span className="text-xs ml-1">×</span>
                    </Badge>
                  ))}
                </div>
              )}
              
              <Textarea
                placeholder="Write your note content here..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="min-h-[300px] resize-none"
              />
              
              {mode === "edit" && (
                <div className="flex justify-end">
                  <Button variant="ghost" size="sm" onClick={handleCancel}>
                    Cancel
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="preview" className="m-0">
            <div className="p-4 space-y-4 min-h-[400px]">
              {title ? (
                <>
                  <h2 className="text-2xl font-bold">{title}</h2>
                  
                  {tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {tags.map(tag => (
                        <Badge key={tag} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                  
                  <div className="prose dark:prose-invert max-w-none">
                    {content.split('\n').map((paragraph, i) => (
                      <p key={i}>{paragraph}</p>
                    ))}
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground p-4">
                  <p>Nothing to preview yet</p>
                  <p className="text-sm mt-1">Start writing in the editor to see a preview</p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
}
