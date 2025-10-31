import React, { useState, useEffect } from 'react';
import type { GeneratedFile } from '../types';
import { CodeBlock } from './CodeBlock';

// Allow using JSZip from CDN
declare const JSZip: any;

const DownloadIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"> <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path> <polyline points="7 10 12 15 17 10"></polyline> <line x1="12" y1="15" x2="12" y2="3"></line> </svg> );
const CodeIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="rainbow-text opacity-50"> <polyline points="16 18 22 12 16 6"></polyline> <polyline points="8 6 2 12 8 18"></polyline> </svg> );
const ZipIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="10" x2="10" y1="2" y2="8" /><line x1="7" x2="13" y1="5" y2="5" /><path d="M20.5 13.5a2.5 2.5 0 0 0-2.5-2.5h-10a2.5 2.5 0 0 0-2.5 2.5v5a2.5 2.5 0 0 0 2.5 2.5h10a2.5 2.5 0 0 0 2.5-2.5Z" /><path d="M16 18h-2" /><path d="M12 18h-2" /><path d="M8 18H6" /></svg>);
const CopyIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"> <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect> <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path> </svg> );
const CheckIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"> <polyline points="20 6 9 17 4 12"></polyline> </svg> );


interface CodeViewerProps {
  files: GeneratedFile[];
}

export const CodeViewer: React.FC<CodeViewerProps> = ({ files }) => {
  const [activeTabPath, setActiveTabPath] = useState<string | null>(null);
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    // If there are files but no active tab, set the first file as active.
    // Or if the active tab is no longer in the files list, reset it.
    if (files.length > 0 && !files.find(f => f.path === activeTabPath)) {
        setActiveTabPath(files[0].path);
    } else if (files.length === 0) {
        setActiveTabPath(null);
    }
  }, [files, activeTabPath]);

  useEffect(() => {
    setIsCopied(false);
  }, [activeTabPath]);
  
  const handleDownloadSingleFile = (file: GeneratedFile) => {
    const blob = new Blob([file.code], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = file.path.split('/').pop() || 'file.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const activeFile = files.find(f => f.path === activeTabPath);

  const handleCopy = () => {
    if (!activeFile) return;
    navigator.clipboard.writeText(activeFile.code).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }).catch(err => {
      console.error('Failed to copy text:', err);
    });
  };

  const handleDownloadAll = () => {
    if (files.length === 0) return;

    const zip = new JSZip();
    files.forEach(file => {
        zip.file(file.path, file.code);
    });

    zip.generateAsync({ type: 'blob' }).then(content => {
        const url = URL.createObjectURL(content);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'kotlin-project.zip';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    });
  };

  if (files.length === 0) {
    return (
      <div className="rounded-lg flex flex-col items-center justify-center h-[85vh] text-center p-8 glowing-edge">
        <CodeIcon />
        <h3 className="text-xl font-bold mt-4" style={{color: 'var(--text-primary)'}}>Code Editor</h3>
        <p className="mt-2 max-w-sm" style={{color: 'var(--text-secondary)'}}>
          The generated code files will appear here in separate tabs.
        </p>
      </div>
    );
  }
  
  return (
    <div className="rounded-lg flex flex-col h-[85vh] glowing-edge">
      <header className="p-2 border-b flex justify-between items-center gap-4" style={{borderColor: 'var(--border-color)'}}>
        <div className="flex-grow overflow-x-auto">
          <div className="flex" style={{backgroundColor: 'var(--dark-bg)'}}>
            {files.map(file => {
              const isActive = file.path === activeTabPath;
              return (
                  <div key={file.path} className={`relative flex items-center group border-b-2`} style={{ borderColor: isActive ? 'var(--glow-color-1)' : 'transparent', background: isActive ? 'var(--dark-ui)' : 'transparent'}}>
                      <button 
                          onClick={() => setActiveTabPath(file.path)} 
                          className={`px-3 py-1 text-sm font-semibold transition-colors whitespace-nowrap`}
                          style={{ color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)' }}
                      >
                          {file.path.split('/').pop()}
                      </button>
                      <button onClick={() => handleDownloadSingleFile(file)} className="ml-1 opacity-50 group-hover:opacity-100 text-[var(--text-secondary)] hover:text-[var(--text-primary)]" aria-label={`Download ${file.path}`}>
                          <DownloadIcon/>
                      </button>
                  </div>
              )
            })}
          </div>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
            {activeFile && (
                 <button
                    onClick={handleCopy}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm transition-colors text-white font-bold rainbow-border-bg ${isCopied ? 'bg-green-600/20' : ''}`}
                 >
                    {isCopied ? <CheckIcon /> : <CopyIcon />}
                    {isCopied ? 'Copied' : 'Copy'}
                </button>
            )}
            <button 
                onClick={handleDownloadAll}
                className="flex items-center gap-2 px-3 py-1.5 rounded-md text-sm transition-colors rainbow-border-bg text-white font-bold"
                aria-label="Download all files as zip"
            >
                <ZipIcon />
                <span>ZIP</span>
            </button>
        </div>
      </header>
      <div className="flex-grow overflow-y-auto">
        {activeFile && <CodeBlock code={activeFile.code} language={activeFile.language} />}
      </div>
    </div>
  );
};