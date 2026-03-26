import { Router } from "express";
import { z } from "zod";
import { prisma } from "../lib/prisma.js";
import { endInterview, startInterview, submitResponse } from "../services/interview-service.js";

export const interviewsRouter = Router();

interviewsRouter.post("/start", async (req, res, next) => {
  try {
    const interview = await startInterview(req.body);
    res.status(201).json({ interview });
  } catch (error) {
    next(error);
  }
});

interviewsRouter.post("/submit", async (req, res, next) => {
  try {
    const response = await submitResponse(req.body);
    res.status(201).json({ response });
  } catch (error) {
    next(error);
  }
});

interviewsRouter.post("/end", async (req, res, next) => {
  try {
    const body = z.object({ interviewId: z.string().min(1) }).parse(req.body);
    const interview = await endInterview(body.interviewId);
    res.json({ interview });
  } catch (error) {
    next(error);
  }
});

interviewsRouter.get("/:id", async (req, res, next) => {
  try {
    const interview = await prisma.interview.findUnique({
      where: { id: req.params.id },
      include: { responses: true, feedbackScores: true }
    });
    if (!interview) return res.status(404).json({ error: "Interview not found" });
    res.json({ interview });
  } catch (error) {
    next(error);
  }
});

interviewsRouter.get("/history/:userId", async (req, res, next) => {
  try {
    const rows = await prisma.interview.findMany({
      where: { userId: req.params.userId },
      orderBy: { startedAt: "desc" },
      take: 20
    });
    res.json({ interviews: rows });
  } catch (error) {
    next(error);
  }
});

