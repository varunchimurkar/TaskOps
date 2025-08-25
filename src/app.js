import express from "express";

const app = express();

app.use(express.json());

import healthCheckRouter from "./routes/healthcheck.routes.js";

import verifyEmail from "./routes/auth.routes.js";

app.use("/api/v1/healthcheck", healthCheckRouter);

app.use("/api/v1/users", verifyEmail);

export default app;
