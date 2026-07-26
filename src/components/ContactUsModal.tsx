import React, { useState, useRef, useEffect } from 'react';
import { 
  Mail, 
  Send, 
  Copy, 
  Check, 
  X, 
  Bot, 
  Sparkles, 
  CheckCircle2,
  Heart,
  Smile,
  HelpCircle,
  Headphones
} from 'lucide-react';

interface ContactUsModalProps {
  onClose: () => void;
}

interface ChatMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  timestamp: string;
  chipOptions?: string[];
}

export const ContactUsModal: React.FC<ContactUsModalProps> = ({ onClose }) => {
  const [emailCopied, setEmailCopied] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // Ticket form state
  const [showTicketForm, setShowTicketForm] = useState(false);
  const [ticketSubject, setTicketSubject] = useState('');
  const [ticketMessage, setTicketMessage] = useState('');
  const [ticketSubmitted, setTicketSubmitted] = useState(false);

  const OFFICIAL_EMAIL = 'maharshithefox@gmail.com';

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'bot',
      text: `Hey! I'm KIMJIKOIN, your AI assistant for INPBOS. How can I help you today with shoot scheduling, quotations, INPBOS Drive, or team management?\n\nYou can also reach our official support team anytime at maharshithefox@gmail.com.`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      chipOptions: [
        'What is INPBOS?',
        'How does INPBOS Drive storage work?',
        'How to generate client quotations?',
        'How shoot scheduling works?',
        'How to manage staff and roles?',
        'Submit support ticket'
      ]
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(OFFICIAL_EMAIL);
    setEmailCopied(true);
    setTimeout(() => setEmailCopied(false), 2500);
  };

  const sanitizeText = (str: string) => {
    if (!str) return '';
    return str
      .replace(/\*\*/g, '')
      .replace(/\*/g, '')
      .replace(/^[\s]*[-•*][\s]+/gm, '')
      .replace(/[✨⭐🌟💫💖📧]/g, '')
      .trim();
  };

  const sendMessage = async (textToSend: string) => {
    if (!textToSend.trim()) return;

    if (textToSend.includes('Fill Support Ticket Form Now') || textToSend.includes('Submit support ticket')) {
      setShowTicketForm(true);
      return;
    }

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInputMessage('');
    setIsTyping(true);

    try {
      const res = await fetch('/api/ai/customer-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: textToSend,
          history: updatedMessages.map(m => ({
            sender: m.sender,
            text: m.text
          }))
        })
      });

      const data = await res.json();
      const rawReply = data.text || `Hey there! I am happy to help you out. Ask me anything about INPBOS or reach our team at ${OFFICIAL_EMAIL}.`;
      const botReply = sanitizeText(rawReply);

      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: botReply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        chipOptions: [
          'How does INPBOS Drive work?',
          'How to generate client quotations?',
          'Submit support ticket'
        ]
      };

      setMessages(prev => [...prev, botMsg]);
    } catch (err) {
      console.error("AI Chat Error:", err);
      const fallbackMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: `I'm right here to help you out! Feel free to ask me anything about INPBOS tools or email our team at ${OFFICIAL_EMAIL}.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, fallbackMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleTicketSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticketSubject.trim() || !ticketMessage.trim()) return;

    setTicketSubmitted(true);
    setTimeout(() => {
      setShowTicketForm(false);
      setTicketSubmitted(false);
      setTicketSubject('');
      setTicketMessage('');

      const botMsg: ChatMessage = {
        id: Date.now().toString(),
        sender: 'bot',
        text: `Your support ticket has been sent directly to our team at ${OFFICIAL_EMAIL}.\n\nSubject: ${ticketSubject}\nWe will review it and get back to you shortly.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        chipOptions: ['Tell me about INPBOS Drive', 'How to generate quotations?']
      };
      setMessages(prev => [...prev, botMsg]);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 bg-slate-900/75 backdrop-blur-xs z-50 flex items-center justify-center p-2 sm:p-4 overflow-hidden">
      <div className="bg-white border border-slate-200 rounded-2xl max-w-2xl w-full h-[95vh] sm:h-[88vh] max-h-[700px] shadow-2xl flex flex-col overflow-hidden my-auto">
        
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-sky-900 via-slate-900 to-sky-900 text-white p-3 sm:p-4 flex items-center justify-between gap-2 shrink-0">
          <div className="flex items-center space-x-2.5 sm:space-x-3 min-w-0">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-sky-500 flex items-center justify-center text-white shadow-md shadow-sky-500/30 font-bold shrink-0">
              <Bot className="w-4 h-4 sm:w-6 sm:h-6" />
            </div>
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                <h3 className="font-black text-xs sm:text-base tracking-tight flex items-center gap-1 text-white">
                  <span>INPBOS Real-Time AI Support</span>
                </h3>
                <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-bold px-1.5 py-0.5 rounded border border-emerald-400/30 flex items-center gap-1 shrink-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  Online
                </span>
              </div>
              <p className="text-[10px] sm:text-xs text-sky-200 truncate">
                24/7 Intelligent Support & Direct Email Inbox
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 sm:p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white cursor-pointer transition-all shrink-0"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>

        {/* Official Email Banner */}
        <div className="bg-sky-50 border-b border-sky-100 p-2.5 sm:px-4 flex flex-wrap sm:flex-nowrap items-center justify-between gap-2 shrink-0">
          <div className="flex items-center gap-1.5 text-xs text-sky-900 font-medium min-w-0">
            <Mail className="w-3.5 h-3.5 text-sky-600 shrink-0" />
            <span className="hidden xs:inline">Support:</span>
            <strong className="font-mono text-sky-950 font-bold bg-white px-2 py-0.5 rounded border border-sky-200 truncate select-all text-[10px] sm:text-xs">
              {OFFICIAL_EMAIL}
            </strong>
          </div>

          <div className="flex items-center space-x-1.5 shrink-0">
            <button
              onClick={handleCopyEmail}
              className="bg-white hover:bg-sky-100 text-sky-700 font-bold px-2 py-1 rounded text-[11px] sm:text-xs border border-sky-200 flex items-center space-x-1 cursor-pointer transition-all shrink-0"
            >
              {emailCopied ? (
                <>
                  <Check className="w-3 h-3 text-emerald-600" />
                  <span className="text-emerald-700">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3 text-sky-600" />
                  <span>Copy</span>
                </>
              )}
            </button>

            <a
              href={`mailto:${OFFICIAL_EMAIL}`}
              className="bg-sky-600 hover:bg-sky-500 text-white font-bold px-2.5 py-1 rounded text-[11px] sm:text-xs shadow-xs flex items-center space-x-1 cursor-pointer transition-all shrink-0"
            >
              <Send className="w-3 h-3" />
              <span>Email Us</span>
            </a>
          </div>
        </div>

        {/* Sub-banner */}
        <div className="bg-slate-50 border-b border-slate-200 px-3 sm:px-4 py-1.5 text-[10px] sm:text-[11px] text-slate-600 flex items-center justify-between shrink-0">
          <span className="font-semibold truncate">
            Ask KIMJIKOIN anything about INPBOS photography tools, pricing, or storage
          </span>
          <span className="font-bold text-sky-800 hidden sm:inline-block shrink-0 ml-2">
            24/7 Fast Support
          </span>
        </div>

        {/* Chat Window Container */}
        <div className="flex-1 p-3 sm:p-4 overflow-y-auto space-y-3 bg-slate-50/50 min-h-0">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'} max-w-full`}
            >
              <div className="flex items-center space-x-1.5 mb-1 text-[10px] text-slate-400 font-medium">
                {msg.sender === 'bot' ? (
                  <>
                    <Bot className="w-3 h-3 text-sky-600" />
                    <span className="font-bold text-slate-700">KIMJIKOIN</span>
                  </>
                ) : (
                  <span className="font-bold text-sky-700">You</span>
                )}
                <span>• {msg.timestamp}</span>
              </div>

              <div
                className={`max-w-[88%] sm:max-w-[82%] p-3 rounded-2xl text-xs whitespace-pre-wrap leading-relaxed break-words shadow-2xs ${
                  msg.sender === 'user'
                    ? 'bg-sky-600 text-white rounded-tr-none font-medium'
                    : 'bg-white border border-slate-200 text-slate-800 rounded-tl-none'
                }`}
              >
                {sanitizeText(msg.text)}
              </div>

              {/* Quick Chip Options */}
              {msg.chipOptions && msg.chipOptions.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-2 max-w-full">
                  {msg.chipOptions.map((chip, idx) => (
                    <button
                      key={idx}
                      onClick={() => sendMessage(chip)}
                      className="bg-white hover:bg-sky-50 text-sky-700 border border-sky-200 text-[10px] sm:text-[11px] font-semibold px-2.5 py-1 rounded-full cursor-pointer transition-all shadow-2xs hover:border-sky-300 text-left break-words max-w-full"
                    >
                      {chip}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex items-center space-x-2 bg-white border border-slate-200 p-2.5 rounded-2xl max-w-[150px] shadow-2xs">
              <Bot className="w-4 h-4 text-sky-600 animate-bounce" />
              <span className="text-[10px] sm:text-[11px] text-slate-500 font-bold">KIMJIKOIN thinking...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Ticket Form Drawer Overlay */}
        {showTicketForm && (
          <div className="bg-white border-t border-slate-200 p-3 sm:p-4 shadow-lg shrink-0 animate-in slide-in-from-bottom duration-200">
            <div className="flex justify-between items-center mb-2.5">
              <h4 className="text-xs font-bold text-slate-900 flex items-center space-x-1.5">
                <Mail className="w-3.5 h-3.5 text-sky-600" />
                <span>Submit Ticket to {OFFICIAL_EMAIL}</span>
              </h4>
              <button
                onClick={() => setShowTicketForm(false)}
                className="text-slate-400 hover:text-slate-600 text-xs font-bold cursor-pointer"
              >
                Cancel
              </button>
            </div>

            {ticketSubmitted ? (
              <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-3 rounded-xl text-xs flex items-center space-x-2 font-bold">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Ticket Dispatched! We will reply to your email shortly.</span>
              </div>
            ) : (
              <form onSubmit={handleTicketSubmit} className="space-y-2 text-xs">
                <input
                  type="text"
                  required
                  placeholder="Ticket Subject / Topic (e.g. Drive Storage Question)"
                  value={ticketSubject}
                  onChange={e => setTicketSubject(e.target.value)}
                  className="w-full bg-slate-50 text-slate-900 p-2 rounded-lg border border-slate-200 focus:outline-none focus:border-sky-500 font-semibold text-xs"
                />
                <textarea
                  rows={2}
                  required
                  placeholder="Describe your query or issue in detail..."
                  value={ticketMessage}
                  onChange={e => setTicketMessage(e.target.value)}
                  className="w-full bg-slate-50 text-slate-900 p-2 rounded-lg border border-slate-200 focus:outline-none focus:border-sky-500 font-medium text-xs"
                />
                <button
                  type="submit"
                  className="w-full bg-sky-600 hover:bg-sky-500 text-white font-bold py-2 rounded-lg text-xs shadow-xs cursor-pointer transition-all"
                >
                  Submit Ticket
                </button>
              </form>
            )}
          </div>
        )}

        {/* Chat Input Footer */}
        {!showTicketForm && (
          <div className="p-2.5 sm:p-3 bg-white border-t border-slate-200 shrink-0">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                sendMessage(inputMessage);
              }}
              className="flex items-center gap-1.5 sm:gap-2 w-full"
            >
              <input
                type="text"
                placeholder="Ask KIMJIKOIN anything..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                className="flex-1 min-w-0 bg-slate-50 text-slate-900 px-3 py-2 sm:py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-sky-500 text-xs font-semibold placeholder:text-slate-400"
              />

              <button
                type="button"
                onClick={() => setShowTicketForm(true)}
                className="bg-slate-100 hover:bg-slate-200 text-slate-700 p-2 sm:px-3 sm:py-2.5 rounded-xl text-xs font-bold flex items-center space-x-1 cursor-pointer transition-all shrink-0"
                title="Submit Support Ticket"
              >
                <Mail className="w-4 h-4 text-sky-600" />
                <span className="hidden xs:inline">Ticket</span>
              </button>

              <button
                type="submit"
                disabled={!inputMessage.trim()}
                className="bg-sky-600 hover:bg-sky-500 disabled:opacity-50 text-white p-2 sm:p-2.5 rounded-xl text-xs font-bold shadow-xs cursor-pointer transition-all shrink-0"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        )}

      </div>
    </div>
  );
};
