import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://40220247_db_user:MYRZ9hW5k5a9tzPB@cluster0.7mw4kxg.mongodb.net/ecozitos?retryWrites=true&w=majority"
    );

    console.log("MongoDB Atlas conectado!");
  } catch (error) {
    console.error("Erro ao conectar ao MongoDB Atlas:", error);
  }
};