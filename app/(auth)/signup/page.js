"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import api from "@/lib/axios";

const signup = () => {
  const router = useRouter();
  const initialstate = ({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [form, setform] = useState(initialstate)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setform({ ...form, [name]: value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/auth/signup", form);
      console.log("Signup success:", res.data);
      alert("Account created!");
    } catch (error) {
      alert(error.response?.data?.error || "Signup failed");
    }
    setform(initialstate);
  }

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-background px-4">
        <Card className="w-full max-w-sm border-green-700">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">XYZ</CardTitle>
            <CardDescription>Create your account</CardDescription>
            <CardAction className="flex justify-center text-sm">
              Already have an account?
              <Button variant="link" className="px-1 py-0 h-auto" onClick={() => router.push("/login")}>
                Login
              </Button>
            </CardAction>
          </CardHeader>
          <CardContent>
            <form>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    className={cn("border-green-700")}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    className={cn("border-green-700")}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    required
                    className={cn("border-green-700")} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="confirm-password">Confirm Password</Label>
                  <Input
                    id="confirm-password"
                    type="password"
                    name="confirmPassword"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    required
                    className={cn("border-green-700")}
                  />
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex-col gap-2">
            <Button type="submit" onClick={handleSubmit} className="w-full bg-green-700">
              Sign Up
            </Button>
            <Button variant="outline" className="w-full border-green-700">
              Sign Up with Google
            </Button>
          </CardFooter>
        </Card>
      </div>
    </>
  );
};
export default signup;
