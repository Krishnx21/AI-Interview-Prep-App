import { Router } from "express";
export const uploadRouter = Router();
uploadRouter.post("/video", (_req, res) => {
    res.status(501).json({
        error: "Not implemented",
        message: "Use presigned S3 or Cloudinary upload in production."
    });
});
