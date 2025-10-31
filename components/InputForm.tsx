
import React from 'react';

interface InputFormProps {
  prompt: string;
  onPromptChange: (value: string) => void;
  onGenerate: () => void;
  isLoading: boolean;
}

export const InputForm: React.FC<InputFormProps> = ({ prompt, onPromptChange, onGenerate, isLoading }) => {
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      if(!isLoading) {
        onGenerate();
      }
    }
  };
  
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg space-y-4">
      <label htmlFor="appIdea" className="block text-lg font-semibold text-gray-700">
        Describe Your Android App Idea
      </label>
      <textarea
        id="appIdea"
        rows={5}
        value={prompt}
        onChange={(e) => onPromptChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="e.g., A simple to-do list app with a dark theme that saves items using SharedPreferences. Provide the Kotlin code for MainActivity and the corresponding XML layout."
        className="w-full p-3 border-2 border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
        disabled={isLoading}
      />
      
      <button
        onClick={onGenerate}
        disabled={isLoading}
        className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg shadow-md transition-all duration-150 ease-in-out active:scale-[0.98] disabled:bg-slate-400 disabled:cursor-not-allowed flex items-center justify-center"
      >
        {isLoading ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Generating...
          </>
        ) : (
          'Generate Android Code'
        )}
      </button>
      <p className="text-center text-sm text-slate-500">
        You can also press <kbd className="font-sans font-semibold">Cmd/Ctrl</kbd> + <kbd className="font-sans font-semibold">Enter</kbd> to generate.
      </p>
    </div>
  );
};
