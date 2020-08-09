const express = require('express');
const { getPosts, createPost } = require('../controllers/post');
const { userById } = require("../controllers/user");
const { requireSignin } = require('../controllers/auth');
const { createPostValidator } = require('../validator/index');

const router = express.Router();

router.get("/", requireSignin, getPosts);
router.post("/post", createPostValidator, createPost);
router.param("userId", userById);

module.exports = router;