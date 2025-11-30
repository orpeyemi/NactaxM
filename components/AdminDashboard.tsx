import React, { useState, useEffect } from 'react';
import { X, Lock, Trash2, Save, MessageSquare, Settings } from 'lucide-react';
import { ContactFormSubmission } from '../types';

interface AdminDashboardProps {
  onClose: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onClose }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState<'inquiries' | 'settings'>('inquiries');
  const [inquiries, setInquiries] = useState<ContactFormSubmission[]>([]);
  
  // Settings State
  const [chatEnabled, setChatEnabled] = useState(true);
  const [systemPrompt, setSystemPrompt] = useState('');

  useEffect(() => {
    // Load data from local storage
    const storedInquiries = JSON.parse(localStorage.getItem('nactax_inquiries') || '[]');
    setInquiries(storedInquiries);

    const storedChatEnabled = localStorage.getItem('nactax_chat_enabled');
    setChatEnabled(storedChatEnabled !== 'false');

    const storedPrompt = localStorage.getItem('nactax_chat_prompt');
    setSystemPrompt(storedPrompt || "You are a helpful and professional customer support agent for NACTAX (Tax, Accounting & Business Support Services). Your goal is to assist clients with questions about personal and business tax returns, bookkeeping, payroll, business startup, and IRS issues. Be polite, concise, and encourage them to book a consultation or contact 614-699-0603 for specific advice. Do not provide specific legal or tax advice for their personal situation, but general information about services.");
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin') {
      setIsAuthenticated(true);
    } else {
      alert('Incorrect password');
    }
  };

  const handleDeleteInquiry = (id: string) => {
    const updated = inquiries.filter(inq => inq.id !== id);
    setInquiries(updated);
    localStorage.setItem('nactax_inquiries', JSON.stringify(updated));
  };

  const handleSaveSettings = () => {
    localStorage.setItem('nactax_chat_enabled', String(chatEnabled));
    localStorage.setItem('nactax_chat_prompt', systemPrompt);
    alert('Settings saved successfully!');
    // Ideally trigger a re-render or context update in ChatBot, but reload works for MVP
    window.location.reload(); 
  };

  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 bg-black/80 z-[100] flex items-center justify-center p-4">
        <div className="bg-white rounded-lg p-8 w-full max-w-md shadow-2xl">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              <Lock className="text-nactax-red" /> Admin Login
            </h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <X size={24} />
            </button>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-300 rounded p-2 focus:ring-2 focus:ring-nactax-red focus:outline-none"
                placeholder="Enter admin password"
              />
            </div>
            <button type="submit" className="w-full bg-nactax-red text-white py-2 rounded font-bold hover:bg-nactax-darkRed transition">
              Login
            </button>
            <p className="text-xs text-center text-gray-400 mt-2">Hint: password is 'admin'</p>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full max-w-4xl h-[80vh] flex flex-col shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="bg-gray-900 text-white p-4 flex justify-between items-center shrink-0">
          <div className="flex items-center gap-3">
             <div className="bg-nactax-red px-2 py-1 rounded font-bold text-sm">NACTAX</div>
             <h2 className="text-xl font-bold">Admin Dashboard</h2>
          </div>
          <button onClick={onClose} className="hover:bg-white/20 p-2 rounded-full transition">
            <X size={20} />
          </button>
        </div>

        {/* Layout */}
        <div className="flex flex-1 overflow-hidden">
          
          {/* Sidebar */}
          <div className="w-48 bg-gray-100 border-r border-gray-200 p-4 space-y-2 shrink-0 hidden md:block">
            <button 
              onClick={() => setActiveTab('inquiries')}
              className={`w-full text-left px-4 py-2 rounded flex items-center gap-2 ${activeTab === 'inquiries' ? 'bg-white shadow text-nactax-red font-bold' : 'text-gray-600 hover:bg-gray-200'}`}
            >
              <MessageSquare size={16} /> Inquiries
            </button>
            <button 
              onClick={() => setActiveTab('settings')}
              className={`w-full text-left px-4 py-2 rounded flex items-center gap-2 ${activeTab === 'settings' ? 'bg-white shadow text-nactax-red font-bold' : 'text-gray-600 hover:bg-gray-200'}`}
            >
              <Settings size={16} /> Settings
            </button>
          </div>

          {/* Main Content */}
          <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
            
            {/* Mobile Tab Select */}
            <div className="md:hidden flex gap-2 mb-4">
              <button 
                onClick={() => setActiveTab('inquiries')}
                className={`flex-1 py-2 rounded text-sm font-bold ${activeTab === 'inquiries' ? 'bg-nactax-red text-white' : 'bg-gray-200 text-gray-700'}`}
              >
                Inquiries
              </button>
              <button 
                onClick={() => setActiveTab('settings')}
                className={`flex-1 py-2 rounded text-sm font-bold ${activeTab === 'settings' ? 'bg-nactax-red text-white' : 'bg-gray-200 text-gray-700'}`}
              >
                Settings
              </button>
            </div>

            {/* Inquiries Tab */}
            {activeTab === 'inquiries' && (
              <div>
                <h3 className="text-2xl font-serif text-gray-800 mb-6 font-bold">Web Inquiries</h3>
                {inquiries.length === 0 ? (
                  <div className="text-center py-12 text-gray-500 bg-white rounded-lg border border-dashed border-gray-300">
                    No inquiries found. Submissions from the contact form will appear here.
                  </div>
                ) : (
                  <div className="space-y-4">
                    {inquiries.slice().reverse().map((inq) => (
                      <div key={inq.id} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h4 className="font-bold text-gray-900">{inq.name}</h4>
                            <a href={`mailto:${inq.email}`} className="text-sm text-blue-600 hover:underline">{inq.email}</a>
                          </div>
                          <div className="text-right">
                            <span className="text-xs text-gray-400 block">{new Date(inq.date).toLocaleDateString()}</span>
                            <button 
                              onClick={() => handleDeleteInquiry(inq.id)}
                              className="text-red-400 hover:text-red-600 mt-2 p-1"
                              title="Delete Inquiry"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>
                        <div className="bg-gray-50 p-3 rounded text-sm text-gray-700">
                          {inq.message}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Settings Tab */}
            {activeTab === 'settings' && (
              <div>
                <h3 className="text-2xl font-serif text-gray-800 mb-6 font-bold">Functionality Settings</h3>
                
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 space-y-6">
                  
                  {/* Chatbot Toggle */}
                  <div className="flex items-center justify-between pb-6 border-b border-gray-100">
                    <div>
                      <h4 className="font-bold text-gray-900">Enable AI Chatbot</h4>
                      <p className="text-sm text-gray-500">Show the support chat widget on the website.</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={chatEnabled} 
                        onChange={(e) => setChatEnabled(e.target.checked)} 
                        className="sr-only peer" 
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-100 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-nactax-green"></div>
                    </label>
                  </div>

                  {/* System Prompt */}
                  <div>
                    <h4 className="font-bold text-gray-900 mb-2">Chatbot System Instructions</h4>
                    <p className="text-sm text-gray-500 mb-2">Define how the AI should behave and what knowledge it has.</p>
                    <textarea 
                      value={systemPrompt}
                      onChange={(e) => setSystemPrompt(e.target.value)}
                      rows={8}
                      className="w-full border border-gray-300 rounded p-3 text-sm focus:ring-2 focus:ring-nactax-red focus:outline-none"
                    ></textarea>
                  </div>

                  <button 
                    onClick={handleSaveSettings}
                    className="flex items-center gap-2 bg-nactax-red text-white px-6 py-2 rounded font-bold hover:bg-nactax-darkRed transition"
                  >
                    <Save size={18} /> Save Changes
                  </button>

                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
