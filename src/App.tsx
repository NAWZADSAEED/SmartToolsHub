/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "@/src/components/layout/Navbar";
import Footer from "@/src/components/layout/Footer";
import Home from "@/src/pages/Home";
import Tools from "@/src/pages/Tools";
import About from "@/src/pages/About";
import BackgroundRemover from "@/src/pages/tools/BackgroundRemover";
import ErrorBoundary from "@/src/components/ErrorBoundary";

export default function App() {
  return (
    <ErrorBoundary>
      <Router>
        <div className="flex min-h-screen flex-col bg-white">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/tools" element={<Tools />} />
              <Route path="/about" element={<About />} />
              <Route path="/tools/bg-remover" element={<BackgroundRemover />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </ErrorBoundary>
  );
}

