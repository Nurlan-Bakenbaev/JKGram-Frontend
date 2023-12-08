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
  console.log(req.body);
  try {
    const postId = req.params.postId;
    const { comment, userId, firstName, lastName } = req.body;
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    if (!comment || comment.trim() === "") {
      return res.status(400).json({ error: "Comment cannot be empty" });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    post.comments.push({
      userId,
      firstName,
      lastName,
      comment,
    });

    const updatedPost = await post.save();

    res.json(updatedPost);
  } catch (err) {
    console.error("Error commenting on post:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//DELETE COMMENT

export const deleteComment = async (req, res) => {
  try {
    const postId = req.params.postId;
    const commentId = req.params._id;

    // Find the post by its ID
    const post = await Post.findById(postId);

    // If the post doesn't exist, return an error
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    // Find the index of the comment in the post's comments array
    const commentIndex = post.comments.findIndex(
      (comment) => comment._id.toString() === commentId
    );

    // If the comment doesn't exist, return an error
    if (commentIndex === -1) {
      return res.status(404).json({ error: "Comment not found" });
    }

    // Remove the comment from the comments array
    post.comments.splice(commentIndex, 1);

    // Save the updated post
    const updatedPost = await post.save();

    res.json(updatedPost);
  } catch (err) {
    console.error("Error deleting comment:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
