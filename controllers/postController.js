const { validationResult } = require('express-validator');
const mongoose = require('mongoose');

const HttpError = require('../helpers/HttpError');
const Post = require('../models/post');
const User = require('../models/user');

//get all posts
const getAllPosts = async (req, res, next) => {

  let posts;
  try {
    posts = await Post.find({}).populate('postedBy', '_id name');
  } catch (err) {
    const error = new HttpError(
      'Creating post failed, please try again.',
      500
    );
    return next(error);
  }

  if (!posts) {
    const error = new HttpError('Could not find user for provided id.', 404);
    return next(error);
  }
  // res.json({ posts: posts.toObject({ getters: true }) });

  res.status(200).json({ posts });
};


// create new post
const addNewPost = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError('Invalid inputs passed, please check your data.', 422)
    );
  }

  const { title, description, image } = req.body;

  const createdPost = new Post({
    title,
    description,
    image,
    postedBy: req.userData.userId
  });

  let user;
  try {
    user = await User.findById(req.userData.userId);
  } catch (err) {
    const error = new HttpError(
      'Creating post failed, please try again.',
      500
    );
    return next(error);
  }

  if (!user) {
    const error = new HttpError('Could not find user for provided id.', 404);
    return next(error);
  }

  console.log(user);

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await createdPost.save({ session: sess });
    user.posts.push(createdPost);
    await user.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    const error = new HttpError(
      'Creating post failed, please try again.',
      500
    );
    return next(error);
  }

  res.status(201).json({ post: createdPost });
};

//get My Posts

const getMyPosts = async (req, res, next) => {

  let posts;
  try {
    posts = await Post.find({ postedBy: req.userData.userId }).populate('postedBy', '_id name');
  } catch (err) {
    const error = new HttpError(
      'Creating post failed, please try again.',
      500
    );
    return next(error);
  }

  if (!posts) {
    const error = new HttpError('Could not find user for provided id.', 404);
    return next(error);
  }
  // res.json({ posts: posts.toObject({ getters: true }) });

  res.status(200).json({ posts });
};

exports.getAllPosts = getAllPosts;
exports.addNewPost = addNewPost;
exports.getMyPosts = getMyPosts;

