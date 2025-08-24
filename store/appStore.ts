import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { generateChatResponse, generateContentPackage } from '../services/GeminiService';
import { dashboardData } from '../constants/dashboard';
import { projectsData } from '../constants/projects';
import { initialMessages } from '../constants/ai';

// --- UPDATED STAGES ARRAY ---
export const projectStages = ['Not Started', 'Wireframing', 'Documenting', 'Coding', 'Live'];

const calculateProgress = (status: string) => {
  const stageIndex = projectStages.findIndex(s => s === status);
  if (stageIndex === -1) return 0;
  // This logic is robust and will work with the new array length
  return stageIndex / (projectStages.length - 1);
};

type NewProjectData = {
  title: string;
  description: string;
  tags: string[];
  icon: string;
};

interface AppState {
  habits: typeof dashboardData.habits;
  projects: typeof projectsData;
  messages: typeof initialMessages;
  waterIntake: number;
  calorieIntake: number;
  waterGoal: number;
  calorieGoal: number;
  toggleHabit: (id: string) => void;
  addMessage: (text: string) => Promise<void>;
  addHabit: (habitText: string) => void;
  deleteHabit: (id: string) => void;
  updateProjectStatus: (id: string, status: string) => void;
  addProject: (data: NewProjectData) => void;
  generateContent: () => Promise<void>;
  clearChat: () => void;
  addWater: (amount: number) => void;
  addCalories: (amount: number) => void;
  resetDailyStats: () => void;
  resetWater: () => void;
  resetCalories: () => void;
}

const systemPrompt = `
You are a personal AI assistant and mentor integrated into a mobile app called 'Solo System', inspired by the leveling-up system from the anime 'Solo Leveling'.
Your user's name is Jinwoo. You must always address him as such. Your persona is encouraging, slightly futuristic, and system-like, but also deeply insightful and helpful.
You must help Jinwoo level up in his real life, focusing on his tech career, physical health, and content creation.
When responding to general chat, be encouraging and provide clear, actionable advice. Always maintain the persona of a sophisticated AI system designed for his growth.
Example tone: "Analysis complete, Jinwoo. Here is the requested data."
`;

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      habits: dashboardData.habits,
      projects: projectsData,
      messages: initialMessages,
      waterIntake: 0,
      calorieIntake: 0,
      waterGoal: 3000,
      calorieGoal: 2500,

      toggleHabit: (id) => set((state) => ({ habits: state.habits.map((h) => (h.id === id ? { ...h, completed: !h.completed } : h)) })),
      
      addHabit: (habitText) => set((state) => {
        const newHabit = { id: `habit-${Date.now()}`, text: habitText, completed: false, icon: '🎯' };
        return { habits: [newHabit, ...state.habits] };
      }),
      
      deleteHabit: (id) => set((state) => ({ habits: state.habits.filter((h) => h.id !== id) })),
      
      updateProjectStatus: (id, status) => set((state) => ({
        projects: state.projects.map((p) =>
          p.id === id ? { ...p, status: status, progress: calculateProgress(status) } : p
        ),
      })),
      
      addProject: (data) => set((state) => {
        const newProject = {
          id: `proj-${Date.now()}`,
          title: data.title,
          description: data.description,
          tags: data.tags,
          icon: data.icon || '🚀',
          status: 'Not Started',
          progress: 0,
        };
        return { projects: [newProject, ...state.projects] };
      }),
      
      addMessage: async (text: string) => {
        const userMessage = { id: `user-${Date.now()}`, sender: 'user' as const, text };
        const typingMessage = { id: `ai-typing-${Date.now()}`, sender: 'ai' as const, text: '...' };
        const messageHistory = get().messages.filter(m => m.type !== 'suggestion' && m.text !== '...');
        const formattedHistory = [
            { role: "user", parts: [{ text: systemPrompt }] },
            { role: "model", parts: [{ text: "System online. I understand my directives. Ready to assist Jinwoo." }] },
            ...messageHistory.map(msg => ({ role: msg.sender === 'user' ? 'user' : 'model', parts: [{ text: msg.text }] }))
        ];
        set((state) => ({ messages: [...state.messages, userMessage, typingMessage] }));
        const aiResponseText = await generateChatResponse(formattedHistory, text);
        const newAiMessage = { id: `ai-response-${Date.now()}`, sender: 'ai' as const, text: aiResponseText };
        set((state) => ({ messages: state.messages.map(msg => msg.id === typingMessage.id ? newAiMessage : msg) }));
      },
      
      generateContent: async () => {
        const thinkingMessage = { id: `ai-typing-${Date.now()}`, sender: 'ai' as const, text: '...' };
        set((state) => ({ messages: [...state.messages, thinkingMessage] }));
        const currentProjects = get().projects;
        const contentPackageText = await generateContentPackage(currentProjects);
        const newContentMessage = { id: `ai-content-${Date.now()}`, sender: 'ai' as const, text: contentPackageText, type: 'content_package' };
        set((state) => ({ messages: state.messages.map(msg => msg.id === thinkingMessage.id ? newContentMessage : msg) }));
      },
      
      clearChat: () => {
        set({ messages: initialMessages });
      },

      addWater: (amount) => {
        set((state) => ({ waterIntake: state.waterIntake + amount }));
      },

      addCalories: (amount) => {
        set((state) => ({ calorieIntake: state.calorieIntake + amount }));
      },

      resetDailyStats: () => {
        set({ waterIntake: 0, calorieIntake: 0 });
      },

      resetWater: () => {
        set({ waterIntake: 0 });
      },

      resetCalories: () => {
        set({ calorieIntake: 0 });
      },
    }),
    {
      name: 'bextainer-system-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);