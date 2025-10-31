import React, { useState, useCallback } from 'react';

import { Header } from './components/Header';
import { ChatWindow } from './components/ChatWindow';
import { Footer } from './components/Footer';
import { CodeViewer } from './components/CodeViewer';
import { SettingsPanel } from './components/SettingsPanel';

import { continueConversation } from './services/geminiService';
import { parseMultiFileResponse, getConversationalPart } from './utils/parser';
import type { AppStatus, Message, GenerationOptions, UploadedFile, GeneratedFile } from './types';

const initialDependencies = [
    { id: 'viewmodel', name: 'ViewModel & LiveData', checked: false },
    { id: 'coroutines', name: 'Kotlin Coroutines', checked: false },
    { id: 'retrofit', name: 'Retrofit (for networking)', checked: false },
    { id: 'room', name: 'Room (for local database)', checked: false },
];

const initialOptions: GenerationOptions = {
    projectType: 'Android App',
    apiLevel: '34',
    architecture: 'MVVM',
    dependencies: initialDependencies,
};

const App: React.FC = () => {
  const [status, setStatus] = useState<AppStatus>('idle');
  const [error, setError] = useState<string | null>(null);
  
  const [messages, setMessages] = useState<Message[]>([]);
  const [generationOptions, setGenerationOptions] = useState<GenerationOptions>(initialOptions);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [generatedFiles, setGeneratedFiles] = useState<GeneratedFile[]>([]);
  const [useSearch, setUseSearch] = useState(false);


  const handleSendMessage = useCallback(async (prompt: string) => {
    setStatus('loading');
    setError(null);

    const userMessage: Message = { role: 'user', content: prompt };
    const updatedHistory = [...messages, userMessage];
    setMessages(updatedHistory);

    try {
      const responseText = await continueConversation(updatedHistory, generationOptions, useSearch, uploadedFiles);
      const newGeneratedFiles = parseMultiFileResponse(responseText);
      
      let conversationalText = getConversationalPart(responseText);
      if (newGeneratedFiles.length > 0 && !conversationalText) {
          conversationalText = "I've generated the files you requested. You can view them in the Code Editor to the right.";
      }

      const modelMessage: Message = { role: 'model', content: conversationalText };
      
      setMessages(prev => [...prev, modelMessage]);
      if (newGeneratedFiles.length > 0) {
        setGeneratedFiles(newGeneratedFiles);
      }
      setStatus('success');

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred.';
      console.error('Message Sending Error:', err);
      setError(`Failed to get response. ${errorMessage}`);
      setMessages(updatedHistory); // Revert to user message on error
      setStatus('error');
    }
  }, [messages, generationOptions, useSearch, uploadedFiles]);

  const handleFilesUpload = useCallback((files: File[]) => {
    const newUploadedFiles: UploadedFile[] = [];
    let processedCount = 0;

    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        if (content) {
            newUploadedFiles.push({ name: file.name, content });
        }
        processedCount++;
        if (processedCount === files.length) {
            setUploadedFiles(prev => [...prev, ...newUploadedFiles]);
        }
      };
      reader.onerror = (e) => {
        console.error("Failed to read file:", file.name, e);
        setError(`Failed to read file: ${file.name}`);
        processedCount++;
        if (processedCount === files.length) {
            setUploadedFiles(prev => [...prev, ...newUploadedFiles]);
        }
      };
      reader.readAsText(file);
    });
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <main className="max-w-screen-2xl mx-auto p-4 sm:p-6 flex-grow w-full">
        <Header />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6">
          <div className="lg:col-span-3">
             <SettingsPanel 
                options={generationOptions}
                onOptionChange={setGenerationOptions}
                uploadedFiles={uploadedFiles}
             />
          </div>
          <div className="lg:col-span-5">
            <ChatWindow
              messages={messages}
              status={status}
              error={error}
              onSendMessage={handleSendMessage}
              onFilesUpload={handleFilesUpload}
              useSearch={useSearch}
              onUseSearchChange={setUseSearch}
            />
          </div>
          <div className="lg:col-span-4">
             <CodeViewer files={generatedFiles} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;
