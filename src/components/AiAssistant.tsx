/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useRef, useEffect } from "react";
import { MessageSquare, Send, X, Bot, Sparkles, User, HelpCircle } from "lucide-react";
import { ChatMessage } from "../types";

interface AiAssistantProps {
  currentLang: "GR" | "EN";
  isOpen: boolean;
  onClose: () => void;
}

export function AiAssistant({ currentLang, isOpen, onClose }: AiAssistantProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Suggested questions based on language to provide high usability!
  const suggestions = currentLang === "GR" ? [
    "Ποιο ήταν το αποτέλεσμα της έρευνας;",
    "Ποιο είναι το email της Δέσποινας;",
    "Τι είπε η χρήστης Χριστίνα (Christina);",
    "Πώς βοήθησε η μέθοδος Double Diamond;"
  ] : [
    "What were the research findings?",
    "What is Despina's contact email?",
    "Tell me about Christina's quote.",
    "How was Double Diamond used?"
  ];

  // Auto scroll
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  // Welcome message upon opening
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          id: "welcome",
          sender: "ai",
          text: currentLang === "GR" 
            ? "Γεια σας! Είμαι ο UX AI Assistant της Δέσποινας. Μπορώ να απαντήσω σε ερωτήσεις σχετικά με την έρευνα χρήσης του 'Fluffy Care', τις σχεδιαστικές της αποφάσεις ή πώς να επικοινωνήσετε μαζί της. Τι θα θέλατε να μάθετε;"
            : "Hello! I am Despina's UX AI Copilot. I can answer any questions about her 'Fluffy Care' case study, the Double Diamond framework, or how to get in touch with her. What can I help you find today?",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }
  }, [isOpen, currentLang]);

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: Math.random().toString(),
      sender: "user",
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...messages, userMsg] })
      });

      if (!response.ok) {
        throw new Error("API return failure");
      }

      const data = await response.json();
      
      const aiMsg: ChatMessage = {
        id: Math.random().toString(),
        sender: "ai",
        text: data.text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, aiMsg]);
    } catch (error) {
      console.error("Failed to query Gemini assistant:", error);
      
      const errorMsg: ChatMessage = {
        id: Math.random().toString(),
        sender: "ai",
        text: currentLang === "GR"
          ? "Ωχ! Παρουσιάστηκε ένα σφάλμα κατά τη σύνδεση με τον AI Server. Μπορείτε να στείλετε email απευθείας στη Δέσποινα στο despinazel96@gmail.com!"
          : "Oops! I encountered an error communicating with the AI service. You can message Despina directly at despinazel96@gmail.com!",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-y-0 right-0 w-full sm:w-[420px] bg-white border-l border-gray-150 shadow-2xl z-50 flex flex-col transition-transform duration-300 transform translate-x-0"
      id="ai-assistant-sidebar"
    >
      {/* Sidebar Header */}
      <div className="p-4 bg-gradient-to-r from-brand-teal to-brand-indigo text-white flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
            <Bot className="w-5 h-5 text-white animate-pulse" />
          </div>
          <div>
            <h3 className="font-display font-bold text-sm tracking-tight">
              Despina UX Assistant (AI)
            </h3>
            <p className="text-xs text-white/80 font-sans">
              Powered by Gemini 3.5-flash
            </p>
          </div>
        </div>
        <button 
          onClick={onClose}
          className="p-1 rounded-full hover:bg-white/10 text-white transition-colors cursor-pointer"
          id="close-chat-sidebar-btn"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Messages Stream */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-gray-50 flex flex-col" ref={scrollRef} id="chat-messages-container">
        {messages.map((msg) => (
          <div 
            key={msg.id}
            className={`flex items-start space-x-2.5 max-w-[85%] ${
              msg.sender === "user" ? "self-end flex-row-reverse space-x-reverse" : "self-start"
            }`}
          >
            {/* Avatar block */}
            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs shrink-0 ${
              msg.sender === "user" ? "bg-brand-indigo text-white" : "bg-brand-teal text-white"
            }`}>
              {msg.sender === "user" ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
            </div>

            {/* Bubble block */}
            <div className="space-y-1">
              <div className={`rounded-2xl p-3 text-xs leading-relaxed shadow-sm ${
                msg.sender === "user" 
                  ? "bg-brand-indigo text-white rounded-tr-none" 
                  : "bg-white text-text-primary border border-gray-100 rounded-tl-none whitespace-pre-wrap"
              }`}>
                {msg.text}
              </div>
              <p className="text-xs text-text-secondary text-right px-1 font-mono">
                {msg.timestamp}
              </p>
            </div>
          </div>
        ))}

        {/* Dynamic Typing Indicator */}
        {isLoading && (
          <div className="flex items-center space-x-2 bg-white/80 py-2.5 px-4 rounded-xl border border-gray-100 max-w-[120px] self-start shadow-sm">
            <span className="w-2 h-2 rounded-full bg-brand-teal animate-bounce" />
            <span className="w-2 h-2 rounded-full bg-brand-indigo animate-bounce [animation-delay:0.2s]" />
            <span className="w-2 h-2 rounded-full bg-brand-teal animate-bounce [animation-delay:0.4s]" />
          </div>
        )}
      </div>

      {/* Suggested Questions Section */}
      <div className="p-3 bg-white border-t border-gray-100 space-y-2">
        <span className="text-xs font-sans font-bold text-text-secondary uppercase tracking-wider flex items-center space-x-1">
          <HelpCircle className="w-3 h-3 text-brand-teal" />
          <span>{currentLang === "GR" ? "Γρηγορες Ερωτησεις:" : "Quick Suggestions:"}</span>
        </span>
        <div className="flex flex-wrap gap-1.5">
          {suggestions.map((sug, i) => (
            <button
              key={i}
              onClick={() => handleSendMessage(sug)}
              className="text-xs text-text-primary hover:text-brand-indigo bg-bg-subtle hover:bg-brand-indigo/10 border border-gray-200 hover:border-brand-indigo/35 px-2.5 py-1.5 rounded-full transition-all text-left cursor-pointer font-medium"
              id={`quick-sug-${i}`}
            >
              {sug}
            </button>
          ))}
        </div>
      </div>

      {/* Bottom Entry Field Form */}
      <form 
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage(inputText);
        }}
        className="p-3 bg-white border-t border-gray-100 flex items-center space-x-2"
      >
        <input 
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder={currentLang === "GR" ? "Γράψτε ένα μήνυμα..." : "Type your query..."}
          className="flex-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:bg-white focus:border-brand-teal focus:ring-1 focus:ring-brand-teal outline-none transition-all placeholder:text-gray-400 font-medium"
          id="chat-input-text-field"
        />
        <button 
          type="submit"
          disabled={!inputText.trim() || isLoading}
          className="w-8.5 h-8.5 rounded-xl bg-brand-teal hover:bg-brand-teal-dark disabled:bg-gray-200 text-white disabled:text-gray-400 transition-colors flex items-center justify-center cursor-pointer shrink-0"
          id="submit-chat-msg-btn"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}
