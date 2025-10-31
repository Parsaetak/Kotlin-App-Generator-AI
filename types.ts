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

// FIX: Added 'CodeBlocks' type to represent the structure of generated code files, resolving an error in CodeOutput.tsx.
export interface CodeBlocks {
  kotlin: string;
  xml: string;
}

export interface Message {
  role: MessageRole;
  content: string;
  // FIX: Added optional 'codeBlocks' property to allow model messages to carry structured code, which is used by BlueprintCard.tsx.
  codeBlocks?: CodeBlocks;
}

// FIX: Added 'Conversation' type to define the structure for stored chat sessions, resolving errors in BlueprintCard.tsx, BlueprintGallery.tsx, ConversationCard.tsx, and ConversationHistory.tsx.
export interface Conversation {
  id: string;
  title: string;
  createdAt: number;
  messages: Message[];
}


export type ProjectType = 'Android App' | 'Ktor Server' | 'Compose for Desktop' | 'Kotlin Library';

export interface GenerationOptions {
  projectType: ProjectType;
  apiLevel: string;
  architecture: 'Standard' | 'MVVM' | 'MVI';
  dependencies: { id: string; name: string; checked: boolean }[];
}
