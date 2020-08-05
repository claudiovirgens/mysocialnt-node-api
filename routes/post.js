const express = require('express');
const postController = require('../controllers/post');
const validator = require('../validator/index');

const router = express.Router();

router.get("/", postController.getPosts);
router.post("/post", validator.createPostValidator, postController.createPost);

module.exports = router;