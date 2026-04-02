import { Github, Twitter, Linkedin, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <span className="text-xl font-bold tracking-tight text-gray-900">
              SmartTools<span className="text-blue-600">Hub</span>
            </span>
            <p className="mt-4 text-gray-500 max-w-xs">
              Empowering your digital workflow with powerful, free, and easy-to-use online utilities.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Tools</h3>
            <ul className="mt-4 space-y-4">
              <li><a href="/tools/bg-remover" className="text-base text-gray-500 hover:text-gray-900">Background Remover</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Connect</h3>
            <div className="mt-4 flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-gray-500"><Twitter className="h-6 w-6" /></a>
              <a href="#" className="text-gray-400 hover:text-gray-500"><Github className="h-6 w-6" /></a>
              <a href="#" className="text-gray-400 hover:text-gray-500"><Linkedin className="h-6 w-6" /></a>
              <a href="#" className="text-gray-400 hover:text-gray-500"><Mail className="h-6 w-6" /></a>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-base text-gray-400">&copy; 2026 SmartTools Hub. All rights reserved.</p>
          <div className="mt-4 md:mt-0 flex space-x-6">
            <a href="#" className="text-sm text-gray-400 hover:text-gray-500">Privacy Policy</a>
            <a href="#" className="text-sm text-gray-400 hover:text-gray-500">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
