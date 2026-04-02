import { motion } from "motion/react";
import { ArrowRight, Eraser, Zap, Shield, Globe } from "lucide-react";
import { Link } from "react-router-dom";
import ToolCard from "@/src/components/ui/ToolCard";
import { cn } from "@/src/lib/utils";

const features = [
  {
    title: "Fast Processing",
    description: "Our high-performance servers ensure your files are processed in seconds.",
    icon: Zap,
    color: "text-yellow-500 bg-yellow-50",
  },
  {
    title: "Secure & Private",
    description: "Your files are encrypted and automatically deleted after processing.",
    icon: Shield,
    color: "text-green-500 bg-green-50",
  },
  {
    title: "Universal Access",
    description: "Access our tools from any device, anywhere in the world.",
    icon: Globe,
    color: "text-blue-500 bg-blue-50",
  },
];

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                Powerful Tools for Your <span className="text-blue-600">Digital Workflow</span>
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                SmartTools Hub provides essential online utilities to help you work smarter, not harder. Edit images and more—all in one place.
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <Link
                  to="/tools"
                  className="rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-200 hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-all"
                >
                  Explore All Tools
                </Link>
                <Link to="/about" className="text-sm font-semibold leading-6 text-gray-900 flex items-center">
                  Learn more <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
        
        {/* Background Decoration */}
        <div className="absolute top-0 -z-10 h-full w-full bg-white">
          <div className="absolute bottom-auto left-auto right-0 top-0 h-[500px] w-[500px] -translate-x-[30%] translate-y-[20%] rounded-full bg-[rgba(173,109,244,0.5)] opacity-50 blur-[80px]"></div>
          <div className="absolute bottom-0 left-0 right-auto top-auto h-[500px] w-[500px] -translate-y-[20%] translate-x-[30%] rounded-full bg-[rgba(100,149,237,0.5)] opacity-50 blur-[80px]"></div>
        </div>
      </section>

      {/* Tools Preview */}
      <section className="bg-gray-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Popular Tools</h2>
            <p className="mt-4 text-lg text-gray-600">Start using our most popular utilities right away.</p>
          </div>
          <div className="flex justify-center max-w-6xl mx-auto">
            <ToolCard
              title="Background Remover"
              description="Automatically remove backgrounds from your images using advanced AI technology."
              icon={Eraser}
              href="/tools/bg-remover"
              color="bg-indigo-600 shadow-indigo-200"
              delay={0.1}
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-3 lg:gap-x-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex flex-col items-start"
              >
                <div className={cn("rounded-lg p-3 mb-6", feature.color)}>
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">{feature.title}</h3>
                <p className="mt-4 text-base leading-7 text-gray-600">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
