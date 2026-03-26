import { Router } from "express";
import { prisma } from "../lib/prisma.js";

export const analyticsRouter = Router();

analyticsRouter.get("/performance/:userId", async (req, res, next) => {
  try {
    const interviews = await prisma.interview.findMany({
      where: { userId: req.params.userId, status: "completed" },
      select: { overallScore: true, startedAt: true, interviewType: true }
    });
    const scored = interviews.filter((row) => row.overallScore !== null);
    const averageScore =
      scored.length === 0
        ? 0
        : scored.reduce((sum: number, row: (typeof scored)[number]) => sum + (row.overallScore ?? 0), 0) /
          scored.length;
    res.json({
      metrics: {
        interviewsCount: interviews.length,
        averageScore: Number(averageScore.toFixed(2)),
        trend: scored.map((x: (typeof scored)[number]) => ({ date: x.startedAt, score: x.overallScore })),
        weakAreas: ["confidence", "answer-structure"]
      }
    });
  } catch (error) {
    next(error);
  }
});

