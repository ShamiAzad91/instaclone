const Post = require("../models/post");

exports.createPost = async (req, res) => {
  try {
    const { title, body, pic } = req.body;
    // console.log(title,body,pic)
    if (!title || !body || !pic)
      return res
        .status(422)
        .json({ error: "Plz include all the fields", status: "failed" });

    req.user.password = undefined;

    const post = new Post({
      title,
      body,
      photo: pic,
      postedBy: req.user,
    });
    const result = await post.save();
    if (!result)
      return res
        .status(400)
        .json({ error: "unable to create the post", status: "failed" });
    return res.status(200).json({
      post: result,
      message: "successfully created the post",
      status: "success",
    });
  } catch (err) {
    return res.status(500).json({
      err: err.message,
      error: "Somethings went wrong",
      status: "failed",
    });
  }
};

exports.getAllPost = async (req, res) => {
  try {
    const post = await Post.find()
      .populate("postedBy", "_id name")
      .populate("comments.postedBy", "_id name");
    if (!post)
      return res
        .status(400)
        .json({ error: "unable to get the post", status: "failed" });
    return res.status(200).json({
      posts: post,
      message: "All the post is here",
      status: "success",
    });
  } catch (err) {
    return res.status(500).json({
      err: err.message,
      error: "Somethings went wrong",
      status: "failed",
    });
  }
};

exports.getMyPost = async (req, res) => {
  try {
    let post = await Post.find({ postedBy: req.user._id }).populate(
      "postedBy",
      "_id name"
    );
    if (!post)
      return res
        .status(400)
        .json({ error: "unable to get the post", status: "failed" });
    return res.status(200).json({
      posts: post,
      message: "All my  post is here",
      status: "success",
    });
  } catch (err) {
    return res.status(500).json({
      err: err.message,
      error: "Somethings went wrong",
      status: "failed",
    });
  }
};

exports.likePost = async (req, res) => {
  try {
    let result = await Post.findByIdAndUpdate(
      req.body.postId,
      { $push: { likes: req.user._id } },
      { new: true }
    );

    if (!result)
      return res
        .status(400)
        .json({ error: "unable to like the post", status: "failed" });
    return res.status(200).json({
      likes: result,
      message: "successfully like the post",
      status: "success",
    });
  } catch (err) {
    return res.status(500).json({
      err: err.message,
      error: "Somethings went wrong",
      status: "failed",
    });
  }
};
exports.unlikePost = async (req, res) => {
  try {
    let result = await Post.findByIdAndUpdate(
      req.body.postId,
      { $pull: { likes: req.user._id } },
      { new: true }
    );

    if (!result)
      return res
        .status(400)
        .json({ error: "unable to unlike the post", status: "failed" });
    return res.status(200).json({
      likes: result,
      message: "successfully unlike the post",
      status: "success",
    });
  } catch (err) {
    return res.status(500).json({
      err: err.message,
      error: "Somethings went wrong",
      status: "failed",
    });
  }
};

exports.commentOnPost = async (req, res) => {
  try {
    let comment = {
      text: req.body.text,
      postedBy: req.user._id,
    };

    let result = await Post.findByIdAndUpdate(
      req.body.postId,
      { $push: { comments: comment } },
      { new: true }
    )
      .populate("comments.postedBy", "_id name")
      .populate("postedBy", "_id name");
    if (!result)
      return res
        .status(400)
        .json({ error: "unable to comment  the post", status: "failed" });
    return res.status(200).json({
      comments: result,
      message: "successfully comment the post",
      status: "success",
    });
  } catch (err) {
    return res.status(500).json({
      err: err.message,
      error: "Somethings went wrong",
      status: "failed",
    });
  }
};

exports.deletePost = async (req, res) => {
  try {
    // let pro = await Post.findOne({_id:req.params.postId});
    // console.log("hiii",pro.id);
    let post = await Post.findOne({ _id: req.params.postId }).populate(
      "postedBy",
      "_id name"
    );
    // console.log("hiii",post)
    if (!post)
      return res
        .status(400)
        .json({ error: "unable to get the post", status: "failed" });
    if (post.postedBy._id.toString() === req.user._id.toString()) {
      let result = await post.remove();
      return res.status(200).json(result);
    } else {
      return res
        .status(400)
        .json({ error: "this is not your post", status: "failed" });
    }
  } catch (err) {
    return res.status(500).json({
      err: err.message,
      error: "Somethings went wrong",
      status: "failed",
    });
  }
};
