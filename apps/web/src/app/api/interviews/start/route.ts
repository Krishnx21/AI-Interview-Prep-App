import { NextResponse } from "next/server";
import { z } from "zod";
import { serverEnv } from "@/lib/server-env";

const payloadSchema = z.object({
  userId: z.string().min(1),
  title: z.string().min(2),
  role: z.string().min(2),
  company: z.string().optional(),
  interviewType: z.enum(["BEHAVIORAL", "TECHNICAL", "SYSTEM_DESIGN", "ROLE_SPECIFIC"]),
  mode: z.enum(["PRACTICE", "GRADED"])
});

export async function POST(req: Request) {
  const body = payloadSchema.parse(await req.json());
  const resp = await fetch(`${serverEnv.API_BASE_URL}/api/interviews/start`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body)
  });
  const data = await resp.json();
  return NextResponse.json(data, { status: resp.status });
}

