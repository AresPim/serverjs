import User from '../models/user.js';
import bcrypt from 'bcrypt';
import dotenv from "dotenv";
dotenv.config();
import jwt from 'jsonwebtoken';
import {
    Client,
    PrivateKey,
    AccountCreateTransaction,
    AccountBalanceQuery,
    Hbar,
    TransferTransaction,
  } from "@hashgraph/sdk";
  

//signin
export async function signin(req, res) {
    const { email, password } = req.body;
  
    try {
      const user = await User.findOne({ email });
  
      if (user) {
        // Compare hashed passwords
        const isPasswordValid = await bcrypt.compare(password, user.password);
       
        const token = jwt.sign({userId: user._id, role: user.role, username: user.username, firstName: user.firstName, lastName: user.lastName},process.env.JWT_SECRET_KEY,{expiresIn:process.env.JWT_EXPIRE_TIME})

        if (isPasswordValid) {
          res.status(200).json(token);
        } else {
          res.status(404).json({ message: "Utilisateur non trouvé" });
        }
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
//signup with hedera
export const signUp = async (req, res) => {
    try {
        const { username, password, email, phoneNumber, firstName, lastName, gender, role, profileImage, hederaAccountId, publicKey } = req.body;

        // Hacher le mot de passe
        const hashedPassword = await hashPassword(password);

        // Créer un nouvel utilisateur avec le mot de passe haché
        const newUser = await User.create({ username, password: hashedPassword, email, phoneNumber, firstName, lastName, gender, role, profileImage });

        // Créer un compte Hedera pour le nouvel utilisateur
        const HederaAaccountId = await createHederaAccount(username, email); // Appel de la fonction pour créer le compte Hedera

        // Enregistrer l'identifiant du compte Hedera dans l'utilisateur nouvellement créé
        newUser.HederaAaccountId = HederaAaccountId;
        await newUser.save();

        // Créer un jeton JWT pour l'utilisateur
        const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET_KEY, { expiresIn: process.env.JWT_EXPIRE_TIME });

        res.status(201).json(token);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

async function createHederaAccount(username, email) {
    try {
        // Initialiser la connexion à l'API Hedera
        const client = Client.forTestnet(); // Ou Client.forMainnet() pour le réseau principal
        client.setOperator(process.env.MY_ACCOUNT_ID, process.env.MY_PRIVATE_KEY); // Remplacez cela par l'ID et la clé privée de votre compte de déploiement Hedera

        // Générer une nouvelle paire de clés publique/privée pour l'utilisateur
        const newUserPrivateKey = await PrivateKey.generate();
        const newUserPublicKey = newUserPrivateKey.publicKey;

        // Créer un nouveau compte Hedera avec la clé publique générée
        const transactionResponse = await new AccountCreateTransaction()
            .setKey(newUserPublicKey)
            .setMaxTransactionFee(100) // Frais de transaction maximum (100 hbar)
            .setInitialBalance(100) // Solde initial du compte (100 hbar)
            .execute(client);

        // Récupérer l'identifiant de compte attribué
        const HederaAaccountId = (await transactionResponse.getReceipt(client)).toString();

        return HederaAaccountId;
    } catch (error) {
        console.error("Error creating Hedera account:", error);
        throw error;
    }
}

/** 
export const signUp = async (req, res) => {
    try {
        const { username, password, email, phoneNumber, firstName, lastName, gender, role, profileImage } = req.body;
  
        // Hacher le mot de passe
        const hashedPassword = await hashPassword(password);
  
        // Créer un nouvel utilisateur avec le mot de passe haché
        const newUser = await User.create({ username, password: hashedPassword, email, phoneNumber, firstName, lastName, gender, role, profileImage });
  
        //unique token for every user
        const token = jwt.sign({userId: newUser._id},process.env.JWT_SECRET_KEY,{expiresIn:process.env.JWT_EXPIRE_TIME})

        res.status(201).json(token);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
  };
*/
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
  