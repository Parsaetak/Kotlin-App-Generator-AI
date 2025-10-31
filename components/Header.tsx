import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="p-4 rounded-lg" style={{ backgroundColor: 'var(--dark-ui)', border: '1px solid var(--border-color)'}}>
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold rainbow-text">
            Kotlin App Generator
          </h1>
          <p style={{ color: 'var(--text-secondary)' }}>
            Your AI partner for any Kotlin project.
          </p>
        </div>
      </div>
    </header>
  );
};
