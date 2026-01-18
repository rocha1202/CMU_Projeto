import express from "express";
import Challenge from "../models/Challenge.js";
import User from "../models/User.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const challenges = await Challenge.find();
    res.json(challenges); // <-- devolve ARRAY
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar challenges", error });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const challenge = await Challenge.findById(req.params.id)
      .populate("participants", "username email")
      .populate("reviews.user", "username email");

    if (!challenge) {
      return res.status(404).json({ message: "Challenge não encontrado" });
    }

    res.json(challenge);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar challenge", error });
  }
});

router.post("/:id/participate", async (req, res) => {
  try {
    const { userId } = req.body;

    const challenge = await Challenge.findById(req.params.id);
    if (!challenge)
      return res.status(404).json({ message: "Challenge não encontrado" });

    if (!challenge.participants.includes(userId)) {
      challenge.participants.push(userId);
      await challenge.save();
    }

    res.json({ participants: challenge.participants });
  } catch (error) {
    res.status(500).json({ message: "Erro ao participar", error });
  }
});
router.post("/:id/unparticipate", async (req, res) => {
  try {
    const { userId } = req.body;

    const challenge = await Challenge.findById(req.params.id);
    if (!challenge)
      return res.status(404).json({ message: "Challenge não encontrado" });

    challenge.participants = challenge.participants.filter(
      (p) => p.toString() !== userId,
    );

    await challenge.save();

    res.json({ participants: challenge.participants });
  } catch (error) {
    res.status(500).json({ message: "Erro ao remover participação", error });
  }
});
router.post("/:id/toggle-like", async (req, res) => {
  try {
    const { userId } = req.body;

    const challenge = await Challenge.findById(req.params.id);
    if (!challenge)
      return res.status(404).json({ message: "Challenge não encontrado" });

    const alreadyLiked = challenge.likes.some(
      (u) => u.toString() === userId
    );

    if (alreadyLiked) {
      challenge.likes = challenge.likes.filter(
        (u) => u.toString() !== userId
      );
    } else {
      challenge.likes.push(userId);
    }

    await challenge.save();

    res.json({ likes: challenge.likes });
  } catch (error) {
    res.status(500).json({ message: "Erro ao alternar like", error });
  }
});
router.post("/:id/review", async (req, res) => {
  try {
    const { userId, comment, stars } = req.body;

    const challenge = await Challenge.findById(req.params.id);
    if (!challenge)
      return res.status(404).json({ message: "Challenge não encontrado" });

    const review = {
      user: userId,
      comment,
      stars,
      hearts: 0,
      createdAt: new Date(),
    };

    challenge.reviews.push(review);
    await challenge.save();

    res.json(challenge.reviews);
  } catch (error) {
    res.status(500).json({ message: "Erro ao adicionar review", error });
  }
});

router.post("/:id/photo", async (req, res) => {
  try {
    const { photoUrl } = req.body;

    const challenge = await Challenge.findById(req.params.id);
    if (!challenge)
      return res.status(404).json({ message: "Challenge não encontrado" });

    challenge.photos.push(photoUrl);
    await challenge.save();

    res.json(challenge.photos);
  } catch (error) {
    res.status(500).json({ message: "Erro ao adicionar foto", error });
  }
});

export default router;
