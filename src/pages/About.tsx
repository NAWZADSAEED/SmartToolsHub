import { motion } from "motion/react";
import { CheckCircle2, Shield, Zap, Heart } from "lucide-react";

export default function About() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">About SmartTools Hub</h1>
        <p className="mt-6 text-lg leading-8 text-gray-600">
          We believe that powerful digital tools should be accessible to everyone. SmartTools Hub was created to simplify common digital tasks, from document conversion to image editing, using the latest technology.
        </p>
      </div>

      <div className="mt-20 grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="rounded-2xl bg-gray-50 p-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 flex items-center">
            <Shield className="mr-3 h-6 w-6 text-blue-600" />
            Our Mission
          </h2>
          <p className="mt-4 text-gray-600 leading-relaxed">
            Our mission is to provide high-quality, secure, and free online tools that empower users to manage their digital lives more efficiently. We prioritize privacy and speed in everything we build.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="rounded-2xl bg-gray-50 p-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 flex items-center">
            <Heart className="mr-3 h-6 w-6 text-red-500" />
            User First
          </h2>
          <p className="mt-4 text-gray-600 leading-relaxed">
            We design our tools with simplicity in mind. No complex interfaces, no hidden fees, and no unnecessary steps. Just upload, process, and download.
          </p>
        </motion.div>
      </div>

      <div className="mt-20">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Why Choose Us?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: "100% Free", desc: "All our tools are free to use with no hidden costs." },
            { title: "No Registration", desc: "Start using our tools immediately without creating an account." },
            { title: "Privacy Guaranteed", desc: "We don't store your files. They are deleted after processing." },
          ].map((item, i) => (
            <div key={i} className="flex items-start">
              <CheckCircle2 className="mt-1 h-5 w-5 text-green-500 flex-shrink-0" />
              <div className="ml-4">
                <h3 className="font-bold text-gray-900">{item.title}</h3>
                <p className="mt-1 text-gray-600">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
