import Post from "../models/post.js";
//Create a new post
export async function createPost(req, res) {
  const { title, content, category, userId } = req.body;

  try {
    const newPost = await Post.create({ title, content, category, userId });
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
//Update post
export async function updatePost(req, res) {
  const { id } = req.params;
  const { title, content, category, verified, credibilityScore, userId } = req.body;

  try {
    const updatedPost = await Post.findByIdAndUpdate(id, { title, content, category, verified, credibilityScore, userId }, { new: true });
    if (updatedPost) {
      res.status(200).json(updatedPost);
    } else {
      res.status(404).json({ message: "Poste non trouvé" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
//Get all posts
export async function getAllPosts(req, res) {
  try {
    const posts = await Post.find({});
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
//Get post by id
export async function getPostById(req, res) {
  const { id } = req.params;

  try {
    const post = await Post.findById(id);
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({ message: "Poste non trouvé" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
