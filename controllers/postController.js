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

//get My Posts-Profile

const getProfile = async (req, res, next) => {

  let profile;
  try {
    profile = await Post.find({ postedBy: req.userData.userId }).populate('postedBy', '_id name');
  } catch (err) {
    const error = new HttpError(
      'Creating post failed, please try again.',
      500
    );
    return next(error);
  }

  if (!profile) {
    const error = new HttpError('Could not find user for provided id.', 404);
    return next(error);
  }

  res.status(200).json({ profile });
};

//liked posts
const likePost = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    const error = new HttpError('The input is incorrect!');
    return next(error);
  }

  const { postId } = req.body;

  let likedPost;
  try {
    likedPost = await Post.findByIdAndUpdate(postId, { $push: { likes: req.userData.userId } }, { new: true }).populate('postedBy', 'name');
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not like post.',
      500
    );
    return next(error);
  }

  try {
    await likedPost.save();
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not like post.',
      500
    );
    return next(error);
  }

  res.status(200).json(likedPost);
};

//unliked post
const unLikePost = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    const error = new HttpError('The input is incorrect!');
    return next(error);
  }

  const { postId } = req.body;

  let unLikedPost;
  try {
    unLikedPost = await Post.findByIdAndUpdate(postId, { $pull: { likes: req.userData.userId } }, { new: true }).populate('postedBy', 'name');
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not unlike post.',
      500
    );
    return next(error);
  }

  try {
    await unLikedPost.save();
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not unlike post.',
      500
    );
    return next(error);
  }

  res.status(200).json(unLikedPost);
};

exports.getAllPosts = getAllPosts;
exports.addNewPost = addNewPost;
exports.getProfile = getProfile;
exports.likePost = likePost;
exports.unLikePost = unLikePost;


