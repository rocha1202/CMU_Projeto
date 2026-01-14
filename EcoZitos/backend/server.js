import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";

const app = express();
app.use(cors());
app.use(express.json());

connectDB();

app.use("/auth", authRoutes);

app.listen(5000, () => {
  console.log("Servidor a correr na porta 5000");
});