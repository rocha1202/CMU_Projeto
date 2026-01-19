import express from "express";
import User from "../models/User.js";
import bcrypt from "bcryptjs";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar utilizadores" });
  }
});

router.post("/:id/follow", async (req, res) => {
  try {
    const { userId } = req.body; // quem está a seguir
    const targetId = req.params.id; // quem vai ser seguido

    const user = await User.findById(userId);
    const target = await User.findById(targetId);

    if (!user || !target) {
      return res.status(404).json({ message: "User not found" });
    }

    // 1. Adicionar target aos meus friends
    if (!user.friends.includes(targetId)) {
      user.friends.push(targetId);
    }

    // 2. Adicionar user aos followers do target
    if (!target.followers.includes(userId)) {
      target.followers.push(userId);
    }

    await user.save();
    await target.save();

    res.json({
      friends: user.friends,
      followers: target.followers,
    });
  } catch (error) {
    res.status(500).json({ message: "Error following user", error });
  }
});

router.post("/:id/unfollow", async (req, res) => {
  try {
    const { userId } = req.body;
    const targetId = req.params.id;

    const user = await User.findById(userId);
    const target = await User.findById(targetId);

    if (!user || !target) {
      return res.status(404).json({ message: "User not found" });
    }

    // remover target dos meus friends
    user.friends = user.friends.filter((f) => f.toString() !== targetId);

    // remover user dos followers do target
    target.followers = target.followers.filter((f) => f.toString() !== userId);

    await user.save();
    await target.save();

    res.json({
      friends: user.friends,
      followers: target.followers,
    });
  } catch (error) {
    res.status(500).json({ message: "Error unfollowing user", error });
  }
});
router.put("/:id", async (req, res) => {
  try {
    const { email, username } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { email, username },
      { new: true },
    );

    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: "Erro ao atualizar utilizador", error });
  }
});

router.put("/:id/password", async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;

    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Comparar password antiga com o hash
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: "Old password incorrect" });
    }

    // Criar novo hash
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    user.password = hashedPassword;
    await user.save();

    res.json({ success: true, user });
  } catch (error) {
    res.status(500).json({ message: "Error updating password", error });
  }
});

export default router;
