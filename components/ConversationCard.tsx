import React from 'react';
import type { Conversation } from '../types';

interface ConversationCardProps {
  conversation: Conversation;
  isActive: boolean;
  onSelect: (id: string) => void;
  onDelete: (id: string) => void;
}

const DeleteIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
);

export const ConversationCard: React.FC<ConversationCardProps> = ({ conversation, isActive, onSelect, onDelete }) => {

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card selection when deleting
    if (window.confirm(`Are you sure you want to delete "${conversation.title}"?`)) {
      onDelete(conversation.id);
    }
  };

  const activeClasses = 'bg-[var(--as-accent)]/20';
  const inactiveClasses = 'hover:bg-white/5';

  return (
    <div 
        className={`p-2.5 w-full h-full rounded-md cursor-pointer transition-colors duration-150 group ${isActive ? activeClasses : inactiveClasses}`}
        onClick={() => onSelect(conversation.id)}
    >
        <div className="flex justify-between items-start gap-2">
            <div className="flex-grow overflow-hidden">
                 <p className={`font-semibold text-sm truncate ${isActive ? 'text-white' : ''}`}>{conversation.title}</p>
                 <p className={`text-xs mt-1`} style={{color: 'var(--as-text-secondary)'}}>{new Date(conversation.createdAt).toLocaleDateString()}</p>
            </div>
            <button
                onClick={handleDelete}
                className="p-1.5 rounded-full transition-colors duration-150 opacity-0 group-hover:opacity-100 text-[var(--as-text-secondary)] hover:bg-red-500/20 hover:text-red-400"
                aria-label="Delete conversation"
            >
                <DeleteIcon />
            </button>
        </div>
    </div>
  );
};