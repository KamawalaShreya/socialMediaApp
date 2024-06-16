import Post from "../../model/post";
import authenticateUser from "../common/middlewares/authenticate-user";
import PostService from "./post.service";

class PostController {
  static async index(req, res) {
    const { data, meta } = await PostService.index(req.user, req.query);

    return res.send({ data, meta });
  }
  /**
   * @description Add Post
   */
  static async create(req, res) {
    const post = await PostService.create(req.user, req.files, req.body);

    return res.send({ message: "Post Uploaded Successfully" });
  }

  /**
   * @description update post
   * @param {*} req
   * @param {*} res
   * @returns
   */
  static async updatePost(req, res) {
    const post = await PostService.updatePost(
      req.user,
      req.query,
      req.files,
      req.body
    );

    return res.send({ message: "Post Updated Successfully" });
  }

  /**
   * @description Delete Post
   * @param {*} req
   * @param {*} res
   * @returns
   */
  static async deletePost(req, res) {
    await PostService.deletePost(req.user, req.query);

    return res.send({ message: "Post Deleted Successfully." });
  }

  /**
   * @description Delete Post
   * @param {*} req
   * @param {*} res
   * @returns
   */
  static async like(req, res) {
    const data = await PostService.like(req.user, req.query);

    console.log(data);
    return res.send({
      message: data.type == 2 ? "Post liked" : "Post dislike",
    });
  }

  /**
   * @description Delete Post
   * @param {*} req
   * @param {*} res
   * @returns
   */
  static async comment(req, res) {
    await PostService.comment(req.user, req.body);

    return res.send({ message: "Comment Added." });
  }
}

export default PostController;
