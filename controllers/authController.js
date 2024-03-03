import User from '../models/user.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { generateKeyPairSync } from 'crypto';
import { Client, AccountCreateTransaction, PrivateKey, Hbar } from "@hashgraph/sdk";


//signin
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
      const { username, password, email, phoneNumber, firstName, lastName, gender, role, profileImage } = req.body;

      // Hacher le mot de passe
      const hashedPassword = await hashPassword(password);

      // Créer un nouvel utilisateur avec le mot de passe haché
      const newUser = await User.create({ username, password: hashedPassword, email, phoneNumber, firstName, lastName, gender, role, profileImage });

      res.status(201).json(newUser);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};
/** 
//générer la paire de clés
export function generateKeyPair() {
    const { publicKey, privateKey } = generateKeyPairSync('rsa', {
      modulusLength: 4096,
      publicKeyEncoding: { type: 'spki', format: 'pem' },
      privateKeyEncoding: { type: 'pkcs8', format: 'pem' }
    });
    //console.log(publicKey,privateKey);
    // On appelle la fonction generateKeyPairSync avec deux arguments : 
    //le premier spécifie l'algorithme de cryptographie à utiliser (dans ce cas, RSA)
    //le deuxième est un objet de configuration avec 3 attributs:
    //1)modulusLength spécifie la longueur du module de la clé RSA ici c une longueur de 4096 bits est utilisée
    //2)publicKeyEncoding spécifie le format de l'encodage de la clé publique générée.
    //ici : la clé publique est encodée au format PEM (Privacy-Enhanced Mail) avec un type SPKI (SubjectPublicKeyInfo).
    //3)privateKeyEncoding spécifie le format de l'encodage de la clé privée générée.
    //ici : la clé privée est encodée au format PEM avec un type PKCS#8 (Private-Key Information Syntax Standard).
    return { publicKey, privateKey }; // retourne un objet contenant les clés publique et privée
  }
//créer un compte Hedera pour les utilisateurs/journalistes
async function createHederaAccount(publicKey) {
    const myAccountId = process.env.MY_ACCOUNT_ID;
    const myPrivateKey = process.env.MY_PRIVATE_KEY;

    const client = Client.forTestnet(); // Initialisez le client Hedera
  
    // Créez une clé privée pour le compte opérateur
    const operatorPrivateKey = PrivateKey.fromStringED2551(myPrivateKey);
    
    // Associez le compte opérateur au client
    client.setOperator(myAccountId, operatorPrivateKey);
  
    // Créez une transaction de création de compte avec la clé publique
    const transactionResponse = await new AccountCreateTransaction()
      .setKey(publicKey) // Associez la clé publique au nouveau compte
      .setInitialBalance(Hbar.fromTinybars(1000)) // Définissez le solde initial du nouveau compte
      .execute(client); // Exécutez la transaction sur le réseau Hedera
  
    // Récupérez l'identifiant du compte nouvellement créé
    const accountId = (await transactionResponse.getReceipt(client)).accountId.toString();
  
    return accountId; // Renvoyez l'identifiant du compte nouvellement créé
  }

// Sign Up
export const signUp = async (req, res) => {
    try {
      const { username, password, email, phoneNumber, firstName, lastName, gender, role, profileImage } = req.body;
  
      // Génération des clés cryptographiques
      const { publicKey, privateKey } = generateKeyPair(); 

      // Association des clés avec les comptes sur Hedera
      const hederaAccountId = await createHederaAccount(publicKey);
  
      // Hacher le mot de passe
      const hashedPassword = await hashPassword(password);
  
      // Créer un nouvel utilisateur avec les informations et les clés associées
      const newUser = await User.create({ 
        username, 
        password: hashedPassword, 
        email, 
        phoneNumber, 
        firstName, 
        lastName, 
        gender, 
        role, 
        profileImage, 
        hederaAccountId, // Stocker l'identifiant du compte Hedera dans la base de données
        publicKey // Stocker la clé publique dans la base de données
      });

      res.status(201).json({ message: 'User registered successfully', user: newUser });
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
  