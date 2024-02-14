import User from '../models/user.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
//Create a new user
export async function signin(req, res) {
    const { email, password } = req.body;
  
  try {
      const user = await User.findOne({ email, password });
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ message: "Utilisateur non trouvé" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
// Hash Password
export const hashPassword = async (password) => {
    try {
        // Générer un sel pour le hachage
        const salt = await bcrypt.genSalt(10);

        // Hacher le mot de passe avec le sel
        const hashedPassword = await bcrypt.hash(password, salt);

        return hashedPassword;
    } catch (error) {
        throw new Error("Erreur lors du hachage du mot de passe");
    }
};
// Sign Up
export const signUp = async (req, res) => {
  try {
      const { username, password, email, phoneNumber, role, profileImage, reputation } = req.body;

      // Hacher le mot de passe
      const hashedPassword = await hashPassword(password);

      // Créer un nouvel utilisateur avec le mot de passe haché
      const newUser = await User.create({ username, password: hashedPassword, email, phoneNumber, role, profileImage, reputation });

      res.status(201).json(newUser);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};
// Forgot Password
export const forgotPassword = async (req, res) => {
      try {
          const { emailOrPhone } = req.body;
  
          // Vérifier si l'utilisateur existe
          let user = await User.findOne({ email: emailOrPhone });
          if (!user) {
              // Si l'utilisateur n'est pas trouvé par e-mail, chercher par numéro de téléphone
              user = await User.findOne({ phoneNumber: emailOrPhone });
          }
          if (!user) {
              return res.status(404).json({ message: "Utilisateur non trouvé" });
          }
  
          // Générer un jeton de réinitialisation de mot de passe
          const resetToken = jwt.sign({ userId: user._id }, process.env.JWT_RESET_SECRET, { expiresIn: '1h' });
  
          // Envoyer le jeton de réinitialisation de mot de passe par e-mail ou SMS (non implémenté ici)
  
          res.status(200).json({ message: "Vérifiez votre e-mail ou votre téléphone pour réinitialiser votre mot de passe" });
      } catch (error) {
          res.status(500).json({ error: error.message });
      }
  };
  
  
  // Reset Password
  export const resetPassword = async (req, res) => {
      try {
          const { token, newPassword } = req.body;
  
          // Vérifier si le jeton est valide
          const decodedToken = jwt.verify(token, process.env.JWT_RESET_SECRET);
          if (!decodedToken.userId) {
              return res.status(401).json({ message: "Jeton de réinitialisation invalide" });
          }
  
          // Mettre à jour le mot de passe de l'utilisateur
          const user = await User.findById(decodedToken.userId);
          if (!user) {
              return res.status(404).json({ message: "Utilisateur non trouvé" });
          }
  
          // Hasher le nouveau mot de passe
          const hashedPassword = await bcrypt.hash(newPassword, 10);
  
          // Mettre à jour le mot de passe dans la base de données
          user.password = hashedPassword;
          await user.save();
  
          res.status(200).json({ message: "Mot de passe réinitialisé avec succès" });
      } catch (error) {
          res.status(500).json({ error: error.message });
      }
  };
  