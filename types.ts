export type AppStatus = 'idle' | 'loading' | 'success' | 'error';
export type AIMode = 'chat' | 'code';

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

// FIX: Define and export the CodeBlocks type, which was missing. This type is used in CodeOutput.tsx and is part of the Message interface for representing structured code responses from the AI.
export interface CodeBlocks {
  kotlin: string;
  xml: string;
}

export interface Message {
  role: MessageRole;
  content: string;
  // FIX: Add the optional `codeBlocks` property to support messages that contain structured code, as used in BlueprintCard.tsx.
  codeBlocks?: CodeBlocks;
}

// FIX: Define and export the Conversation type, which was missing. This is used across multiple components (BlueprintCard, BlueprintGallery, ConversationCard, ConversationHistory) to represent a chat session.
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
