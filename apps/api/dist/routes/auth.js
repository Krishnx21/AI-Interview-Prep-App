import { Router } from "express";
import { z } from "zod";
import { prisma } from "../lib/prisma.js";
export const authRouter = Router();
authRouter.post("/register", async (req, res, next) => {
    try {
        const body = z.object({ email: z.string().email(), name: z.string().min(2) }).parse(req.body);
        const user = await prisma.user.upsert({
            where: { email: body.email },
            update: { name: body.name },
            create: {
                email: body.email,
                name: body.name,
                subscription: { create: { tier: "FREE", status: "active" } }
            }
        });
        res.status(201).json({ user });
    }
    catch (error) {
        next(error);
    }
});
authRouter.post("/login", async (req, res, next) => {
    try {
        const body = z.object({ email: z.string().email() }).parse(req.body);
        const user = await prisma.user.findUnique({ where: { email: body.email } });
        if (!user)
            return res.status(401).json({ error: "Invalid credentials" });
        res.json({ user });
    }
    catch (error) {
        next(error);
    }
});
authRouter.post("/logout", (_req, res) => {
    res.json({ ok: true });
});
