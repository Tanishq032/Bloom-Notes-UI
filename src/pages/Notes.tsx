
import { useState, useEffect } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { NotesEditor } from "@/components/notes/NotesEditor";
import { Note } from "@/types/notes";
import { useToast } from "@/components/ui/use-toast";
import { useTheme } from "@/components/layout/ThemeProvider";
import { useLocation } from "react-router-dom";
import { Sidebar } from "@/components/layout/Sidebar";
import { NoteGrid } from "@/components/notes/NoteGrid";

export function Notes() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [activeFolder, setActiveFolder] = useState<string>("inbox");
  const { toast } = useToast();
  const { theme } = useTheme();
  const location = useLocation();

  // Check for folder in location state
  useEffect(() => {
    if (location.state && location.state.folder) {
      setActiveFolder(location.state.folder);
    }
  }, [location.state]);

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

  const handleFolderSelect = (folderId: string) => {
    setActiveFolder(folderId);
  };

  return (
    <ThemeProvider>
      <MainLayout sidebar={<Sidebar onFolderSelect={handleFolderSelect} activeFolder={activeFolder} />}>
        <div className="space-y-6">
          <h1 className="text-3xl font-bold tracking-tight">My Notes</h1>
          {location.pathname === "/notes" && !location.search ? (
            <NoteGrid activeFolder={activeFolder} />
          ) : (
            <NotesEditor 
              notes={notes}
              selectedNote={selectedNote}
              setSelectedNote={setSelectedNote}
              onCreateNote={handleCreateNote}
              onUpdateNote={handleUpdateNote}
              onDeleteNote={handleDeleteNote}
            />
          )}
        </div>
      </MainLayout>
    </ThemeProvider>
  );
}

export default Notes;
