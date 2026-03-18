const { GoogleGenerativeAI } = require("@google/generative-ai");
const OpenAI = require("openai");

// Set your Gemini API key here
const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
if (!apiKey && !process.env.OPENAI_API_KEY) {
  throw new Error("❌ Both NEXT_PUBLIC_GEMINI_API_KEY and OPENAI_API_KEY are missing in .env file");
}

let genAI;
if (apiKey) {
  genAI = new GoogleGenerativeAI(apiKey);
}
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export { openai };


// Get the model
export const model = genAI ? genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
}) : null;


// Configuration for generation
const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 2048,
  responseMimeType: "application/json",
};

// Main function
export const courseOutlineAIModel = model ? model.startChat({
  generationConfig,
  history: [],
}) : null;

export const generateNotesAIModel = model ? model.startChat({
  generationConfig: {
    ...generationConfig,
    responseMimeType: "text/plain",
  },
  history: [],
}) : null;
