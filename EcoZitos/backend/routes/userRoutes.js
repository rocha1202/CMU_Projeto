import express from "express";
import User from "../models/User.js";

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

    if (!user.friends.includes(targetId)) {
      user.friends.push(targetId);
      await user.save();
    }

    res.json({ message: "Followed successfully", friends: user.friends });
  } catch (error) {
    res.status(500).json({ message: "Error following user", error });
  }
});

router.post("/:id/unfollow", async (req, res) => {
  try {
    const { userId } = req.body;

    const user = await User.findById(userId);
    const targetId = req.params.id;

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.friends = user.friends.filter((f) => f.toString() !== targetId);
    await user.save();

    res.json({ message: "Unfollowed successfully", friends: user.friends });
  } catch (error) {
    res.status(500).json({ message: "Error unfollowing user", error });
  }
});
export default router;