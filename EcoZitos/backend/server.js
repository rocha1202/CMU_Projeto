const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect(
    "mongodb+srv://40220247_db_user:MYRZ9hW5k5a9tzPB@cluster0.7mw4kxg.mongodb.net/ecozitos?retryWrites=true&w=majority"
  )
  .then(() => console.log("MongoDB ligado"))
  .catch((err) => console.log(err));
app.get("/", (req, res) => {
  res.send("API EcoZitos a funcionar");
});
app.use("/auth", require("./routes/auth"));

app.listen(3000, () => console.log("Servidor a correr na porta 3000"));
