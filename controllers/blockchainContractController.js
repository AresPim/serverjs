import BlockchainContract from '../models/blockchainContract.js';

// Créer un nouveau contrat blockchain
export const createContract = async (req, res) => {
    try {
        const { userId, contractAddress, transactionHash, description, contractType } = req.body;
        const newContract = await BlockchainContract.create({ userId, contractAddress, transactionHash, description, contractType });
        res.status(201).json(newContract);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtenir tous les contrats
export const getAllContracts = async (req, res) => {
    try {
        const contracts = await BlockchainContract.find();
        res.status(200).json(contracts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtenir un contrat par son ID
export const getContractById = async (req, res) => {
    try {
        const { id } = req.params;
        const contract = await BlockchainContract.findById(id);
        if (!contract) {
            return res.status(404).json({ message: "Contrat introuvable" });
        }
        res.status(200).json(contract);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Mettre à jour un contrat
export const updateContract = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedContract = await BlockchainContract.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedContract) {
            return res.status(404).json({ message: "Contrat introuvable" });
        }
        res.status(200).json(updatedContract);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Supprimer un contrat
export const deleteContract = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedContract = await BlockchainContract.findByIdAndDelete(id);
        if (!deletedContract) {
            return res.status(404).json({ message: "Contrat introuvable" });
        }
        res.status(200).json({ message: "Contrat supprimé avec succès" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
