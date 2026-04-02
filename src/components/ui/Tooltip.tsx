import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/src/lib/utils";

interface TooltipProps {
  content: string;
  children: React.ReactNode;
  className?: string;
  position?: "top" | "bottom" | "left" | "right";
}

export default function Tooltip({ content, children, className, position = "top" }: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);

  const positionClasses = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
    left: "right-full top-1/2 -translate-y-1/2 mr-2",
    right: "left-full top-1/2 -translate-y-1/2 ml-2",
  };

  return (
    <div
      className={cn("relative inline-block", className)}
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      onFocus={() => setIsVisible(true)}
      onBlur={() => setIsVisible(false)}
    >
      {children}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: position === "top" ? 5 : position === "bottom" ? -5 : 0, x: position === "left" ? 5 : position === "right" ? -5 : 0 }}
            animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className={cn(
              "absolute z-[110] w-max max-w-[200px] rounded-lg bg-gray-900 px-3 py-1.5 text-xs font-medium text-white shadow-xl pointer-events-none",
              positionClasses[position]
            )}
          >
            {content}
            <div
              className={cn(
                "absolute h-2 w-2 rotate-45 bg-gray-900",
                position === "top" && "bottom-[-4px] left-1/2 -translate-x-1/2",
                position === "bottom" && "top-[-4px] left-1/2 -translate-x-1/2",
                position === "left" && "right-[-4px] top-1/2 -translate-y-1/2",
                position === "right" && "left-[-4px] top-1/2 -translate-y-1/2"
              )}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
