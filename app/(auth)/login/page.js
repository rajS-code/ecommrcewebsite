"use client";

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
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useState } from "react";
import api from "@/lib/axios";

const login = () => {
  const router = useRouter();

  const initialState = {
    email: "",
    password: "",
  };

  const [form, setform] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setform({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/auth/login", form);

      if (res.data.success) {
        const { token, user } = res.data;

        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));

        router.push("/");
      }
    } catch (error) {
      console.log("LOGIN ERROR:", error);
      console.log("RESPONSE:", error.response);
      alert(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-background px-4">
        <Card className="w-full max-w-sm border-green-700">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">XYZ</CardTitle>
            <CardDescription>Login to your account</CardDescription>
            <CardAction>
              <Button variant="link" onClick={() => router.push("/signup")}>
                Sign Up
              </Button>
            </CardAction>
          </CardHeader>
          <CardContent>
            <form>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    type="email"
                    onChange={handleChange}
                    name="email"
                    value={form.email}
                    placeholder="Enter your email"
                    className={cn("border-green-700")}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                  </div>
                  <Input
                    type="password"
                    onChange={handleChange}
                    name="password"
                    value={form.password}
                    className={cn("border-green-700")}
                    required
                  />
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline">
                    Forgot your password?
                  </a>
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex-col gap-2">
            <Button
              type="submit"
              onClick={handleSubmit}
              className="w-full bg-green-700">
              Login
            </Button>
            <Button variant="outline" className="w-full border-green-700">
              Login with Google
            </Button>
          </CardFooter>
        </Card>
      </div>
    </>
  );
};

export default login;
