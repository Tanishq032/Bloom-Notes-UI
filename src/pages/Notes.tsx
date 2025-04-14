
import { useState, useEffect } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { NotesEditor } from "@/components/notes/NotesEditor";
import { Note } from "@/types/notes";
import { useToast } from "@/components/ui/use-toast";
import { useTheme } from "@/components/layout/ThemeProvider";

export function Notes() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const { toast } = useToast();
  const { theme } = useTheme();

  // Load notes from localStorage on mount
  useEffect(() => {
    const savedNotes = localStorage.getItem('notes');
    if (savedNotes) {
      try {
        setNotes(JSON.parse(savedNotes));
      } catch (e) {
        console.error("Failed to parse saved notes", e);
      }
    }
  }, []);

  // Save notes to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  const handleCreateNote = (note: Note) => {
    const newNotes = [...notes, note];
    setNotes(newNotes);
    toast({
      title: "Note created",
      description: "Your note has been saved successfully",
    });
  };

  const handleUpdateNote = (updatedNote: Note) => {
    const newNotes = notes.map((note) => 
      note.id === updatedNote.id ? updatedNote : note
    );
    setNotes(newNotes);
    setSelectedNote(null);
    toast({
      title: "Note updated",
      description: "Your changes have been saved",
    });
  };

  const handleDeleteNote = (id: string) => {
    const newNotes = notes.filter((note) => note.id !== id);
    setNotes(newNotes);
    if (selectedNote?.id === id) {
      setSelectedNote(null);
    }
    toast({
      title: "Note deleted",
      description: "Your note has been removed",
      variant: "destructive",
    });
  };

  return (
    <ThemeProvider>
      <MainLayout>
        <div className="space-y-6">
          <h1 className="text-3xl font-bold tracking-tight">My Notes</h1>
          <NotesEditor 
            notes={notes}
            selectedNote={selectedNote}
            setSelectedNote={setSelectedNote}
            onCreateNote={handleCreateNote}
            onUpdateNote={handleUpdateNote}
            onDeleteNote={handleDeleteNote}
          />
        </div>
      </MainLayout>
    </ThemeProvider>
  );
}

export default Notes;
