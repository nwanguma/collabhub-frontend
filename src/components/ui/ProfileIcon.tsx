"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";

import { signOut } from "next-auth/react";
import { handleSignOut } from "@/store";
import AvatarComponent from "./AvatarComponent";

export default function ProfileIcon({ avatar }: { avatar?: string | null }) {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setIsProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={profileRef}>
      <AvatarComponent
        avatar={avatar}
        className="w-4 h-4 lg:w-6 lg:h-6 cursor-pointer"
        handleOnClick={() => setIsProfileOpen(!isProfileOpen)}
      />
      {isProfileOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 shadow-lg rounded-lg z-50">
          <div className="p-4">
            <div className="pb-2 border-b border-gray-200 flex space-x-1 items-center">
              <p className="text-sm font-bold">Profile</p>
            </div>
            <ul className="mt-2 text-xs-sm text-gray-600 space-y-2 font-app-normal">
              <li className="p-2 bg-slate-50 rounded-lg flex items-start space-x-2">
                <Link
                  href="/dashboard/me/projects"
                  className="text-gray-800 cursor-pointer flex items-center space-x-2"
                >
                  {/* <Image src="/icons/bin.svg" alt="" width={15} height={15} /> */}
                  <span>My Projects</span>
                </Link>
              </li>
              <li className="p-2 bg-slate-50 rounded-lg flex items-start space-x-2">
                <Link
                  href="/dashboard/me"
                  className="text-gray-800 cursor-pointer"
                >
                  View Profile
                </Link>
              </li>
              <li
                className="p-2 bg-slate-50 rounded-lg flex items-start space-x-2 justify-between"
                onClick={() => {
                  localStorage.removeItem("initialDataFetched");

                  signOut();
                  handleSignOut();
                }}
              >
                <span className="flex flex-col space-y-1 cursor-pointer">
                  <span className="text-red-600">Logout</span>
                </span>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
