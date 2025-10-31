import type { GeneratedFile } from '../types';

/**
 * Parses the model's structured text response and extracts multiple files.
 * @param {string} text - The raw text output from the Gemini API.
 * @returns {GeneratedFile[]} An array of objects containing the path, code, and language for each file.
 */
export function parseMultiFileResponse(text: string): GeneratedFile[] {
  const files: GeneratedFile[] = [];
  const regex = /\[START_FILE: (.*?)]\s*```(\w+)?\s*([\s\S]*?)```\s*\[END_FILE]/g;
  let match;
  
  while ((match = regex.exec(text)) !== null) {
    const [, path, language, code] = match;
    if (path && code) {
      files.push({
        path: path.trim(),
        language: (language || 'text').trim().toLowerCase(),
        code: code.trim(),
      });
    }
  }
  
  return files;
}

/**
 * Extracts the conversational part of the response, which is everything before the first file block.
 * @param {string} text - The raw text output from the Gemini API.
 * @returns {string} The conversational preamble.
 */
export function getConversationalPart(text: string): string {
    const firstFileIndex = text.indexOf('[START_FILE:');
    if (firstFileIndex === -1) {
        return text.trim(); // No files found, return the whole text
    }
    return text.substring(0, firstFileIndex).trim();
}
