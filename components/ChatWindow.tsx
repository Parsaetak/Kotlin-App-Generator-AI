import React, { useEffect, useRef } from 'react';
import type { AppStatus, Message, AIMode } from '../types';
import { ChatInput } from './ChatInput';
import { ErrorDisplay } from './ErrorDisplay';
import { LoadingSpinner } from './LoadingSpinner';
import { ModeToggle } from './ModeToggle';

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
    
    return (
        <div className={`flex my-2 ${isUser ? 'justify-end' : 'justify-start'}`}>
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