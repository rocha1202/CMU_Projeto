import User from "../models/User.js";
import bcrypt from "bcryptjs";

export const signUp = async (req, res) => {
  try {
    const { email, password, username, type } = req.body;

    if (!email || !password || !username || !type) {
      return res.status(400).json({ message: "Preencha todos os campos" });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "Email já registado" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      email,
      password: hashedPassword,
      username,
      type
    });

    res.status(201).json({
      message: "Conta criada com sucesso!",
      user: newUser
    });
  } catch (error) {
    res.status(500).json({ message: "Erro no servidor", error });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Preencha todos os campos" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Email não encontrado" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(400).json({ message: "Password incorreta" });
    }

    res.status(200).json({
      message: "Login efetuado com sucesso!",
      user,
    });
  } catch (error) {
    res.status(500).json({ message: "Erro no servidor", error });
  }
};