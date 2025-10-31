import React from 'react';
import type { Conversation } from '../types';
import { ConversationCard } from './ConversationCard';

interface ConversationHistoryProps {
  conversations: Conversation[];
  activeConversationId: string | null;
  onNewChat: () => void;
  onSelect: (id: string) => void;
  onDelete: (id: string) => void;
}

export const ConversationHistory: React.FC<ConversationHistoryProps> = ({ conversations, activeConversationId, onNewChat, onSelect, onDelete }) => {
  return (
    <aside className="w-full md:w-80 flex-shrink-0 p-4 rounded-lg h-[80vh] flex flex-col" style={{backgroundColor: 'var(--as-dark-ui)', border: '1px solid var(--as-border)'}}>
      <div className="flex justify-between items-center pb-4 border-b" style={{borderColor: 'var(--as-border)'}}>
        <h2 className="text-lg font-bold">History</h2>
        <button 
            onClick={onNewChat}
            className="btn-primary text-sm"
        >
          New Chat
        </button>
      </div>
      <div className="mt-4 space-y-1 flex-grow overflow-y-auto pr-1">
        {conversations.length === 0 ? (
          <div className="text-center py-8 text-sm" style={{color: 'var(--as-text-secondary)'}}>
            <p>Your conversations will appear here.</p>
          </div>
        ) : (
          conversations.map(conv => (
            <ConversationCard
              key={conv.id}
              conversation={conv}
              isActive={conv.id === activeConversationId}
              onSelect={onSelect}
              onDelete={onDelete}
            />
          ))
        )}
      </div>
    </aside>
  );
};