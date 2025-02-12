import type React from "react";
import { motion } from "framer-motion";

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children, title }) => {
  return (
    <div className="min-h-screen flex items-center justify-center relative">
      <div className="coverImg bg-[url('/cover.jpeg')] absolute top-0 left-0 w-full h-full bg-cover bg-center z-0"></div>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className=" w-full max-w-md"
      >
        {/* <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          {title}
        </h1> */}
        {children}
      </motion.div>
    </div>
  );
};

export default AuthLayout;
