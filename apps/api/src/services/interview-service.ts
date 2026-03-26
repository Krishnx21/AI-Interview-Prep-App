import { z } from "zod";
import { prisma } from "../lib/prisma.js";

const startInterviewSchema = z.object({
  userId: z.string().min(1),
  title: z.string().min(2).max(120),
  role: z.string().min(2).max(100),
  company: z.string().max(120).optional(),
  interviewType: z.enum(["BEHAVIORAL", "TECHNICAL", "SYSTEM_DESIGN", "ROLE_SPECIFIC"]),
  mode: z.enum(["PRACTICE", "GRADED"])
});

const submitResponseSchema = z.object({
  interviewId: z.string().min(1),
  question: z.string().min(2),
  answer: z.string().min(2),
  transcript: z.string().optional()
});

export async function startInterview(input: unknown) {
  const parsed = startInterviewSchema.parse(input);
  return prisma.interview.create({
    data: {
      userId: parsed.userId,
      title: parsed.title,
      role: parsed.role,
      company: parsed.company,
      interviewType: parsed.interviewType,
      mode: parsed.mode
    }
  });
}

export async function submitResponse(input: unknown) {
  const parsed = submitResponseSchema.parse(input);
  const response = await prisma.interviewResponse.create({
    data: parsed
  });
  return response;
}

export async function endInterview(interviewId: string) {
  const responses = await prisma.interviewResponse.findMany({
    where: { interviewId },
    orderBy: { createdAt: "asc" }
  });
  const score = Math.min(100, 60 + responses.length * 8);
  const feedback = [
    { category: "clarity", score: Math.max(50, score - 5), improvementTip: "Use STAR structure." },
    { category: "relevance", score: score, improvementTip: "Tie points to impact metrics." },
    { category: "confidence", score: Math.max(45, score - 10), improvementTip: "Pause less and speak decisively." }
  ];
  await prisma.feedbackScore.createMany({
    data: feedback.map((f) => ({ interviewId, ...f }))
  });
  return prisma.interview.update({
    where: { id: interviewId },
    data: {
      endedAt: new Date(),
      status: "completed",
      overallScore: score,
      summary: "Solid responses. Improve concise storytelling and quantified impact."
    },
    include: {
      feedbackScores: true,
      responses: true
    }
  });
}

