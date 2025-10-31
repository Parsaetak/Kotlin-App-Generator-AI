
import React from 'react';
// FIX: The `Blueprint` type is not defined. We use the `Conversation` type instead
// and alias it as `Blueprint` to match the component's existing property names.
import type { Conversation as Blueprint } from '../types';
import { BlueprintCard } from './BlueprintCard';

interface BlueprintGalleryProps {
  blueprints: Blueprint[];
  onDelete: (id: string) => void;
}

export const BlueprintGallery: React.FC<BlueprintGalleryProps> = ({ blueprints, onDelete }) => {
  return (
    <section className="bg-white p-6 rounded-xl shadow-lg space-y-6">
      <h2 className="text-2xl font-bold text-center text-slate-700">
        Generation History
      </h2>
      {blueprints.length === 0 ? (
        <div className="text-center py-8">
            <p className="text-slate-500">Your saved generations will appear here.</p>
            <p className="text-sm text-slate-400 mt-2">Try generating some code and click "Save to History"!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {blueprints.map(bp => (
            <BlueprintCard key={bp.id} blueprint={bp} onDelete={onDelete} />
          ))}
        </div>
      )}
    </section>
  );
};
