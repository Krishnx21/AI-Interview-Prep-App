export type ForgeStage = "prompt" | "raw" | "repair" | "polished";

export type ChatMessage = {
  id: string;
  sender: "ai" | "user";
  text: string;
  at: string;
};

export type FeedbackModel = {
  clarity: number;
  confidence: number;
  relevance: number;
  suggestions: string[];
  missingStarParts: string[];
  summary: string;
};

