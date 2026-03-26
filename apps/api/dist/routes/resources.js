import { Router } from "express";
export const resourcesRouter = Router();
resourcesRouter.get("/questions", (_req, res) => {
    res.json({
        questions: [
            { type: "behavioral", prompt: "Tell me about a time you resolved a conflict in your team." },
            { type: "technical", prompt: "How would you optimize a slow API endpoint?" },
            { type: "system_design", prompt: "Design a scalable notification service." }
        ]
    });
});
