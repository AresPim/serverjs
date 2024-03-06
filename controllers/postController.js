import Post from "../models/post.js";
//Create a new post
export async function createPost(req, res) {
  const { title, content,image, category, userId } = req.body;

  try {
    const image = req.file; // Assuming you use middleware like multer for handling file uploads

    // Save the file to the 'uploads' directory
    const imagePath = `uploads/${image.filename}`;

    const newPost = await Post.create({ title, content, category, userId, image: imagePath });
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
    // Map each post to include necessary attributes
    const modifiedPosts = posts.map(post => ({
      _id: post._id,
      userId: post.userId,
      title: post.title,
      image: `http://192.168.0.128:9090/uploads/${post.image}`, // Adjust the URL accordingly
      content: post.content,
      category: post.category,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
    }));
    res.status(200).json(modifiedPosts);
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
