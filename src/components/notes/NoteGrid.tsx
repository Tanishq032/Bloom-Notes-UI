
import { NoteCard } from "./NoteCard";

const dummyNotes = [
  {
    id: "1",
    title: "Project Kickoff Meeting",
    content: "Discuss project timeline, deliverables, and team responsibilities. Set up weekly check-ins.",
    date: "Apr 10, 2025",
    folder: { name: "Work", color: "purple" },
    isPinned: true,
  },
  {
    id: "2",
    title: "Grocery List",
    content: "Eggs, milk, bread, cheese, apples, chicken, pasta, tomatoes, olive oil, cereal",
    date: "Apr 12, 2025",
    folder: { name: "Personal", color: "pink" },
  },
  {
    id: "3",
    title: "Book Recommendations",
    content: "1. Atomic Habits by James Clear\n2. Deep Work by Cal Newport\n3. The Psychology of Money by Morgan Housel",
    date: "Apr 8, 2025",
    folder: { name: "Personal", color: "pink" },
  },
  {
    id: "4",
    title: "Website Redesign Ideas",
    content: "- Simplify navigation\n- Add testimonials section\n- Improve mobile responsiveness\n- Update color scheme to match brand",
    date: "Apr 14, 2025",
    folder: { name: "Projects", color: "green" },
    isPinned: true,
  },
  {
    id: "5",
    title: "Vacation Planning",
    content: "Research flights to Barcelona, book accommodation, make list of sights to see and restaurants to try.",
    date: "Apr 5, 2025",
    folder: { name: "Personal", color: "pink" },
  },
  {
    id: "6",
    title: "Quarterly Goals",
    content: "1. Complete certification\n2. Launch new product feature\n3. Improve team collaboration\n4. Reduce project turnaround time",
    date: "Apr 1, 2025",
    folder: { name: "Work", color: "purple" },
  },
  {
    id: "7",
    title: "Fitness Plan",
    content: "Monday: Upper body\nTuesday: Cardio\nWednesday: Lower body\nThursday: Rest\nFriday: Full body\nWeekend: Active recovery",
    date: "Apr 3, 2025",
    folder: { name: "Personal", color: "pink" },
  },
  {
    id: "8",
    title: "Client Meeting Notes",
    content: "Discussed new requirements for phase 2. Client wants to add user authentication and a dashboard feature.",
    date: "Apr 11, 2025",
    folder: { name: "Work", color: "purple" },
  },
];

export function NoteGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {dummyNotes.map((note) => (
        <NoteCard
          key={note.id}
          id={note.id}
          title={note.title}
          content={note.content}
          date={note.date}
          folder={note.folder}
          isPinned={note.isPinned}
          onClick={() => console.log(`Open note: ${note.id}`)}
        />
      ))}
    </div>
  );
}
