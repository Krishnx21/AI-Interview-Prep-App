import { NextResponse } from "next/server";
import { z } from "zod";
import { serverEnv } from "@/lib/server-env";

const payloadSchema = z.object({
  interviewId: z.string().min(1)
});

export async function POST(req: Request) {
  const body = payloadSchema.parse(await req.json());
  const resp = await fetch(`${serverEnv.API_BASE_URL}/api/interviews/end`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body)
  });
  const data = await resp.json();
  return NextResponse.json(data, { status: resp.status });
}

