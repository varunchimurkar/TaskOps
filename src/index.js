import app from "./app";
import dotenv from "dotenv";
import connectDB from "./db/connect.js";

dotenv.config({
  path: "./.env",
});

connectDB()
.then(() => {
  app.listen(PORT, () => {
    console.log(`Server on running on port : ${PORT}`)
  })
})
.catch((error) => {
  console.error("MongoDB connection error",error)
  process.exit(1)
})

const PORT = process.env.PORT || 8000

