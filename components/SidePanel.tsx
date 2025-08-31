// components/SidePanel.tsx  (CLIENT)
"use client";

import React from "react";
import Link from "next/link";

export default function SidePanel({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 transition-opacity duration-300 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* Drawer */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white dark:bg-gray-800 shadow-lg transform transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-6">
          <button
            onClick={onClose}
            className="mb-4 px-2 py-1 rounded bg-gray-200 dark:bg-gray-700"
          >
            Close
          </button>

          <nav>
            <ul className="flex flex-col gap-4 text-lg">
              <li>
                <Link href="/" onClick={onClose} className="block hover:text-orange-500">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/dashboard" onClick={onClose} className="block hover:text-orange-500">
                  Your posts
                </Link>
              </li>
              {/* add more links */}
            </ul>
          </nav>
        </div>
      </aside>
    </>
  );
}
