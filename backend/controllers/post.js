import Post from "../models/Post.js";
import User from "../models/User.js";

/* CREATE */
export const createPost = async (req, res) => {
  try {
    const { userId, description, picturePath } = req.body;
    const user = await User.findById(userId);
    const newPost = new Post({
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      location: user.location,
      description,
      userPicturePath: user.picturePath,
      picturePath,
      likes: {},
      comments: [],
    });
    await newPost.save();

    const post = await Post.find();
    res.status(201).json(post);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

/* READ */
export const getFeedPosts = async (req, res) => {
  try {
    const post = await Post.find();
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const post = await Post.find({ userId });
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

/* UPDATE */
export const likePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const post = await Post.findById(id);
    const isLiked = post.likes.get(userId);

    if (isLiked) {
      post.likes.delete(userId);
    } else {
      post.likes.set(userId, true);
    }

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { likes: post.likes },
      { new: true }
    );

    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

//Comments

// In your controllers/post.js file
export const commentPost = async (req, res) => {
  try {
    const postId = req.params.postId;
    const { comment } = req.body;
    const userId = req.user._id; // Assuming you have userId in the token

    // Find the post by its ID
    const post = await Post.findById(postId);

    // If the post doesn't exist, return an error
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    if (!comment || comment.trim() === "") {
      return res.status(400).json({ error: "Comment cannot be empty" });
    }

    // Find user by ID
    const user = await User.findById(userId);

    // If the user doesn't exist, return an error
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Add the comment to the post with user's first and last name
    post.comments.push({
      userId,
      comment,
      firstName: user.firstName,
      lastName: user.lastName,
    });

    // Save the updated post
    const updatedPost = await post.save();

    // Return the updated post
    res.json(updatedPost);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
