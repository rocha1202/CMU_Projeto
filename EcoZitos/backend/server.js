import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import challengeRoutes from "./routes/challengeRoutes.js";
import userRoutes from "./routes/userRoutes.js";



const app = express();
app.use(cors());
app.use(express.json());

connectDB();

app.use("/auth", authRoutes);
app.use("/challenges", challengeRoutes);
app.use("/users", userRoutes);

app.listen(5000, () => {
  console.log("Servidor a correr na porta 5000");
});