import type React from "react";
import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "../ui/label";
import { useToast } from "@/hooks/use-toast";
import AuthService from "@/auth/AuthService";
import { useNavigate } from "react-router-dom";
import { Eye, EyeClosed } from "lucide-react";

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();


    try {
      // Simulate login
      console.log("Logging in with:", { email, password, rememberMe });

      // const res = await axios.post(`${BACKEND_URL}/auth/login`, {
      //   email,
      //   password,
      // });

      const res = await AuthService.login(email, password, rememberMe);
      setIsLoggedIn(true);

      console.log(res);

      // if (res.status === 200) {
      //   console.log("Login successful");
      // }

      navigate("/authenticated");
      navigate(0);
    } catch (error: any) {
      console.error("Error:", error);
      setError("Invalid email or password");
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
        <CardTitle className="text-2xl">Melodyverse Login</CardTitle>
        <CardDescription>Enter your email and password to login to melodyverse</CardDescription>
      </CardHeader>
      <CardContent>
    {/* <div className="max-w-md mx-auto"> */}
      <form onSubmit={handleSubmit}>
        <Label htmlFor="email" className="mb-2">
          Email
        </Label>
        <Input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          // error={errors.email}
          required
        />
        <div className="relative mt-8">
          <Label htmlFor="password" className="mt-2">
            Password
          </Label>
          <Input
            className=""
            type={showPassword ? "text" : "password"}
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="button"
              className="absolute right-3 top-1/2
             cursor-pointer
             text-gray-500"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeClosed/>  : <Eye/>}
          </button>

          <div className="absolute right-0 top-0">
            <a
              href="/forgot-password"
              className="text-sm text-blue-600 hover:underline"
            >
              Forgot Password?
            </a>
          </div>
        </div>
        <div className="mt-6">
          <input
            type="checkbox"
            className="peer h-4 w-4 shrink-0 rounded-sm border border-primary shadow focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
            id="remember-me"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
          />
          <Label htmlFor="remember-me" className="mt-2 ml-2">
            Remember me
          </Label>
        </div>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mb-4"
        >
          <Button type="submit" className="w-full mt-4">
            Log In
          </Button>
        </motion.div>
        <div>
          <a href="/signup" className="text-sm text-blue-600 hover:underline">
            Don't have an account? Sign up
          </a>
        </div>
      </form>
        {/* </div> */}
        </CardContent>
      </Card>
  );
};

export default LoginForm;
