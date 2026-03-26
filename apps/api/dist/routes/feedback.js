import { Router } from "express";
import { z } from "zod";
export const feedbackRouter = Router();
feedbackRouter.post("/analyze", async (req, res, next) => {
    try {
        const body = z
            .object({
            transcript: z.string().min(2),
            answer: z.string().min(2)
        })
            .parse(req.body);
        const fillerWords = (body.transcript.match(/\b(um|uh|like|you know)\b/gi) ?? []).length;
        const confidenceScore = Math.max(40, 90 - fillerWords * 6);
        const clarityScore = body.answer.length > 150 ? 82 : 68;
        const relevanceScore = body.answer.toLowerCase().includes("impact") ? 88 : 72;
        res.json({
            feedback: {
                confidenceScore,
                clarityScore,
                relevanceScore,
                fillerWords,
                suggestions: [
                    "Lead with context, action, measurable outcome.",
                    "Reduce filler words and keep answer under 90 seconds."
                ]
            }
        });
    }
    catch (error) {
        next(error);
    }
});
