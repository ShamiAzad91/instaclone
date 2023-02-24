const User = require("../models/user");
const Post = require("../models/post");

exports.userProfile = async (req, res) => {
  try {
    let user = await User.findOne({ _id: req.params.userid }).select("-password");
    // console.log("hhh", user);
    if (!user)
      return res
        .status(400)
        .json({ error: "unable to get the user", status: "failed" });
    let posts = await Post.findOne({ postedBy: req.params.userid }).populate(
      "postedBy",
      "_id name"
    );
    if (!posts)
      return res
        .status(400)
        .json({
          error: "unable to get the post by this user",
          status: "failed",
        });
    return res.json({user,posts})
  } catch (err) {
    return res
      .status(500)
      .json({
        err: err.message,
        message: "Something went wrong",
        status: "failed",
      });
  }
};
