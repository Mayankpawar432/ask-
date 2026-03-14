import React from 'react';
import { MessageSquare, Plus, Trash2, X } from 'lucide-react';

interface Session {
  id: string;
  title: string;
  updatedAt: number;
}

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  sessions: Session[];
  currentSessionId: string;
  onSelectSession: (id: string) => void;
  onNewSession: () => void;
  onDeleteSession: (id: string, e: React.MouseEvent) => void;
}

export function Sidebar({ isOpen, onClose, sessions, currentSessionId, onSelectSession, onNewSession, onDeleteSession }: SidebarProps) {
  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-40 w-72 bg-slate-950 border-r border-white/5 transform transition-transform duration-300 ease-in-out flex flex-col ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0`}>
        
        <div className="p-4 flex items-center justify-between border-b border-white/5">
          <h2 className="text-amber-500/80 font-premium tracking-widest text-sm uppercase">Your Archives</h2>
          <button onClick={onClose} className="md:hidden p-2 text-slate-400 hover:text-white">
            <X size={18} />
          </button>
        </div>

        <div className="p-4">
          <button 
            onClick={onNewSession}
            className="w-full flex items-center gap-2 px-4 py-3 bg-white/5 hover:bg-white/10 text-slate-200 rounded-xl transition-colors border border-white/5"
          >
            <Plus size={18} />
            <span className="font-medium">New Chat</span>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-2 space-y-1 scrollbar-hide">
          {sessions.map(session => (
            <div 
              key={session.id}
              onClick={() => onSelectSession(session.id)}
              className={`group flex items-center justify-between w-full p-3 rounded-lg cursor-pointer transition-all ${
                currentSessionId === session.id 
                  ? 'bg-amber-500/10 text-amber-200 border border-amber-500/20' 
                  : 'text-slate-400 hover:bg-white/5 hover:text-slate-200 border border-transparent'
              }`}
            >
              <div className="flex items-center gap-3 overflow-hidden">
                <MessageSquare size={16} className="shrink-0 opacity-70" />
                <span className="truncate text-sm">{session.title}</span>
              </div>
              <button 
                onClick={(e) => onDeleteSession(session.id, e)}
                className="opacity-0 group-hover:opacity-100 p-1 text-slate-500 hover:text-rose-400 transition-all"
              >
                <Trash2 size={14} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
