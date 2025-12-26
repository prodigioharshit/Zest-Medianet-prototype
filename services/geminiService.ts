
import { GoogleGenAI, Type } from "@google/genai";

// We create a factory function to ensure we always use the latest environment variables
const getAiClient = () => new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateAdCopy = async (businessName: string, description: string, goal: string) => {
  const ai = getAiClient();
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Generate 3 high-converting ad headlines (max 40 chars) and 3 ad descriptions (max 90 chars) for a business named "${businessName}". 
               The business does: "${description}". The campaign goal is: "${goal}". 
               Format the output as a clean JSON object with "headlines" (array of strings) and "descriptions" (array of strings).`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          headlines: {
            type: Type.ARRAY,
            items: { type: Type.STRING }
          },
          descriptions: {
            type: Type.ARRAY,
            items: { type: Type.STRING }
          }
        },
        required: ["headlines", "descriptions"]
      }
    },
  });

  return JSON.parse(response.text || '{"headlines":[], "descriptions":[]}');
};

export const askRuth = async (userMessage: string, chatHistory: {role: 'user' | 'model', parts: {text: string}[]}[]) => {
  const ai = getAiClient();
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: [
      ...chatHistory,
      { role: 'user', parts: [{ text: userMessage }] }
    ],
    config: {
      systemInstruction: "You are Ruth, a world-class Ad Manager for small businesses within the Zest platform. You are strategic, encouraging, and highly analytical. You help users optimize ROI, write better copy, and understand their attribution. Keep answers concise and professional. If asked about technical settings, refer to the Sidebar navigation.",
      temperature: 0.7,
      topP: 0.8,
      maxOutputTokens: 400,
    },
  });

  return response.text || "I'm having a bit of trouble connecting to the network. Could you try that again?";
};
