import Challenge from "../models/Challenge.js";

// GET ALL
export const getChallenges = async (req, res) => {
  try {
    const challenges = await Challenge.find();
    res.status(200).json(challenges);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar challenges", error });
  }
};

// GET BY ID
export const getChallengeById = async (req, res) => {
  try {
    const challenge = await Challenge.findById(req.params.id);
    if (!challenge) {
      return res.status(404).json({ message: "Challenge não encontrado" });
    }
    res.status(200).json(challenge);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar challenge", error });
  }
};

// CREATE (caso precises no futuro)
export const createChallenge = async (req, res) => {
  try {
    const newChallenge = await Challenge.create(req.body);
    res.status(201).json(newChallenge);
  } catch (error) {
    res.status(500).json({ message: "Erro ao criar challenge", error });
  }
};