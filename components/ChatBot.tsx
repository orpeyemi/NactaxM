import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User, Minimize2 } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

interface Message {
  role: 'user' | 'model';
  text: string;
}

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: 'Hello! Welcome to NACTAX. How can I assist you with your tax or accounting needs today?' }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Load settings from local storage or defaults
  const getSystemInstruction = () => {
    const stored = localStorage.getItem('nactax_chat_prompt');
    return stored || "You are a helpful and professional customer support agent for NACTAX (Tax, Accounting & Business Support Services). Your goal is to assist clients with questions about personal and business tax returns, bookkeeping, payroll, business startup, and IRS issues. Be polite, concise, and encourage them to book a consultation or contact 614-699-0603 for specific advice. Do not provide specific legal or tax advice for their personal situation, but general information about services.";
  };

  const isChatEnabled = () => {
    const stored = localStorage.getItem('nactax_chat_enabled');
    return stored !== 'false'; // Default to true
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage = inputText;
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setInputText('');
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const systemInstruction = getSystemInstruction();

      // Convert history for context (simplified)
      const chatHistory = messages.map(m => ({
         role: m.role,
         parts: [{ text: m.text }]
      }));

      // We use generateContent here for a single turn response based on history + system instruction
      // Ideally we use chats.create, but simplified here for the component state
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: [
            ...chatHistory,
            { role: 'user', parts: [{ text: userMessage }]}
        ],
        config: {
          systemInstruction: systemInstruction,
        },
      });

      const botResponse = response.text || "I apologize, I'm having trouble connecting right now. Please call us at 614-699-0603.";
      
      setMessages(prev => [...prev, { role: 'model', text: botResponse }]);
    } catch (error) {
      console.error("Chat error:", error);
      setMessages(prev => [...prev, { role: 'model', text: "I'm sorry, something went wrong. Please try again later or contact our office directly." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!isChatEnabled()) return null;

  return (
    <>
      {/* Floating Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 bg-nactax-red text-white p-4 rounded-full shadow-lg hover:bg-nactax-darkRed transition-all z-50 animate-bounce-subtle"
          aria-label="Open Support Chat"
        >
          <MessageCircle size={28} />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className={`fixed bottom-6 right-6 w-80 md:w-96 bg-white rounded-xl shadow-2xl z-50 flex flex-col transition-all duration-300 ${isMinimized ? 'h-16' : 'h-[500px]'}`}>
          
          {/* Header */}
          <div className="bg-nactax-red text-white p-4 rounded-t-xl flex justify-between items-center shrink-0">
            <div className="flex items-center gap-2">
              <Bot size={20} />
              <span className="font-bold">NACTAX Support</span>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => setIsMinimized(!isMinimized)} className="hover:text-gray-200">
                <Minimize2 size={18} />
              </button>
              <button onClick={() => setIsOpen(false)} className="hover:text-gray-200">
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Chat Body */}
          {!isMinimized && (
            <>
              <div className="flex-1 overflow-y-auto p-4 bg-gray-50 space-y-4">
                {messages.map((msg, idx) => (
                  <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[80%] rounded-lg p-3 text-sm ${
                      msg.role === 'user' 
                        ? 'bg-nactax-red text-white rounded-br-none' 
                        : 'bg-white border border-gray-200 text-gray-800 rounded-bl-none shadow-sm'
                    }`}>
                      {msg.text}
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-white border border-gray-200 p-3 rounded-lg rounded-bl-none shadow-sm flex items-center gap-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="p-3 border-t border-gray-100 bg-white rounded-b-xl">
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyDown={handleKeyPress}
                    placeholder="Type your question..."
                    className="flex-1 border border-gray-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:border-nactax-red"
                  />
                  <button 
                    onClick={handleSendMessage}
                    disabled={isLoading || !inputText.trim()}
                    className="bg-nactax-red text-white p-2 rounded-full hover:bg-nactax-darkRed disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <Send size={18} />
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default ChatBot;
