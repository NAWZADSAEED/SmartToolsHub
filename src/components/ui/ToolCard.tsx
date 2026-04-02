import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { ArrowRight, LucideIcon } from "lucide-react";
import { cn } from "@/src/lib/utils";

interface ToolCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  href: string;
  color: string;
  delay?: number;
  key?: string;
}

export default function ToolCard({ title, description, icon: Icon, href, color, delay = 0 }: ToolCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      whileHover={{ y: -5 }}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 transition-all hover:border-blue-200 hover:shadow-xl hover:shadow-blue-50"
    >
      <div className={cn("mb-4 flex h-12 w-12 items-center justify-center rounded-xl text-white shadow-lg", color)}>
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="text-xl font-bold text-gray-900">{title}</h3>
      <p className="mt-2 flex-grow text-gray-500 leading-relaxed">
        {description}
      </p>
      <Link
        to={href}
        className="mt-6 flex items-center font-semibold text-blue-600 transition-colors group-hover:text-blue-700"
      >
        Get Started
        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
      </Link>
    </motion.div>
  );
}
