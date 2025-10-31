export type AppStatus = 'idle' | 'loading' | 'success' | 'error';

export interface GeneratedFile {
  path: string;
  code: string;
  language: string;
}

export interface UploadedFile {
  name: string;
  content: string;
}

export type MessageRole = 'user' | 'model';

// FIX: Define the 'CodeBlocks' type, which was used in `CodeOutput.tsx` but was missing.
export interface CodeBlocks {
  kotlin: string;
  xml: string;
}

export interface Message {
  role: MessageRole;
  content: string;
  // FIX: Add an optional 'codeBlocks' property to allow model messages to carry structured code.
  codeBlocks?: CodeBlocks;
}

// FIX: Define the 'Conversation' type. It was used in multiple components
// for chat history (`BlueprintCard`, `ConversationCard`, etc.) but was missing.
export interface Conversation {
  id: string;
  title: string;
  messages: Message[];
  createdAt: number;
}

export type ProjectType = 'Android App' | 'Ktor Server' | 'Compose for Desktop' | 'Kotlin Library';

export interface GenerationOptions {
  projectType: ProjectType;
  apiLevel: string;
  architecture: 'Standard' | 'MVVM' | 'MVI';
  dependencies: { id: string; name: string; checked: boolean }[];
}
