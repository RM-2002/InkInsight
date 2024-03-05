import express from "express";
const router = express.Router();
import User from "../models/User.js";
import Post from "../models/Post.js";

//CREATE POST
router.post("/", async (req, res) => {
  try {
    // Find the user by username
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      return res.status(404).json("User not found");
    }

    // Create a new post and include user's firstName and lastName
    const newPost = new Post({
      ...req.body,
      firstName: user.firstName, // Include user's firstName in the new post
      lastName: user.lastName,   // Include user's lastName in the new post
    });

    // Save the new post to the database
    const savedPost = await newPost.save();
    
    // Return the saved post in the response
    res.status(200).json(savedPost);
  } catch (err) {
    // Handle errors
    res.status(500).json(err);
  }
});


//UPDATE POST

router.put("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json("Post not found");
    }

    // Fetch the user's information by username
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      return res.status(404).json("User not found");
    }

    if (post.username === req.body.username) {
      try {
        // Update the post with user's firstName and lastName
        const updatedPost = await Post.findByIdAndUpdate(
          req.params.id,
          {
            $set: {
              ...req.body,
              firstName: user.firstName, // Include user's firstName in the updated post
              lastName: user.lastName,   // Include user's lastName in the updated post
            },
          },
          { new: true }
        );
        res.status(200).json(updatedPost);
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json("You can update only your post!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});


//DELETE POST
router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.username === req.body.username) {
      try {
        await post.deleteOne();
        res.status(200).json("Post has been deleted...");
      } catch (err) {
        res.status(500).json(err);
        console.log(err);
      }
    } else {
      res.status(401).json("You can delete only your post!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET POST
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL POSTS
router.get("/", async (req, res) => {
  const username = req.query.user;
  const catName = req.query.cat;
  try {
    let posts;
    if (username) {
      posts = await Post.find({ username });
    } else if (catName) {
      posts = await Post.find({
        categories: {
          $in: [catName],
        },
      });
    } else {
      posts = await Post.find();
    }
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router
