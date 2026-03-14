import React from 'react';

export enum Sender {
  User = 'user',
  Bot = 'bot'
}

export interface Message {
  id: string;
  text: string;
  sender: Sender;
  timestamp: Date;
  isError?: boolean;
  image?: string; // Base64 string for generated images
}

export interface Topic {
  id: string;
  title: string;
  icon: React.ReactNode;
  prompt: string;
  color: string;
}

export interface UserPreferences {
  name: string;
  vibe: 'Direct & Practical' | 'Romantic & Soft' | 'Scientific & Clinical' | 'Flirty & Playful' | 'Empathetic & Gentle' | 'Dark & Mysterious';
  focus: 'Education' | 'Pleasure' | 'Anatomy' | 'Kinks' | 'LGBTQ+ & Gender' | 'Dating & Advice' | 'Emotional Connection' | 'Seduction & Influence' | 'Power Dynamics' | 'Tantra & Energy';
}

export interface ChatState {
  messages: Message[];
  isLoading: boolean;
  currentStreamedResponse: string;
}