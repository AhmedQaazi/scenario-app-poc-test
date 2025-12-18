import React, { useState, useRef, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { chatMessages } from '../../data/mockData';
import MessageBubble from './MessageBubble';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState(chatMessages);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef(null);
  const chatWindowRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && chatWindowRef.current && !chatWindowRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      const timeoutId = setTimeout(() => {
        document.addEventListener('mousedown', handleClickOutside);
      }, 100);

      return () => {
        clearTimeout(timeoutId);
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [isOpen]);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const newUserMessage = {
      id: messages.length + 1,
      type: 'user',
      content: inputValue,
    };

    setMessages((prev) => [...prev, newUserMessage]);
    setInputValue('');

    setTimeout(() => {
      const botResponse = {
        id: messages.length + 2,
        type: 'bot',
        content: 'I understand you want to explore this scenario. Let me analyze the data and provide you with detailed insights about the impact on housing demand and supply.',
      };
      setMessages((prev) => [...prev, botResponse]);
    }, 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Floating Button */}
      {!isOpen && (
        <button 
          className="fixed bottom-3 right-3 sm:bottom-4 sm:right-4 w-11 h-11 sm:w-12 sm:h-12 rounded-full border-none bg-white shadow-fab cursor-pointer flex items-center justify-center transition-all duration-300 z-[1000] p-0 hover:scale-105 hover:shadow-fab-hover"
          onClick={() => setIsOpen(true)}
        >
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full overflow-hidden">
            <img 
              src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 48 48'%3E%3Ccircle cx='24' cy='24' r='24' fill='%23e8f4f1'/%3E%3Cpath d='M14 34c0-10 5-15 10-15s10 5 10 15' fill='%233D6B59'/%3E%3Ccircle cx='24' cy='17' r='5' fill='%23C4A962'/%3E%3C/svg%3E" 
              alt="Chat" 
              className="w-full h-full object-cover"
            />
          </div>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div 
          ref={chatWindowRef}
          className="fixed bottom-3 right-3 sm:bottom-4 sm:right-4 
                     w-[calc(100vw-24px)] max-w-[320px] 
                     h-[70vh] max-h-[500px] sm:h-[480px]
                     bg-white rounded-2xl shadow-chat flex flex-col overflow-hidden z-[1000]"
        >
          {/* Header */}
          <div className="flex items-center justify-between py-2.5 px-3 border-b border-gray-200 flex-shrink-0">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full overflow-hidden flex-shrink-0">
                <img 
                  src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 40 40'%3E%3Ccircle cx='20' cy='20' r='20' fill='%23e8f4f1'/%3E%3Cpath d='M12 28c0-8 4-12 8-12s8 4 8 12' fill='%233D6B59'/%3E%3Ccircle cx='20' cy='14' r='4' fill='%23C4A962'/%3E%3C/svg%3E" 
                  alt="ADHA Roshd" 
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-xs font-semibold text-dark">ADHA Roshd</span>
            </div>
            <button 
              className="w-5 h-5 border-none bg-transparent cursor-pointer flex items-center justify-center flex-shrink-0"
              onClick={() => setIsOpen(false)}
            >
              <div className="w-3 h-0.5 bg-gray-500 rounded-sm"></div>
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto custom-scrollbar-thin p-2.5 sm:p-3 flex flex-col gap-2.5 sm:gap-3 min-h-0">
            {messages.map((message) => (
              <MessageBubble key={message.id} message={message} />
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="py-2.5 px-2.5 sm:px-3 pb-3 sm:pb-4 border-t border-gray-200 flex-shrink-0">
            <div className="flex items-center gap-1.5 sm:gap-2 bg-gray-150 rounded-full py-1 px-2.5 sm:px-3 pr-1">
              <input
                type="text"
                placeholder="Ask me Anything"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1 border-none bg-transparent font-inter text-xs text-dark outline-none placeholder:text-gray-500 min-w-0"
              />
              <button 
                className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full border-none flex items-center justify-center cursor-pointer transition-all duration-200 flex-shrink-0 ${
                  inputValue.trim() 
                    ? 'bg-primary text-white hover:bg-primary-hover' 
                    : 'bg-gray-300 text-white cursor-not-allowed'
                }`}
                onClick={handleSendMessage}
                disabled={!inputValue.trim()}
              >
                <ArrowUp size={14} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
