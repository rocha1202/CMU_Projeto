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

    const alreadyLiked = challenge.likes.some((u) => u.toString() === userId);

    if (alreadyLiked) {
      challenge.likes = challenge.likes.filter((u) => u.toString() !== userId);
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
    const { userId, rating, review, photos } = req.body;

    const challenge = await Challenge.findById(req.params.id);
    if (!challenge)
      return res.status(404).json({ message: "Challenge not found" });

    const newReview = {
      user: userId,
      rating,
      comment: review,
      photos: photos || [],
      hearts: 0,
      createdAt: new Date(),
    };

    challenge.reviews.push(newReview);
    await challenge.save();

    res.json({ success: true, review: newReview });
  } catch (error) {
    res.status(500).json({ message: "Error saving review", error });
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
router.get("/user/:userId/reviews", async (req, res) => {
  try {
    const { userId } = req.params;

    const challenges = await Challenge.find({
      "reviews.user": userId,
    }).populate("reviews.user", "username");

    // Extrair apenas os reviews do user
    const userReviews = [];

    challenges.forEach((ch) => {
      ch.reviews.forEach((r) => {
        if (r.user && r.user._id.toString() === userId) {
          userReviews.push({
            challengeId: ch._id,
            challengeTitle: ch.title,
            rating: r.rating,
            comment: r.comment,
            photos: r.photos,
            createdAt: r.createdAt,
          });
        }
      });
    });

    res.json(userReviews);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar reviews", error });
  }
});
export default router;
