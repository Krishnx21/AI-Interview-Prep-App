import OpenAI from "openai";
import { NextResponse } from "next/server";
import { z } from "zod";
import { serverEnv } from "@/lib/server-env";

const schema = z.object({
  transcript: z.string().min(2),
  answer: z.string().min(2)
});

export async function POST(req: Request) {
  const body = schema.parse(await req.json());

  if (!serverEnv.OPENAI_API_KEY) {
    return NextResponse.json({
      feedback: {
        summary: "OPENAI_API_KEY missing. Returning fallback feedback.",
        confidenceScore: 70,
        clarityScore: 72,
        relevanceScore: 74
      }
    });
  }

  const openai = new OpenAI({ apiKey: serverEnv.OPENAI_API_KEY });
  const prompt = `You are an interview coach. Analyze answer quality and return JSON with keys: summary, confidenceScore, clarityScore, relevanceScore, suggestedImprovements (array). Transcript: ${body.transcript}\nAnswer:${body.answer}`;
  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    temperature: 0.2,
    messages: [{ role: "user", content: prompt }]
  });
  const raw = completion.choices[0]?.message?.content ?? "{}";
  return NextResponse.json({ feedback: raw });
}

