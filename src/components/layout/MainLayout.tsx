
import React from "react";
import { TopBar } from "./TopBar";

interface MainLayoutProps {
  children: React.ReactNode;
  sidebar?: React.ReactNode; // Add this optional sidebar prop
}

export function MainLayout({ children, sidebar }: MainLayoutProps) {
  return (
    <div className="flex h-screen overflow-hidden">
      {sidebar}
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar />
        <main className="flex-1 overflow-auto p-4">{children}</main>
      </div>
    </div>
  );
}
