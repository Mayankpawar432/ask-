import React from 'react';
import { UserPreferences } from '../types';
import { X, Check, Sliders } from 'lucide-react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  prefs: UserPreferences;
  onSave: (newPrefs: UserPreferences) => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose, prefs, onSave }) => {
  const [localPrefs, setLocalPrefs] = React.useState(prefs);

  if (!isOpen) return null;

  const vibes = [
    'Direct & Practical', 
    'Romantic & Soft', 
    'Scientific & Clinical',
    'Flirty & Playful',
    'Empathetic & Gentle',
    'Dark & Mysterious'
  ];
  
  const focuses = [
    'Education', 
    'Pleasure', 
    'Anatomy', 
    'Kinks',
    'LGBTQ+ & Gender',
    'Dating & Advice',
    'Emotional Connection',
    'Seduction & Influence',
    'Power Dynamics',
    'Tantra & Energy'
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-300">
      <div className="glass-panel w-full max-w-lg rounded-3xl p-6 relative overflow-hidden border border-amber-500/20 shadow-2xl shadow-amber-900/10 max-h-[90vh] overflow-y-auto scrollbar-hide">
        
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-premium text-amber-100 flex items-center gap-2">
            <Sliders className="w-5 h-5 text-amber-500" />
            Personalize Experience
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full text-slate-400">
            <X size={20} />
          </button>
        </div>

        <div className="space-y-6">
          {/* Name Input */}
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest text-slate-400 font-bold">Your Name</label>
            <input
              type="text"
              value={localPrefs.name}
              onChange={(e) => setLocalPrefs({ ...localPrefs, name: e.target.value })}
              placeholder="What should I call you?"
              className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-500/50 transition-colors placeholder:text-slate-600"
            />
          </div>

          {/* Vibe Selection */}
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest text-slate-400 font-bold">Assistant Vibe</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {vibes.map((v) => (
                <button
                  key={v}
                  onClick={() => setLocalPrefs({ ...localPrefs, vibe: v as any })}
                  className={`px-4 py-3 rounded-xl text-sm font-medium transition-all text-left flex justify-between items-center ${
                    localPrefs.vibe === v 
                      ? 'bg-amber-600/20 text-amber-200 border border-amber-500/30' 
                      : 'bg-slate-800/50 text-slate-400 hover:bg-slate-800 border border-transparent'
                  }`}
                >
                  {v}
                  {localPrefs.vibe === v && <Check size={16} />}
                </button>
              ))}
            </div>
          </div>

          {/* Focus Selection */}
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest text-slate-400 font-bold">Primary Focus</label>
            <div className="flex flex-wrap gap-2">
              {focuses.map((f) => (
                <button
                  key={f}
                  onClick={() => setLocalPrefs({ ...localPrefs, focus: f as any })}
                  className={`px-4 py-2 rounded-lg text-sm transition-all ${
                    localPrefs.focus === f
                      ? 'bg-rose-600/20 text-rose-200 border border-rose-500/30'
                      : 'bg-slate-800/50 text-slate-400 hover:bg-slate-800'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
        </div>

        <button
          onClick={() => {
            onSave(localPrefs);
            onClose();
          }}
          className="mt-8 w-full bg-gradient-to-r from-amber-600 to-rose-600 text-white font-premium font-bold py-3 rounded-xl hover:brightness-110 transition-all shadow-lg"
        >
          Apply Settings
        </button>
      </div>
    </div>
  );
};