import React from 'react';

interface CodeBlockProps {
  // FIX: Added optional `title` prop to the interface. This prop is passed by parent components like `CodeOutput` and `BlueprintCard`, and its absence was causing an implicit type error.
  title?: string;
  code: string;
  language: string;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({ code, language }) => {
  return (
    <div className="p-4 overflow-x-auto h-full" style={{backgroundColor: 'var(--dark-bg)'}}>
      <pre className="text-sm whitespace-pre-wrap break-all text-[var(--text-primary)]">
        <code className={`language-${language}`}>{code}</code>
      </pre>
    </div>
  );
};
