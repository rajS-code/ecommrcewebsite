"use client"

import React, { use } from "react";
import { Input } from "./ui/input";
import { IoIosSearch } from "react-icons/io";
import { BsCart2 } from "react-icons/bs";
import { IoLocationOutline } from "react-icons/io5";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Navbar = () => {
  const router = useRouter();

  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <>
      <nav className="h-16 w-screen bg-green-700 border-b-2 sticky top-0 z-50">
        <div className="w-full h-full px-4 shadow-md flex justify-around items-center gap-12">
          <h3 className="logo text-background font-bold text-3xl">XYZ</h3>
          <div className={user ? "searchbar w-2/3" : "searchbar w-2/4"}>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-background">
                <IoIosSearch className="text-2xl" />
              </span>

              <input
                type="text"
                placeholder="Search..."
                className="w-full border border-background rounded-md text-background placeholder-background pl-12 pr-4 py-3 focus:outline-none"
              />
            </div>
          </div>
          <div className="address flex items-center gap-3">
            <IoLocationOutline className="text-xl text-background" />
            <div>
              <h3 className="font-light text-background">Delivering to kolkata 7000001</h3>
              <h3 className="font-semibold text-background">Update location</h3>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <BsCart2 className="text-background" />
            <h3 className="text-background font-semibold text-xl">Cart</h3>
          </div>
          <h3 className="text-background font-semibold text-xl">Orders</h3>
          <div className="flex items-center gap-3">

            {user ? (
              <>
                <h3 className="text-background font-semibold text-xl">Hi, {user.name}</h3>
                <Button
                  variant="outline"
                  className="cursor-pointer border border-black"
                  onClick={() => {
                    localStorage.removeItem("user");
                    setUser(null);
                    router.push("/login");
                  }}
                >Logout</Button>
              </>
            ) : (<Button variant="outline" className="cursor-pointer border border-black" onClick={() => router.push("/login")}>
              Login
            </Button>
            )}
          </div>


        </div>
      </nav>
    </>
  );
};

export default Navbar;
