import React, { useState } from 'react';
import { Shield, Sparkles } from 'lucide-react';

export const DisclaimerModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-500">
      <div className="bg-slate-900 border border-white/10 rounded-3xl max-w-md w-full p-8 shadow-2xl relative overflow-hidden">
        {/* Decorative background blur */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-rose-500/20 rounded-full blur-2xl pointer-events-none" />
        
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-6 text-rose-400">
            <Shield className="w-8 h-8" />
            <h2 className="text-2xl font-serif text-white">Privacy & Safety</h2>
          </div>
          
          <div className="space-y-4 text-slate-300 text-sm leading-relaxed font-light">
            <p>
              Welcome to <strong className="text-rose-200">IntimEd</strong>. This is a private, judgement-free space for exploration and education.
            </p>
            <div className="bg-rose-500/10 border border-rose-500/20 p-4 rounded-xl">
              <p className="text-rose-200 text-xs">
                <strong>Disclaimer:</strong> Content is AI-generated. While we strive for accuracy, this is not a substitute for professional medical advice.
              </p>
            </div>
            <p>
              Your chat history is <strong>never stored</strong>. Once you refresh this page, your conversation is gone forever.
            </p>
          </div>

          <button
            onClick={() => setIsOpen(false)}
            className="mt-8 w-full flex items-center justify-center gap-2 bg-slate-100 hover:bg-white text-slate-900 font-semibold py-4 rounded-xl transition-all shadow-lg shadow-white/5"
          >
            <Sparkles className="w-4 h-4 text-rose-600" />
            Enter Experience
          </button>
        </div>
      </div>
    </div>
  );
};