import Comment from '../models/comment.js';

// Méthode pour créer un nouveau commentaire
export const createComment = async (req, res) => {
    try {
        const { userId, content } = req.body; 
        const newComment = await Comment.create({ userId, content });
        res.status(201).json(newComment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// Méthode pour récupérer tous les commentaires
export const getAllComments = async (req, res) => {
    try {
        const comments = await Comment.find();
        res.json(comments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Méthode pour récupérer un commentaire par son ID
export const getCommentById = async (req, res) => {
    try {
        const { id } = req.params;
        const comment = await Comment.findById(id);
        if (!comment) {
            return res.status(404).json({ message: "Comment not found" });
        }
        res.json(comment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

/** 
// Méthode pour mettre à jour un commentaire
export const updateComment = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedComment = await Comment.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedComment) {
            return res.status(404).json({ message: "Comment not found" });
        }
        res.json(updatedComment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
*/

// Méthode pour supprimer un commentaire
export const deleteComment = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedComment = await Comment.findByIdAndDelete(id);
        if (!deletedComment) {
            return res.status(404).json({ message: "Comment not found" });
        }
        res.json({ message: "Comment deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
