
export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  folder?: {
    name: string;
    color: string;
  };
  isPinned?: boolean;
  priority?: "low" | "medium" | "high";
  tags?: string[];
}
