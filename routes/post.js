const express = require('express');
const { getPosts, createPost, postsByUser, postById, isPoster, deletePost } = require('../controllers/post');
const { userById } = require("../controllers/user");
const { requireSignin } = require('../controllers/auth');
const { createPostValidator } = require('../validator/index');

const router = express.Router();

router.get("/", getPosts);
router.post("/post/new/:userId", requireSignin, createPost, createPostValidator);
router.get("/posts/by/:userId", requireSignin, postsByUser);
router.delete("/post/:postId", requireSignin, isPoster, deletePost);

// this is for any route containing :userId, so our app will first execute userById()
router.param("userId", userById);
// this is for any route containing :postById, so our app will first execute postById()
router.param("postId", postById);

module.exports = router;