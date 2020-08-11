const express = require('express');
const { getPosts, createPost } = require('../controllers/post');
const { userById } = require("../controllers/user");
const { requireSignin } = require('../controllers/auth');
const { createPostValidator } = require('../validator/index');

const router = express.Router();

router.get("/", getPosts);
router.post("/post/new/:userId", requireSignin, createPost, createPostValidator);


router.param("userId", userById);

module.exports = router;