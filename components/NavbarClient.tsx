// components/NavbarClient.tsx  (CLIENT)
"use client";

import { useState } from "react";
import SidePanel from "./SidePanel";

export default function NavbarClient({ sessionId }: { sessionId: string | undefined }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Hamburger button */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open menu"
        className="p-2 rounded-md bg-gray-200 dark:bg-gray-700 hover:scale-95"
      >
        {/* simple 3-line hamburger */}
        <span className="block w-5 h-[2px] bg-black dark:bg-white mb-[6px]"></span>
        <span className="block w-5 h-[2px] bg-black dark:bg-white mb-[6px]"></span>
        <span className="block w-5 h-[2px] bg-black dark:bg-white"></span>
      </button>

      {/* Side panel component */}
      <SidePanel sessionId={sessionId} open={open} onClose={() => setOpen(false)} />
    </>
  );
}
