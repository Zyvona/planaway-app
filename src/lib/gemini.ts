import { GoogleGenerativeAI } from "@google/generative-ai";

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

if (!GEMINI_API_KEY || GEMINI_API_KEY === 'undefined') {
  console.error("CRITICAL: Gemini API Key is missing.");
}

export const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
