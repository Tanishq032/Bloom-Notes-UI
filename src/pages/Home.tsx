
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dashboard } from "@/components/dashboard/Dashboard";
import { NoteGrid } from "@/components/notes/NoteGrid";

export function Home() {
  return (
    <Tabs defaultValue="notes" className="w-full">
      <div className="flex justify-between items-center mb-6">
        <TabsList>
          <TabsTrigger value="notes">My Notes</TabsTrigger>
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
        </TabsList>
      </div>
      
      <TabsContent value="notes" className="mt-0">
        <NoteGrid />
      </TabsContent>
      
      <TabsContent value="dashboard" className="mt-0">
        <Dashboard />
      </TabsContent>
    </Tabs>
  );
}

export default Home;
