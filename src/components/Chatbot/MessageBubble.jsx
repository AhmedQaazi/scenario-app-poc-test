import React from 'react';

const MessageBubble = ({ message }) => {
  const isBot = message.type === 'bot';

  const formatContent = (content) => {
    const parts = content.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={index} className="font-semibold">{part.slice(2, -2)}</strong>;
      }
      return part;
    });
  };

  return (
    <div className={`flex gap-2 max-w-[90%] ${isBot ? 'self-start' : 'self-end flex-row-reverse'}`}>
      {isBot && (
        <div className="w-6 h-6 rounded-full overflow-hidden flex-shrink-0">
          <img 
            src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 40 40'%3E%3Ccircle cx='20' cy='20' r='20' fill='%23e8f4f1'/%3E%3Cpath d='M12 28c0-8 4-12 8-12s8 4 8 12' fill='%233D6B59'/%3E%3Ccircle cx='20' cy='14' r='4' fill='%23C4A962'/%3E%3C/svg%3E" 
            alt="Bot" 
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <div className={`py-2.5 px-3 rounded-xl text-xs leading-relaxed ${
        isBot 
          ? 'bg-gray-150 text-dark rounded-bl-sm' 
          : 'bg-beige-light text-dark rounded-br-sm'
      }`}>
        {message.content.split('\n').map((line, index) => (
          <p key={index} className="m-0 mb-1 last:mb-0">{formatContent(line)}</p>
        ))}
        {message.hasActions && (
          <div className="flex flex-col gap-2 mt-3">
            <button className="py-2 px-3 border border-gray-300 rounded-lg bg-white font-inter text-xs font-medium text-gray-700 cursor-pointer transition-all duration-200 hover:bg-gray-150 hover:border-dark">
              Save For Later
            </button>
            <button className="py-2 px-3 border-none rounded-lg bg-primary font-inter text-xs font-medium text-white cursor-pointer transition-all duration-200 hover:bg-primary-hover">
              Simulate Now
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageBubble;

