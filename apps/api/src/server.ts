import cors from "cors";
import express from "express";
import rateLimit from "express-rate-limit";
import pino from "pino";
import pinoHttp from "pino-http";
import { ZodError } from "zod";
import { env } from "./lib/env.js";
import { analyticsRouter } from "./routes/analytics.js";
import { authRouter } from "./routes/auth.js";
import { feedbackRouter } from "./routes/feedback.js";
import { interviewsRouter } from "./routes/interviews.js";
import { resourcesRouter } from "./routes/resources.js";

const logger = pino({ level: env.NODE_ENV === "production" ? "info" : "debug" });
const app = express();

app.use(pinoHttp({ logger }));
app.use(express.json({ limit: "2mb" }));
app.use(
  cors({
    origin: env.WEB_ORIGIN,
    credentials: true
  })
);

app.use(
  rateLimit({
    windowMs: 60 * 1000,
    max: 50,
    standardHeaders: true,
    legacyHeaders: false
  })
);

app.get("/health", (_req, res) => res.json({ ok: true }));
app.use("/api/auth", authRouter);
app.use("/api/interviews", interviewsRouter);
app.use("/api/feedback", feedbackRouter);
app.use("/api/analytics", analyticsRouter);
app.use("/api/resources", resourcesRouter);

app.use((err: unknown, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  if (err instanceof ZodError) {
    return res.status(400).json({ error: "Validation failed", issues: err.issues });
  }
  logger.error({ err }, "Unhandled API error");
  return res.status(500).json({ error: "Internal server error" });
});

app.listen(env.PORT, () => {
  logger.info(`API server running at http://localhost:${env.PORT}`);
});

