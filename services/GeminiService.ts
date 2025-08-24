import { GoogleGenerativeAI } from "@google/generative-ai";
import Constants from "expo-constants";

const apiKey = Constants.expoConfig?.extra?.geminiApiKey as string;
if (!apiKey) throw new Error("Gemini API key is not set in app.config.js");

const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const systemPrompt = `
You are a personal AI assistant and mentor integrated into a mobile app called 'Solo System', inspired by the leveling-up system from the anime 'Solo Leveling'.
Your user's name is Jinwoo. You must always address him as such. Your persona is encouraging, slightly futuristic, and system-like, but also deeply insightful and helpful.
You must help Jinwoo level up in his real life, focusing on his tech career, physical health, and content creation.
When responding to general chat, be encouraging and provide clear, actionable advice. Always maintain the persona of a sophisticated AI system designed for his growth.
Example tone: "Analysis complete, Jinwoo. Here is the requested data."
`;

export const generateChatResponse = async (history: any[], newPrompt: string) => {
  try {
    const chat = model.startChat({ history });
    const result = await chat.sendMessage(newPrompt);
    return result.response.text();
  } catch (error) {
    console.error("Gemini API Error (Chat):", error);
    return "System error: Unable to connect to the AI core.";
  }
};

export const generateContentPackage = async (projects: any[]) => {
  try {
    const projectsSummary = projects.map(p => `- ${p.title} (Status: ${p.status})`).join('\n');
    const contentPrompt = `
    Jinwoo requires a daily content package. Your task is to act as his expert social media strategist with the goal of making him an online sensation.
    
    Current System Status - Active Projects:
    ${projectsSummary}

    Based on this data, generate a content package with TWO distinct ideas:
    1.  A "Project Progress" post that connects his work to a trending topic.
    2.  A "Knowledge Sharing" post that explains a trending topic or a core concept related to it.

    For EACH idea, provide:
    -   **LinkedIn Post:** Professional and insightful.
    -   **Twitter (X) Post:** Concise and punchy.
    -   **Instagram Reel Script:** A compelling storytelling format (Hook, Before, Aha!, After, CTA) with visual cues.

    Format the entire output clearly using Markdown. Begin the response with "Content strategy for today is ready, Jinwoo. I've analyzed the latest trends."
    `;
    const result = await model.generateContent(contentPrompt);
    return result.response.text();
  } catch (error) {
    console.error("Gemini API Error (Content):", error);
    return "System error: Failed to generate content package.";
  }
};

export const getCalorieEstimate = async (mealDescription: string) => {
  try {
    const prompt = `
    Analyze the following meal description and provide a realistic calorie estimate.
    
    Meal: "${mealDescription}"

    Your task is to act as an expert nutritionist. Consider standard portion sizes if not specified.
    Your entire response MUST be ONLY the estimated number of calories.
    Do not add any other words, explanations, or "kcal".
    For example, if the estimate is 450 calories, your response should be exactly: 450
    `;
    const result = await model.generateContent(prompt);
    const text = result.response.text().trim();

    if (isNaN(Number(text))) {
        return "Could not calculate. Please try a different description.";
    }
    return text;

  } catch (error) {
    console.error("Gemini API Error (Calories):", error);
    return "Error contacting AI."
  }
};