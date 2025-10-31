import React from 'react';
import type { CodeBlocks } from '../types';
import { CodeBlock } from './CodeBlock';

interface CodeOutputProps {
  codeBlocks: CodeBlocks;
  onSave: () => void;
  isSaving: boolean;
  isSaved: boolean;
}

const SaveIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
        <polyline points="17 21 17 13 7 13 7 21"></polyline>
        <polyline points="7 3 7 8 15 8"></polyline>
    </svg>
);


export const CodeOutput: React.FC<CodeOutputProps> = ({ codeBlocks, onSave, isSaving, isSaved }) => {
  return (
    <div className="space-y-6 animate-fade-in">
        <div className="bg-white p-4 rounded-xl shadow-lg flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-700">Generated Blueprint</h2>
            <button
                onClick={onSave}
                disabled={isSaving || isSaved}
                className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-lg shadow-md transition-all duration-150 ease-in-out active:scale-[0.98] disabled:bg-slate-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
                <SaveIcon />
                {isSaving ? 'Saving...' : isSaved ? 'Saved!' : 'Save to History'}
            </button>
        </div>
      <CodeBlock
        title="Kotlin Code: MainActivity.kt"
        code={codeBlocks.kotlin}
        language="kotlin"
      />
      <CodeBlock
        title="XML Layout: activity_main.xml"
        code={codeBlocks.xml}
        language="xml"
      />
    </div>
  );
};

// Add a simple fade-in animation in index.html's style tag or via a config if possible
const AnimationStyles = () => (
  <style>{`
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .animate-fade-in {
      animation: fadeIn 0.5s ease-out forwards;
    }
  `}</style>
);

// We wrap the component to include styles without polluting global scope unnecessarily
export const CodeOutputWithStyles: React.FC<CodeOutputProps> = (props) => (
  <>
    <AnimationStyles />
    <CodeOutput {...props} />
  </>
);