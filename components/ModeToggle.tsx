import React from 'react';
import type { AIMode } from '../types';

interface ModeToggleProps {
  activeMode: AIMode;
  onModeChange: (mode: AIMode) => void;
}

const ChatIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>);
const CodeIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>);

export const ModeToggle: React.FC<ModeToggleProps> = ({ activeMode, onModeChange }) => {
  const getButtonClasses = (mode: AIMode) => {
    const isActive = activeMode === mode;
    return `flex-1 py-2 text-sm rounded-md flex items-center justify-center gap-2 transition-all duration-200 ${
      isActive ? 'rainbow-bg text-white shadow-lg' : 'hover:bg-white/10'
    }`;
  };

  return (
    <div className="p-2 border-b" style={{ borderColor: 'var(--border-color)' }}>
      <div className="flex p-1 rounded-lg" style={{ backgroundColor: 'var(--dark-bg)' }}>
        <button className={getButtonClasses('chat')} onClick={() => onModeChange('chat')}>
          <ChatIcon /> AI Chat
        </button>
        <button className={getButtonClasses('code')} onClick={() => onModeChange('code')}>
          <CodeIcon /> Code Generation
        </button>
      </div>
    </div>
  );
};