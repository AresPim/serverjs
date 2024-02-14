import User from "../models/user.js";
import bcrypt from 'bcrypt';

// Edit Profile
export const editProfile = async (req, res) => {
  try {
      const userId = req.user.id; // Récupérer l'ID de l'utilisateur à partir du jeton d'authentification
      const { username, email, phoneNumber, profileImage } = req.body;

      // Rechercher l'utilisateur dans la base de données
      const user = await User.findById(userId);
      if (!user) {
          return res.status(404).json({ message: "Utilisateur non trouvé" });
      }

      // Mettre à jour les champs du profil
      user.username = username || user.username;
      user.email = email || user.email;
      user.phoneNumber = phoneNumber || user.phoneNumber;
      user.profileImage = profileImage || user.profileImage;

      // Enregistrer les modifications dans la base de données
      await user.save();

      res.status(200).json({ message: "Profil mis à jour avec succès", user });
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};
// Get all users
export async function getAllUsers(req, res) {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Get User Details
export const getUserDetails = async (req, res) => {
  try {
      const userId = req.user.id; // Récupérer l'ID de l'utilisateur à partir du jeton d'authentification

      // Rechercher l'utilisateur dans la base de données
      const user = await User.findById(userId);
      if (!user) {
          return res.status(404).json({ message: "Utilisateur non trouvé" });
      }

      res.status(200).json(user);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};

// Change Password
export const changePassword = async (req, res) => {
  try {
      const userId = req.user.id; // Récupérer l'ID de l'utilisateur à partir du jeton d'authentification
      const { currentPassword, newPassword } = req.body;

      // Rechercher l'utilisateur dans la base de données
      const user = await User.findById(userId);
      if (!user) {
          return res.status(404).json({ message: "Utilisateur non trouvé" });
      }

      // Vérifier si le mot de passe actuel est correct
      const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
      if (!isPasswordValid) {
          return res.status(400).json({ message: "Mot de passe actuel incorrect" });
      }

      // Hacher le nouveau mot de passe
      const hashedNewPassword = await bcrypt.hash(newPassword, 10);

      // Mettre à jour le mot de passe dans la base de données
      user.password = hashedNewPassword;
      await user.save();

      res.status(200).json({ message: "Mot de passe changé avec succès" });
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};

// Follow Journalist
export const followJournalist = async (req, res) => {
  try {
      const userId = req.user.id;
      const journalistId = req.params.journalistId; /////////////

      // Ajouter le journaliste suivi à la liste des journalistes suivis par l'utilisateur
      await User.findByIdAndUpdate(userId, { $addToSet: { followedJournalists: journalistId } });

      res.status(200).json({ message: "Journaliste suivi avec succès" });
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};

// Unfollow Journalist
export const unfollowJournalist = async (req, res) => {
  try {
      const userId = req.user.id;
      const journalistId = req.params.journalistId;

      // Retirer le journaliste de la liste des journalistes suivis par l'utilisateur
      await User.findByIdAndUpdate(userId, { $pull: { followedJournalists: journalistId } });

      res.status(200).json({ message: "Journaliste non suivi avec succès" });
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};


