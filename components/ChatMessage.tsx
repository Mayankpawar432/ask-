import React from 'react';
import { Sender, Message } from '../types';
import { User, Sparkles, AlertTriangle } from 'lucide-react';

interface ChatMessageProps {
  message: Message;
}

const formatText = (text: string) => {
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={index} className="font-bold text-amber-200">{part.slice(2, -2)}</strong>;
    }
    return part;
  });
};

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.sender === Sender.User;
  const isError = message.isError;

  return (
    <div className={`flex w-full mb-8 ${isUser ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-500`}>
      <div className={`flex max-w-[90%] md:max-w-[80%] ${isUser ? 'flex-row-reverse' : 'flex-row'} gap-4`}>
        
        {/* Avatar */}
        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center shadow-lg border border-white/10 mt-1 ${
          isUser 
            ? 'bg-gradient-to-tr from-amber-600 to-rose-600' 
            : isError 
              ? 'bg-red-900/50' 
              : 'bg-slate-900 ring-1 ring-white/10'
        }`}>
          {isUser ? (
            <User className="w-4 h-4 text-white" />
          ) : isError ? (
            <AlertTriangle className="w-4 h-4 text-red-400" />
          ) : (
            <Sparkles className="w-4 h-4 text-amber-400" />
          )}
        </div>

        {/* Message Content */}
        <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} space-y-2`}>
          
          {/* Image Rendering */}
          {message.image && (
            <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl max-w-sm">
              <img 
                src={`data:image/png;base64,${message.image}`} 
                alt="Visual Aid" 
                className="w-full h-auto object-cover"
              />
              <div className="bg-black/50 p-2 text-[10px] text-center text-slate-400 backdrop-blur-sm">
                AI Generated Visualization
              </div>
            </div>
          )}

          {/* Text Bubble */}
          {message.text && (
            <div className={`px-6 py-4 rounded-2xl shadow-xl text-base font-light leading-relaxed whitespace-pre-wrap backdrop-blur-md border ${
              isUser 
                ? 'bg-amber-900/20 border-amber-500/20 text-amber-50 rounded-tr-sm' 
                : isError
                  ? 'bg-red-950/30 border-red-500/20 text-red-200 rounded-tl-sm'
                  : 'glass-panel text-slate-200 rounded-tl-sm shadow-[0_4px_20px_rgba(0,0,0,0.3)]'
            }`}>
               {formatText(message.text)}
            </div>
          )}
          
          <span className="text-[10px] text-slate-500 px-1 font-medium tracking-wider uppercase font-premium">
            {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>

      </div>
    </div>
  );
};