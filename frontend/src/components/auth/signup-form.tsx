"use client";

import type React from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "../ui/label";
import { Eye, EyeOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import AuthService from "@/auth/AuthService";
import { useNavigate, Link } from "react-router-dom";

const SignupForm: React.FC = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [terms, setTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!username || !email || !password || !confirmPassword) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please fill in all the fields.",
      })
      return;
    }

    if (password !== confirmPassword) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Passwords do not match.",
      })
      return;
    }

    // validate email format using regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please enter a valid email address.",
      })
      return;
    }

    if (!terms) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please accept the terms and conditions.",
      });
      return;
    }

    try {

      console.log("Signing up with:", { username, email, password });

      const res = await AuthService.signup(username, email, password);

      console.log(res);

      alert(
        "Welcome to MelodyVerse! Check your email for a confirmation link."
      );

      navigate("/authenticated");
      navigate(0);
    } catch (error: any) {
      console.error("Error:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.response.data.error,
      })
    }
  };

  return (
    <Card className="relative shadow-2xl">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your email and password to login
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Label htmlFor="password" className="mt-2">
            Username
          </Label>
          <Input
            type="text"
            id="name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <Label htmlFor="email" className="mt-2">
            Email
          </Label>
          <Input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <div className="relative">
            <Label htmlFor="password" className="mt-2">
              Password
            </Label>
            <Input
              type={showPassword ? "text" : "password"}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="absolute cursor-pointer right-3 top-1/2 text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff className="h-6 w-6" />
              ) : (
                <Eye className="h-6 w-6" />
              )}
            </button>
          </div>
          <Label htmlFor="confirm-password" className="mt-2">
            Confirm Password
          </Label>
          <Input
            type="password"
            id="confirm-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <div className="mt-4">
          <input
            type="checkbox"
            id="terms"
            className="peer h-4 w-4 shrink-0 rounded-sm border border-primary shadow focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
            checked={terms}
            onChange={() => setTerms(!terms)}
          />
            <Label htmlFor="terms" className="mt-2 ml-2">I agree to the
              {" "}
              <Link to="/terms-and-conditions" className="underline">
              terms and
                conditions
              </Link>
            </Label>
            </div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-6"
          >
            <Button type="submit" className="w-full">
              Sign Up
            </Button>
          </motion.div>
        </form>
      </CardContent>
    </Card>
  );
};

export default SignupForm;
