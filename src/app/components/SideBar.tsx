
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  HomeIcon,
  AcademicCapIcon,
  
} from "@heroicons/react/24/outline";


export default function Sidebar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { name: "Home", href: "/", icon: HomeIcon },
   
    { name: "Students", href: "/students", icon: AcademicCapIcon   },
    
  ];

  return (
    <>
      {/* Mobile menu button */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-[#FEAF00] text-white"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
      >
        {mobileMenuOpen ? "✕" : "☰"}
      </button>

      {/* Sidebar */}
      <div
        className={`w-64 bg-[#F2EAE1] shadow-lg fixed h-full z-40 transition-transform duration-300 ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col items-center">
            <h1 className="text-2xl font-bold text-black text-center">CRUD OPERATIONS</h1>
            {/* <div className="mt-4 text-center">
              <p className="font-medium">Karthi Madesh</p>
              <p className="text-sm text-[#F8D442]">Admin</p>
            </div> */}
          </div>
        </div>

        <nav className="p-4">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={`flex items-center p-3 rounded-md ${
                    pathname === item.href
                      ? "bg-[#FEAF00] text-blue-600"
                      : "text-black hover:bg-[#f7f6f5]"
                  }`}
                >
                  <item.icon className="h-5 w-5" />
                  <span className="ml-3 font-medium">{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Overlay for mobile */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
    </>
  );
}
