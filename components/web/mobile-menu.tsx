"use client";

import { useState } from "react";
import { LuMenu, LuX } from "react-icons/lu";

export default function MobileMenu() {
  const [open, setOpen] = useState(false);

  return (
    <div className="sm:hidden">
      <button
        onClick={() => setOpen(!open)}
        className="h-8 w-8 rounded-md border flex items-center justify-center text-muted-foreground"
      >
        {open ? <LuX size={18} /> : <LuMenu size={18} />}
      </button>

      {open && (
        <div className="absolute top-12 left-0 w-full bg-background border-t shadow-md flex flex-col p-4 gap-3">
          <a href="/dashboard" className="text-sm font-medium">
            Dashboard
          </a>
          <a href="/settings" className="text-sm font-medium">
            Settings
          </a>
          <a href="/profile" className="text-sm font-medium">
            Profile
          </a>
        </div>
      )}
    </div>
  );
}
