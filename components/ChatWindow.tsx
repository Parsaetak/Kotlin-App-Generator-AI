import React, { useEffect, useRef, useState } from 'react';
import type { AppStatus, Message, AIMode } from '../types';
import { ChatInput } from './ChatInput';
import { ErrorDisplay } from './ErrorDisplay';
import { LoadingSpinner } from './LoadingSpinner';
import { ModeToggle } from './ModeToggle';

const CopyIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"> <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect> <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path> </svg> );
const CheckIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"> <polyline points="20 6 9 17 4 12"></polyline> </svg> );

interface ChatWindowProps {
  messages: Message[];
  status: AppStatus;
  error: string | null;
  onSendMessage: (message: string) => void;
  onFilesUpload: (files: File[]) => void;
  useSearch: boolean;
  onUseSearchChange: (value: boolean) => void;
  aiMode: AIMode;
  onAiModeChange: (mode: AIMode) => void;
}

const ChatMessage: React.FC<{ message: Message }> = ({ message }) => {
    const isUser = message.role === 'user';
    const [isCopied, setIsCopied] = useState(false);

    const handleCopy = () => {
        if (!message.content) return;
        navigator.clipboard.writeText(message.content).then(() => {
          setIsCopied(true);
          setTimeout(() => setIsCopied(false), 2000);
        }).catch(err => {
          console.error('Failed to copy text:', err);
        });
    };
    
    return (
        <div className={`flex my-2 group ${isUser ? 'justify-end' : 'justify-start'}`}>
            {!isUser && (
                <button 
                    onClick={handleCopy}
                    className="mr-2 self-start mt-2 p-1.5 rounded-full transition-all text-[var(--text-secondary)] opacity-0 group-hover:opacity-100 hover:bg-white/10 hover:text-white"
                    aria-label="Copy message"
                >
                    {isCopied ? <CheckIcon /> : <CopyIcon />}
                </button>
            )}
            <div 
                className={`max-w-xl lg:max-w-2xl px-4 py-3 rounded-2xl shadow ${isUser ? 'rainbow-bg text-white rounded-br-none' : 'rounded-bl-none'}`}
                style={{backgroundColor: isUser ? '' : 'var(--dark-ui)'}}
            >
                <p className="whitespace-pre-wrap text-sm" style={{color: isUser ? '#fff' : 'var(--text-primary)'}}>
                    {message.content}
                </p>
            </div>
        </div>
    );
};


export const ChatWindow: React.FC<ChatWindowProps> = ({ messages, status, error, onSendMessage, onFilesUpload, useSearch, onUseSearchChange, aiMode, onAiModeChange }) => {
    const endOfMessagesRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, status]);
    
  return (
    <div className="rounded-lg flex flex-col h-[85vh] glowing-edge">
        <ModeToggle activeMode={aiMode} onModeChange={onAiModeChange} />
        <div className="flex-grow p-4 space-y-1 overflow-y-auto">
            {messages.map((msg, index) => (
                <ChatMessage key={index} message={msg} />
            ))}
            {status === 'loading' && <LoadingSpinner />}
            {status === 'error' && error && <ErrorDisplay message={error} />}
            <div ref={endOfMessagesRef} />
        </div>
        <ChatInput 
            onSendMessage={onSendMessage} 
            onFilesUpload={onFilesUpload}
            isLoading={status === 'loading'}
            useSearch={useSearch}
            onUseSearchChange={onUseSearchChange}
            aiMode={aiMode}
        />
    </div>
  );
};
