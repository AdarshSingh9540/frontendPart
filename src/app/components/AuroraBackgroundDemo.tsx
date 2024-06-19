"use client";

import { motion } from "framer-motion";
import React from "react";
import { AuroraBackground } from "../components/ui/aurora-background";
import { useRouter } from 'next/navigation'; 
import { Button } from "../components/ui/moving-border";


export function AuroraBackgroundDemo() {
  const router = useRouter();

  const handleSignUp = async () => {
    router.push("./signup")
}

  return (
    <AuroraBackground className="bg-black">
      <motion.div
        initial={{ opacity: 0.0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="relative flex flex-col gap-4 items-center justify-center px-4"
      >
        <div className="text-3xl md:text-7xl font-bold text-white text-center">
        Dive into Knowledge,
        </div>
        <div className="font-extralight text-base md:text-4xl text-white py-4">
        Explore Every Topic!
        </div>
        <button 
        onClick={handleSignUp}
        className="bg-white dark:bg-black rounded-full w-fit text-black dark:text-white px-4 py-2">
          Sign Up
        </button>
      </motion.div>
    </AuroraBackground>
  );
}
