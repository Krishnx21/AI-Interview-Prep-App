import { create } from "zustand";
import type { ChatMessage, FeedbackModel, ForgeStage } from "@/types/interview";

type InterviewSessionState = {
  interviewId: string | null;
  stage: ForgeStage;
  question: string;
  answer: string;
  messages: ChatMessage[];
  feedback: FeedbackModel | null;
  finalScore: number | null;
  isSubmitting: boolean;
  error: string | null;
  setInterviewId: (id: string | null) => void;
  setStage: (stage: ForgeStage) => void;
  setQuestion: (question: string) => void;
  setAnswer: (answer: string) => void;
  setFeedback: (feedback: FeedbackModel | null) => void;
  setFinalScore: (score: number | null) => void;
  setSubmitting: (isSubmitting: boolean) => void;
  setError: (error: string | null) => void;
  pushMessage: (msg: ChatMessage) => void;
  reset: () => void;
};

const initialMessages: ChatMessage[] = [
  {
    id: "ai-start",
    sender: "ai",
    text: "Welcome to Narrative Forge. Tell me about a project where you solved a difficult problem.",
    at: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }
];

const initialState = {
  interviewId: null,
  stage: "prompt" as ForgeStage,
  question: "Tell me about a project where you solved a difficult problem.",
  answer: "",
  messages: initialMessages,
  feedback: null,
  finalScore: null,
  isSubmitting: false,
  error: null
};

export const useInterviewSessionStore = create<InterviewSessionState>((set) => ({
  ...initialState,
  setInterviewId: (interviewId) => set({ interviewId }),
  setStage: (stage) => set({ stage }),
  setQuestion: (question) => set({ question }),
  setAnswer: (answer) => set({ answer }),
  setFeedback: (feedback) => set({ feedback }),
  setFinalScore: (finalScore) => set({ finalScore }),
  setSubmitting: (isSubmitting) => set({ isSubmitting }),
  setError: (error) => set({ error }),
  pushMessage: (msg) => set((state) => ({ messages: [...state.messages, msg] })),
  reset: () => set(initialState)
}));

