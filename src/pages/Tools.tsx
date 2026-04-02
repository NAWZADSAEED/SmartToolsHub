import { Eraser, Search } from "lucide-react";
import { useState } from "react";
import ToolCard from "@/src/components/ui/ToolCard";

const allTools = [
  {
    title: "Background Remover",
    description: "Automatically remove backgrounds from your images using advanced AI technology.",
    icon: Eraser,
    href: "/tools/bg-remover",
    color: "bg-indigo-600 shadow-indigo-200",
    category: "Image",
  },
];

export default function Tools() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTools = allTools.filter(tool => 
    tool.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tool.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-12">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">All Tools</h1>
          <p className="mt-2 text-lg text-gray-600">Browse our collection of powerful online utilities.</p>
        </div>
        
        <div className="relative max-w-sm w-full">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search tools..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-xl leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
      </div>

      {filteredTools.length > 0 ? (
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filteredTools.map((tool, index) => (
            <ToolCard
              key={tool.title}
              title={tool.title}
              description={tool.description}
              icon={tool.icon}
              href={tool.href}
              color={tool.color}
              delay={index * 0.05}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-24">
          <p className="text-lg text-gray-500">No tools found matching your search.</p>
        </div>
      )}
    </div>
  );
}
