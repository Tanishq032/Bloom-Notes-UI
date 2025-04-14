
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dashboard } from "@/components/dashboard/Dashboard";
import { NoteGrid } from "@/components/notes/NoteGrid";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Plus, X, FileText } from "lucide-react";
import { Card } from "@/components/ui/card";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

const TAB_VALUES = {
  NOTES: "notes",
  DASHBOARD: "dashboard"
};

export function Home() {
  const [activeTab, setActiveTab] = useState(TAB_VALUES.NOTES);
  const [showTips, setShowTips] = useState(true);
  
  // Animation variants for tab switching
  const tabVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } }
  };
  
  return (
    <div className="space-y-6">
      <AnimatePresence mode="wait">
        {showTips && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="p-4 bg-accent/5 border-accent/20 relative overflow-hidden mb-6">
              <Button 
                variant="ghost" 
                size="icon" 
                className="absolute top-2 right-2 h-6 w-6 text-muted-foreground hover:text-foreground"
                onClick={() => setShowTips(false)}
              >
                <X className="h-4 w-4" />
              </Button>
              
              <div className="flex flex-col gap-2">
                <h3 className="font-medium text-sm">Welcome to Bloom Notes! 🌱</h3>
                <p className="text-sm text-muted-foreground">
                  Organize your thoughts, track your ideas, and collaborate seamlessly. 
                  Here are some tips to get you started:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-2">
                  <div className="bg-background/50 p-3 rounded-md text-xs">
                    <strong>Create notes</strong> using the New button in the top bar
                  </div>
                  <div className="bg-background/50 p-3 rounded-md text-xs">
                    <strong>Organize</strong> with folders, tags, and color-coding
                  </div>
                  <div className="bg-background/50 p-3 rounded-md text-xs">
                    <strong>Track progress</strong> using the Dashboard analytics
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
      
      <Tabs 
        value={activeTab} 
        onValueChange={setActiveTab}
        className="w-full"
      >
        <div className="flex justify-between items-center mb-6">
          <TabsList>
            <TabsTrigger value={TAB_VALUES.NOTES}>My Notes</TabsTrigger>
            <TabsTrigger value={TAB_VALUES.DASHBOARD}>Dashboard</TabsTrigger>
          </TabsList>
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="gap-2 bg-accent hover:bg-accent/90">
                  <Plus className="h-4 w-4" />
                  New Note
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <FileText className="h-4 w-4 mr-2" />
                  <span>Blank Note</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <FileText className="h-4 w-4 mr-2" />
                  <span>From Template</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </motion.div>
        </div>
        
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            variants={tabVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {activeTab === TAB_VALUES.NOTES && (
              <TabsContent value={TAB_VALUES.NOTES} className="mt-0" forceMount>
                <NoteGrid />
              </TabsContent>
            )}
            
            {activeTab === TAB_VALUES.DASHBOARD && (
              <TabsContent value={TAB_VALUES.DASHBOARD} className="mt-0" forceMount>
                <Dashboard />
              </TabsContent>
            )}
          </motion.div>
        </AnimatePresence>
      </Tabs>
    </div>
  );
}

export default Home;
