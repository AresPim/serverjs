import User from '../models/user.js';

// Delete Account
export const deleteAccount = async (req, res) => {
    try {
        //const userId = req.user.id; // Récupérer l'ID de l'utilisateur à partir du jeton d'authentification
        const { userId } = req.body;
        // Rechercher l'utilisateur dans la base de données
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "Utilisateur non trouvé" });
        }

        // Supprimer l'utilisateur de la base de données
        await user.remove();

        res.status(200).json({ message: "Compte utilisateur supprimé avec succès" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Deactivate Account
export const deactivateAccount = async (req, res) => {
    try {
        //const userId = req.user.id; // Récupérer l'ID de l'utilisateur à partir du jeton d'authentification
        const { userId } = req.body;
        // Rechercher l'utilisateur dans la base de données
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "Utilisateur non trouvé" });
        }

        // Mettre à jour le statut du compte de l'utilisateur
        user.status = 'Inactive';
        await user.save();

        res.status(200).json({ message: "Compte utilisateur désactivé avec succès" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
