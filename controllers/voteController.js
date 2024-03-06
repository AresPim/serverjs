import Vote from '../models/vote.js';
import User from '../models/user.js';
//Save a new vote
export async function saveVote(req, res) {
  try {
      const { userId, postId, isTrue } = req.body;

      // Vérifiez si l'utilisateur a déjà voté sur ce poste
      const existingVote = await Vote.findOne({ userId, postId });

      if (existingVote) {
          // Si l'utilisateur a déjà voté sur ce poste, l'empêcher de voter à nouveau
          return res.status(400).json({ message: "Vous avez déjà voté sur ce poste" });
      } else {
          // Si l'utilisateur n'a pas encore voté sur ce poste, enregistrez le nouveau vote
          const newVote = new Vote({ userId, postId, isTrue });
          await newVote.save();

          // Mettre à jour le compteur de votes de l'utilisateur
          const user = await User.findById(userId);
          if (!user) {
              return res.status(404).json({ message: "Utilisateur non trouvé" });
          }
          user.votesCount += 1;
          await user.save();

          // Vérifier si l'utilisateur est éligible pour un nouveau badgeAchievement
          const SEUIL_POUR_BADGE = 10; // Exemple de seuil pour un nouveau badge
          if (user.votesCount >= SEUIL_POUR_BADGE) {
              user.badgeAchievement = 'Voter régulièrement';
              await user.save();
          }

          res.status(201).json({ message: "Vote enregistré avec succès" });
      }
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
}
//Get all votes
export async function getAllVotes(req, res) {
  try {
    const votes = await Vote.find();
    res.json(votes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
//Get vote by id
export async function getVoteById(req, res) {
  const { id } = req.params;

  try {
    const vote = await Vote.findById(id);
    if (!vote) {
      return res.status(404).json({ message: "Vote non trouvé" });
    }
    res.json(vote);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
