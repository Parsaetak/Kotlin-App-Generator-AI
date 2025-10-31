import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full text-center p-6 text-sm" style={{color: 'var(--text-secondary)'}}>
      <div className="space-y-1">
        <p className="font-semibold" style={{color: 'var(--text-primary)'}}>Created by Parsa Tak</p>
        <div className="flex justify-center items-center gap-4">
            <a href="https://linktr.ee/Parsaetak" target="_blank" rel="noopener noreferrer" className="transition-all hover:text-[var(--glow-color-1)] hover:drop-shadow-[0_0_4px_var(--glow-color-1)]">
                Linktree
            </a>
            <span>&bull;</span>
            <a href="mailto:parsaetak@gmail.com" className="transition-all hover:text-[var(--glow-color-2)] hover:drop-shadow-[0_0_4px_var(--glow-color-2)]">
                parsaetak@gmail.com
            </a>
        </div>
        <p className="text-xs pt-2">
            Copyright &copy; {new Date().getFullYear()} Parsa Tak. Users may use and distribute this application with attribution.
        </p>
      </div>
    </footer>
  );
};