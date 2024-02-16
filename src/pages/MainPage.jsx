import React from 'react';
import Nevbar from "@/components/Nevbar";
import HomePage from "@/components/UserInterFace/HomePage";
import { getServerSession } from "next-auth";
import { authOptions } from "../app/api/auth/[...nextauth]/route";

const getCategory = async () => {
  const res = await fetch("http://localhost:3000/api/category", {
    cache: "no-store",
  });
  return res.json();
};

const getMenu = async () => {
  const res = await fetch("http://localhost:3000/api/menu", {
    cache: "no-store",
  });
  return res.json();
};

const MainPage = async () => {
  const category = await getCategory();
  const menu = await getMenu();
  const session = await getServerSession(authOptions);
  console.log("Session", session?.user?.email);

  return (
    <>
      <div className="flex h-screen justify-center">
        <div
          className={`md:w-2/6 ${
            // Use absolute positioning for screens smaller than md
            session?.user?.email === "abdi@gmail.com" ? "" : ""
          } transition-transform ${
            // Remove absolute positioning for screens md and above
            session?.user?.email === "abdi@gmail.com" ? "-translate-x-full" : "hidden"
          } sm:translate-x-0 sm:w-full sm:bg-red-500`}
        >
          {/* {session?.role === "abdi@gmail.com" && (
          <span className="lg:hidden md:visible font-bold">X</span>
        )} */}
          <Nevbar />
        </div>
        <div className="w-[400px] bg-gray-100 overflow-y-auto shadow-2xl">
          <div className="">
            <HomePage category={category} menu={menu} />
          </div>
        </div>
      </div>
    </>
  );
};

export default MainPage;
