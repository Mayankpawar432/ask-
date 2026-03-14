import React from 'react';
import { Topic } from '../types';
import { SUGGESTED_TOPICS } from '../constants';

interface TopicSelectorProps {
  onSelectTopic: (prompt: string) => void;
  disabled: boolean;
}

export const TopicSelector: React.FC<TopicSelectorProps> = ({ onSelectTopic, disabled }) => {
  return (
    <div className="w-full max-w-4xl mx-auto p-4 animate-fade-in">
      <h2 className="text-2xl text-rose-100/90 mb-8 text-center font-serif italic tracking-wide">
        What do you desire to know?
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {SUGGESTED_TOPICS.map((topic) => (
          <button
            key={topic.id}
            onClick={() => onSelectTopic(topic.prompt)}
            disabled={disabled}
            className={`flex flex-col items-center justify-center p-6 rounded-2xl border transition-all duration-300 bg-gradient-to-br backdrop-blur-md
              ${topic.color} hover:scale-[1.02] hover:shadow-lg hover:shadow-rose-900/20 disabled:opacity-50 disabled:cursor-not-allowed group`}
          >
            <div className="mb-4 p-3 rounded-full bg-white/5 border border-white/10 group-hover:bg-white/10 transition-colors shadow-[0_0_15px_rgba(255,255,255,0.05)]">
              {topic.icon}
            </div>
            <span className="font-medium text-center text-sm md:text-base tracking-wide">{topic.title}</span>
          </button>
        ))}
      </div>
    </div>
  );
};