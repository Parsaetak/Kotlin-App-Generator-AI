import React, { useState, useRef } from 'react';
import type { AIMode } from '../types';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  onFilesUpload: (files: File[]) => void;
  isLoading: boolean;
  useSearch: boolean;
  onUseSearchChange: (value: boolean) => void;
  aiMode: AIMode;
}


const SendIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"> <line x1="22" y1="2" x2="11" y2="13"></line> <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon> </svg> );
const AttachmentIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"> <path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.59a2 2 0 0 1-2.83-2.83l8.49-8.48"></path> </svg> );


export const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, onFilesUpload, isLoading, useSearch, onUseSearchChange, aiMode }) => {
  const [prompt, setPrompt] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim() && !isLoading) {
      onSendMessage(prompt);
      setPrompt('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleAttachmentClick = () => {
    fileInputRef.current?.click();
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
          onFilesUpload(Array.from(e.target.files));
      }
      e.target.value = '';
  };

  const placeholderText = aiMode === 'code' 
    ? "Describe the code you want to generate..." 
    : "Ask a question about your project...";

  return (
    <div className="p-4" style={{ backgroundColor: 'var(--dark-ui)', borderTop: '1px solid var(--border-color)'}}>
        <form onSubmit={handleSubmit}>
            <div className="relative">
                <textarea
                rows={2}
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={placeholderText}
                className="w-full p-3 pl-12 pr-14 rounded-md text-sm transition-all duration-150 ease-in-out resize-none focus:ring-0"
                style={{
                    backgroundColor: 'var(--dark-bg)',
                    border: '1px solid var(--border-color)',
                    color: 'var(--text-primary)',
                }}
                disabled={isLoading}
                />
                <button type="button" onClick={handleAttachmentClick} className={`absolute left-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-md flex items-center justify-center transition-colors hover:bg-white/10`} style={{ color: 'var(--text-secondary)'}} aria-label="Upload files">
                    <AttachmentIcon />
                </button>
                <input 
                    type="file" 
                    ref={fileInputRef}
                    multiple
                    onChange={handleFileChange}
                    className="hidden"
                    accept=".kt,.kts,.xml,.java,.gradle,.kts,.properties,.txt,.md"
                />
                <button
                    type="submit"
                    disabled={isLoading || !prompt.trim()}
                    className="absolute right-2 top-1/2 -translate-y-1/2 h-9 w-9 text-white font-bold rounded-md shadow-md transition-all duration-150 ease-in-out active:scale-[0.95] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center rainbow-border-bg"
                    aria-label="Send message"
                >
                    <SendIcon />
                </button>
            </div>
            <div className="flex justify-between items-center mt-2 px-2">
                <label className="flex items-center gap-2 text-xs cursor-pointer" style={{color: 'var(--text-secondary)'}}>
                    <input type="checkbox" checked={useSearch} onChange={e => onUseSearchChange(e.target.checked)} className="rounded" style={{backgroundColor: 'var(--dark-bg)', border: '1px solid var(--border-color)'}} />
                    Use Google Search <span className="text-gray-500">(for up-to-date info)</span>
                </label>
                <p className="text-center text-xs" style={{color: 'var(--text-secondary)'}}>
                    <kbd className="font-sans font-semibold">Cmd/Ctrl</kbd> + <kbd className="font-sans font-semibold">Enter</kbd> to send.
                </p>
            </div>
        </form>
         <style>{`
            textarea:focus {
                outline: none;
                border-color: var(--glow-color-1);
                box-shadow: 0 0 8px var(--glow-color-1);
            }
            input[type=checkbox]:checked {
                background-color: var(--glow-color-1);
                border-color: var(--glow-color-1);
                box-shadow: 0 0 6px var(--glow-color-1);
            }
        `}</style>
    </div>
  );
};