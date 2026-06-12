/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { Globe, Mail, Sparkles, Code } from "lucide-react";

interface StickyHeaderProps {
  currentLang: "GR" | "EN";
  setLang: (lang: "GR" | "EN") => void;
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  onOpenAiAssistant: () => void;
}

export function StickyHeader({
  currentLang,
  setLang,
  activeSection,
  onNavigate,
  onOpenAiAssistant,
}: StickyHeaderProps) {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.scrollY / totalScroll) * 100);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const sections = [
    { id: "intro", label: currentLang === "GR" ? "Εισαγωγή" : "Intro" },
    { id: "discover", label: currentLang === "GR" ? "Discover (Ανακάλυψη)" : "Discover" },
    { id: "define", label: currentLang === "GR" ? "Define (Ορισμός)" : "Define" },
    { id: "develop", label: currentLang === "GR" ? "Develop (Ανάπτυξη)" : "Develop" },
    { id: "deliver", label: currentLang === "GR" ? "Deliver (Παράδοση)" : "Deliver" },
  ];

  return (
    <header className="sticky top-0 z-40 w-full h-[72px] bg-white/80 backdrop-blur-nav border-b border-gray-100 flex items-center justify-between px-6 md:px-12 transition-all">
      {/* Brand Logo */}
      <div className="flex items-center space-x-3">
        <div className="w-9 h-9 rounded-lg bg-brand-teal flex items-center justify-center text-white">
          <Code className="w-5 h-5" id="header-logo-icon" />
        </div>
        <div>
          <h1 className="font-display font-bold text-base text-text-primary tracking-tight leading-none">
            Junior Portfolio Pro
          </h1>
          <p className="text-xs font-sans font-medium text-brand-teal uppercase tracking-widest mt-0.5">
            Despina Zel • UX/UI
          </p>
        </div>
      </div>

      {/* Navigation Sections */}
      <nav className="hidden lg:flex items-center space-x-1" id="main-nav-bar">
        {sections.map((sec) => (
          <button
            key={sec.id}
            onClick={() => onNavigate(sec.id)}
            className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wider uppercase transition-all cursor-pointer ${
              activeSection === sec.id
                ? "bg-brand-indigo/10 text-brand-indigo-dark"
                : "text-text-secondary hover:text-text-primary hover:bg-black/5"
            }`}
            id={`nav-btn-${sec.id}`}
          >
            {sec.label}
          </button>
        ))}
      </nav>

      {/* Controls & Actions */}
      <div className="flex items-center space-x-3">
        {/* Language Selector Toggle */}
        <button
          onClick={() => setLang(currentLang === "GR" ? "EN" : "GR")}
          className="flex items-center space-x-2 px-3 py-1.5 rounded-lg border border-gray-200 hover:border-brand-teal text-xs font-semibold text-text-primary hover:bg-gray-50 transition-colors cursor-pointer"
          title="Change language / Αλλαγή γλώσσας"
          id="lang-toggle-btn"
        >
          <Globe className="w-3.5 h-3.5 text-brand-teal" />
          <span>{currentLang}</span>
        </button>

        {/* AI Assistant Call */}
        <button
          onClick={onOpenAiAssistant}
          className="flex items-center space-x-2 bg-gradient-to-r from-brand-teal to-brand-indigo text-white hover:from-brand-teal-dark hover:to-brand-indigo-dark px-4 py-2 rounded-lg text-xs font-bold tracking-wider uppercase shadow-diffused hover:shadow-hovered transition-all cursor-pointer"
          id="ask-ai-header-btn"
        >
          <Sparkles className="w-3.5 h-3.5 animate-pulse" />
          <span className="hidden sm:inline">
            {currentLang === "GR" ? "Ρώτησε AI Assistant" : "Ask AI Assistant"}
          </span>
          <span className="sm:hidden">AI</span>
        </button>
      </div>

      {/* Absolute Scroll Progress Indicator */}
      <div className="absolute bottom-0 left-0 h-[3px] bg-gradient-to-r from-brand-teal via-brand-indigo to-brand-teal transition-all duration-100 ease-out" style={{ width: `${scrollProgress}%` }} />
    </header>
  );
}
