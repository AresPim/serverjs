import Journalist from '../models/journalist.js';
 
// Méthode pour créer un nouveau journaliste

export async function createJournalist(req, res){
    try {
        const newJournalist = await Journalist.create(req.body);
        res.status(201).json(newJournalist);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Méthode pour récupérer tous les journalistes
export async function getAllJournalists(req, res){
    try { 
        const journalists = await Journalist.find();
        res.json(journalists);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Méthode pour récupérer un journaliste par son ID
export async function getJournalistById(req, res){
    try {
        const { id } = req.params;
        const journalist = await Journalist.findById(id);
        if (!journalist) {
            return res.status(404).json({ message: "Journalist not found" });
        }
        res.json(journalist);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Méthode pour mettre à jour un journaliste
export async function updateJournalist(req, res){
    try {
        const { id } = req.params;
        const updatedJournalist = await Journalist.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedJournalist) {
            return res.status(404).json({ message: "Journalist not found" });
        }
        res.json(updatedJournalist);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
