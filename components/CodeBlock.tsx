import React, { useState, useCallback } from 'react';

interface CodeBlockProps {
  title: string;
  code: string;
  language: string;
}

const CopyIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
    </svg>
);

const CheckIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
);

export const CodeBlock: React.FC<CodeBlockProps> = ({ title, code }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(code).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }).catch(err => {
      console.error('Failed to copy text:', err);
    });
  }, [code]);

  return (
    <div className="overflow-hidden">
      {title && (
          <div className="px-4 py-2 flex justify-between items-center" style={{backgroundColor: '#313335', color: 'var(--text-secondary)'}}>
            <span className="text-sm font-semibold">{title}</span>
            <button
              onClick={handleCopy}
              className={`px-3 py-1.5 text-xs font-bold rounded-md flex items-center gap-2 transition-colors duration-200 ${
                isCopied
                  ? 'bg-green-600 text-white'
                  : 'bg-[var(--dark-ui)] hover:bg-[var(--border-color)]'
              }`}
            >
              {isCopied ? <CheckIcon /> : <CopyIcon />}
              {isCopied ? 'Copied!' : 'Copy Code'}
            </button>
          </div>
      )}
      <div className="p-4 overflow-x-auto">
        <pre className="text-sm whitespace-pre-wrap break-all" style={{color: 'var(--text-primary)'}}>
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
};