import React from 'react';

interface WelcomeDisplayProps {
    onNewChat: () => void;
}

const CodeIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{color: 'var(--as-accent)'}}> <polyline points="16 18 22 12 16 6"></polyline> <polyline points="8 6 2 12 8 18"></polyline> </svg> );


export const WelcomeDisplay: React.FC<WelcomeDisplayProps> = ({ onNewChat }) => {
  return (
    <div className="rounded-lg flex flex-col items-center justify-center h-[80vh] text-center p-8" style={{backgroundColor: 'var(--as-dark-ui)', border: '1px solid var(--as-border)'}}>
        <CodeIcon />
        <h2 className="text-2xl font-bold mt-4" style={{color: 'var(--as-text)'}}>Welcome to the Kotlin App Generator</h2>
        <p className="mt-2 max-w-md" style={{color: 'var(--as-text-secondary)'}}>
            Start a new chat to generate, debug, and refine your Android app ideas with an AI coding partner.
        </p>
        <button
            onClick={onNewChat}
            className="mt-6 btn-primary"
        >
            Start a New Chat
        </button>
    </div>
  );
};