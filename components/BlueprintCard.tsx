
import React from 'react';
// FIX: The `Blueprint` type is not defined. We use the `Conversation` type instead,
// as it represents the stored data structure for chats, and alias it to `Blueprint`
// to match the component's props. This makes the component compatible with the
// application's main data model.
import type { Conversation as Blueprint } from '../types';
import { CodeBlock } from './CodeBlock';

interface BlueprintCardProps {
  blueprint: Blueprint;
  onDelete?: (id: string) => void;
}

const DeleteIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="3 6 5 6 21 6"></polyline>
        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
        <line x1="10" y1="11" x2="10" y2="17"></line>
        <line x1="14" y1="11" x2="14" y2="17"></line>
    </svg>
);


export const BlueprintCard: React.FC<BlueprintCardProps> = ({ blueprint, onDelete }) => {
  // FIX: Extract prompt and code blocks from the conversation messages.
  const prompt = blueprint.messages.find(msg => msg.role === 'user')?.content ?? blueprint.title;
  const modelResponse = blueprint.messages.find(msg => msg.role === 'model' && msg.codeBlocks);
  const kotlinCode = modelResponse?.codeBlocks?.kotlin ?? 'No Kotlin code found.';
  const xmlCode = modelResponse?.codeBlocks?.xml ?? 'No XML code found.';

  return (
    <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg border border-slate-200 space-y-4 flex flex-col">
      <div className="border-b border-slate-200 pb-4">
          <p className="text-sm text-slate-500 mb-1">Prompt:</p>
          <p className="font-semibold text-slate-800">{prompt}</p>
      </div>
      
      <div className="space-y-4 pt-2 flex-grow">
        <details>
          <summary className="font-semibold cursor-pointer text-slate-700 hover:text-blue-600">View Kotlin Code</summary>
          <div className="mt-2">
            <CodeBlock title="MainActivity.kt" code={kotlinCode} language="kotlin" />
          </div>
        </details>

        <details>
          <summary className="font-semibold cursor-pointer text-slate-700 hover:text-blue-600">View XML Layout</summary>
          <div className="mt-2">
            <CodeBlock title="activity_main.xml" code={xmlCode} language="xml" />
          </div>
        </details>
      </div>
      
      <div className="flex justify-between items-center text-xs text-slate-500 font-mono pt-4 border-t border-slate-200 mt-4">
        <span>{new Date(blueprint.createdAt).toLocaleString()}</span>
        {onDelete && (
            <button 
                onClick={() => onDelete(blueprint.id)}
                className="px-3 py-1.5 bg-red-100 hover:bg-red-200 text-red-700 font-bold rounded-md shadow-sm transition-all duration-150 ease-in-out active:scale-[0.98] flex items-center gap-2"
                aria-label="Delete blueprint"
            >
                <DeleteIcon />
                Delete
            </button>
        )}
      </div>
    </div>
  );
};
