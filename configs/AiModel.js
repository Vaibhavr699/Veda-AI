const { GoogleGenerativeAI } = require("@google/generative-ai");
const OpenAI = require("openai");

// Set your Gemini API key here
const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY || 'AIzaSyBbcFY0HKSS3CjUk50lnbhhlAul2zRucQ4';
const genAI = new GoogleGenerativeAI(apiKey);
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export { openai };


// Get the model
const model = genAI.getGenerativeModel({
  model: "gemini-2.5-pro-preview-03-25",
});


// Configuration for generation
const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 2048,
  responseMimeType: "application/json",
};

// Main function
export const courseOutlineAIModel = model.startChat({
  generationConfig,
  history: [],
});

export const generateNotesAIModel = model.startChat({
  generationConfig: {
    ...generationConfig,
    responseMimeType: "text/plain",
  },
  history: [],
});
