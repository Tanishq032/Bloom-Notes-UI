
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Clock, Users } from "lucide-react";

export function ActivityCalendar() {
  // Generate random activity data for the calendar
  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();
  
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  
  const getIntensity = () => {
    const random = Math.random();
    if (random < 0.5) return 0;
    if (random < 0.7) return 1;
    if (random < 0.85) return 2;
    return 3;
  };
  
  const days = Array.from({ length: daysInMonth }, (_, i) => ({
    day: i + 1,
    intensity: getIntensity(),
  }));
  
  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
  // Generate placeholder for activity feed
  const recentActivity = [
    { 
      action: "Created note", 
      title: "Project Kickoff Meeting",
      timestamp: "Today, 10:42 AM"
    },
    { 
      action: "Edited note", 
      title: "Website Redesign Ideas",
      timestamp: "Today, 9:15 AM"
    },
    { 
      action: "Tagged note", 
      title: "Client Meeting Notes",
      tags: ["client", "meeting"],
      timestamp: "Yesterday, 4:30 PM"
    },
    { 
      action: "Added to folder", 
      title: "Book Recommendations",
      folder: { name: "Personal", color: "pink" },
      timestamp: "Yesterday, 2:15 PM"
    },
    { 
      action: "Shared note", 
      title: "Quarterly Goals",
      with: "Alex Smith",
      timestamp: "2 days ago"
    },
  ];
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <Card className="animate-fade-in">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Activity Calendar</CardTitle>
          <Calendar className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent className="px-2">
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-center text-sm font-medium py-2">
              {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </div>
            
            <div className="grid grid-cols-7 gap-1 text-center text-xs text-muted-foreground">
              {weekdays.map(day => (
                <div key={day}>{day}</div>
              ))}
            </div>
            
            <div className="grid grid-cols-7 gap-1">
              {/* Empty cells for days before the 1st of the month */}
              {Array.from({ length: firstDayOfMonth }).map((_, index) => (
                <div key={`empty-${index}`} className="w-full pt-[100%] relative"></div>
              ))}
              
              {/* Actual days */}
              {days.map(({ day, intensity }) => {
                const isToday = day === today.getDate();
                
                let intensityClass = "";
                if (intensity === 1) intensityClass = "bg-accent/20";
                if (intensity === 2) intensityClass = "bg-accent/50";
                if (intensity === 3) intensityClass = "bg-accent";
                
                return (
                  <div 
                    key={day} 
                    className={`
                      w-full pt-[100%] relative rounded-sm cursor-pointer
                      transition-all duration-200 hover:scale-110
                      ${isToday ? 'ring-2 ring-accent' : ''}
                      ${intensity === 0 ? 'bg-muted/60 hover:bg-muted' : intensityClass}
                    `}
                  >
                    <div className="absolute inset-0 flex items-center justify-center text-xs">
                      {day}
                    </div>
                  </div>
                );
              })}
            </div>
            
            <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
              <span>Less</span>
              <div className="flex gap-1">
                <div className="w-3 h-3 bg-muted/60 rounded-sm"></div>
                <div className="w-3 h-3 bg-accent/20 rounded-sm"></div>
                <div className="w-3 h-3 bg-accent/50 rounded-sm"></div>
                <div className="w-3 h-3 bg-accent rounded-sm"></div>
              </div>
              <span>More</span>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="animate-fade-in">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Recent Activity</CardTitle>
          <Clock className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent className="px-0 max-h-[300px] overflow-y-auto">
          <div className="flex flex-col">
            {recentActivity.map((activity, index) => (
              <div 
                key={index} 
                className={`
                  px-4 py-3 flex flex-col gap-1 cursor-pointer transition-colors hover:bg-muted/50
                  ${index !== recentActivity.length - 1 ? 'border-b border-border/50' : ''}
                `}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{activity.action}</span>
                  <span className="text-xs text-muted-foreground">{activity.timestamp}</span>
                </div>
                <div className="text-sm text-muted-foreground">{activity.title}</div>
                
                {activity.tags && (
                  <div className="flex items-center gap-1 mt-1">
                    {activity.tags.map(tag => (
                      <div key={tag} className="text-xs bg-secondary/60 px-1.5 py-0.5 rounded-sm">
                        #{tag}
                      </div>
                    ))}
                  </div>
                )}
                
                {activity.folder && (
                  <div className="flex items-center gap-1 mt-1">
                    <div 
                      className={`
                        text-xs px-1.5 py-0.5 rounded-sm
                        bg-folder-${activity.folder.color} bg-opacity-50
                      `}
                    >
                      {activity.folder.name}
                    </div>
                  </div>
                )}
                
                {activity.with && (
                  <div className="flex items-center gap-1 mt-1 text-xs text-accent">
                    <Users className="h-3 w-3" /> Shared with {activity.with}
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
