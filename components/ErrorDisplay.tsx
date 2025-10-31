import React from 'react';

interface ErrorDisplayProps {
  message: string;
}

export const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ message }) => {
  return (
    <div className="p-4 bg-red-900/40 border border-red-500 text-red-200 rounded-lg shadow-md m-2" role="alert">
      <p className="font-bold text-red-100">An Error Occurred</p>
      <p>{message}</p>
    </div>
  );
};