import { GoogleGenAI, Content } from "@google/genai";
import { SYSTEM_PROMPT } from '../constants';
import type { Message, GenerationOptions, UploadedFile } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable is not set.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

function mapMessagesToGeminiContent(messages: Message[]): Content[] {
    return messages.map(message => ({
        role: message.role,
        parts: [{ text: message.content }],
    }));
}

function constructPromptWithContext(prompt: string, options: GenerationOptions, uploadedFiles: UploadedFile[]): string {
  const selectedDeps = options.dependencies.filter(d => d.checked).map(d => d.name).join(', ');
  
  let context = `
---
**Project Settings:**
- Project Type: ${options.projectType}
- Target API Level: ${options.apiLevel}
- Architecture: ${options.architecture}
- Dependencies: ${selectedDeps || 'None'}
---
`;

    if (uploadedFiles.length > 0) {
        context += '\n**User-Uploaded Project Files:**\n';
        uploadedFiles.forEach(file => {
            context += `// --- Start of File: ${file.name} ---\n${file.content}\n// --- End of File: ${file.name} ---\n\n`;
        });
    }

  return `${context}\n---
**User Request:**\n${prompt}`;
}

export async function continueConversation(
  history: Message[],
  options: GenerationOptions,
  useSearch: boolean,
  uploadedFiles: UploadedFile[]
): Promise<string> {
  try {
    const geminiHistory = mapMessagesToGeminiContent(history);

    if (geminiHistory.length > 0 && geminiHistory[geminiHistory.length - 1].role === 'user') {
        const lastMessage = geminiHistory[geminiHistory.length - 1];
        const originalPrompt = lastMessage.parts[0].text ?? '';
        lastMessage.parts[0].text = constructPromptWithContext(originalPrompt, options, uploadedFiles);
    }
    
    const response = await ai.models.generateContent({
      model: "gemini-2.5-pro",
      contents: geminiHistory,
      config: {
        systemInstruction: SYSTEM_PROMPT,
        thinkingConfig: { thinkingBudget: 32768 }
      },
      tools: useSearch ? [{googleSearch: {}}] : undefined,
    });

    return response.text;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    if (error instanceof Error) {
        throw new Error(`Gemini API Error: ${error.message}`);
    }
    throw new Error("An unknown error occurred while communicating with the Gemini API.");
  }
}