import React from 'react';

interface UserDisplayProps {
  userId: string | null;
}

export const UserDisplay: React.FC<UserDisplayProps> = ({ userId }) => {
  if (!userId) {
    return (
        <div className="h-6 w-48 bg-slate-200 rounded animate-pulse"></div>
    );
  }
  
  return (
    <div className="bg-slate-100 text-slate-600 text-xs font-mono p-2 rounded-lg border border-slate-200">
      <span className="font-semibold text-slate-500">User ID:</span> {userId}
    </div>
  );
};