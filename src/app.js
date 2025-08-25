import express from "express";

const app = express();

app.use(express.json());

import userRouter from "./routes/auth.routes.js"

import healthCheckRouter from "./routes/healthcheck.routes.js";

//import verifyEmail from "./routes/auth.routes.js";

//import loginUser from "./routes/auth.routes.js"

app.use("/api/v1/healthcheck", healthCheckRouter);

app.use("/api/v1/users/", userRouter);

//app.use("api/v1/users/", loginUser)



export default app;
