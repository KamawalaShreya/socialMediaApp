import Post from "../../model/post";
import { PAGINATION } from "../common/constants/constant";
import mongoose from "mongoose";
import { NotFoundException } from "../error-exception";
import { unlinkFile } from "../common/helper";
import Like from "../../model/like";
import Comment from "../../model/comment";
import GetPostResource from "./resource/post.resource";
const ObjectId = mongoose.Types.ObjectId;

class PostService {
  static async index(authUser, reqData) {
    const currentPage = reqData.page || PAGINATION.DEFAULT_PAGE;
    const perPage = reqData.perPage || PAGINATION.DEFAULT_PER_PAGE;
    const skip = Number((currentPage - 1) * perPage);
    const limit = Number(perPage);

    let pipeline = [];

    if (reqData.userId) {
      pipeline.push({
        $match: {
          userId: new ObjectId(reqData.userId),
        },
      });
    }

    if (reqData.searchByHashtag) {
      pipeline.push({
        $match: {
          caption: {
            $regex: reqData.searchByHashtag,
            $options: "i",
          },
        },
      });
    }

    pipeline.push({
      $lookup: {
        from: "comments",
        localField: "_id",
        foreignField: "postId",
        as: "commentsData",
      },
    });
    let totalPosts = 0;
    if (pipeline.length > 0) {
      totalPosts = await Post.aggregate(pipeline);
    } else {
      totalPosts = await Post.find();
    }

    pipeline.push(
      {
        $skip: skip,
      },
      {
        $limit: limit,
      }
    );
    const posts = await Post.aggregate(pipeline);
    return {
      data: new GetPostResource(posts),
      meta: {
        total: totalPosts.length,
        get lastPage() {
          return this.total ? Math.ceil(Number(this.total / this.perPage)) : 0;
        },
        perPage: Number(perPage),
        currentPage: Number(currentPage),
      },
    };
  }
  /**
   * @description Add post
   * @param {*} authUser
   * @param {*} files
   * @param {*} reqData
   */
  static async create(authUser, files, reqData) {
    reqData.files = [];
    reqData.userId = authUser._id;
    const regularResponse = Object.assign({}, files);
    if (
      regularResponse.files &&
      Array.isArray(regularResponse.files) &&
      regularResponse.files.length > 0
    ) {
      await Promise.all(
        regularResponse.files.map(async (file) => {
          await reqData.files.push(file.destination + "/" + file.filename);
        })
      );
    }
    await Post.create(reqData);
  }

  static async updatePost(authUser, id, files, reqData) {
    const findPost = await Post.findOne({ _id: id._id });

    if (!findPost) {
      throw new NotFoundException("Post not found.");
    }

    reqData.userId = authUser._id;
    const regularResponse = Object.assign({}, files);

    if (
      regularResponse.files &&
      Array.isArray(regularResponse.files) &&
      regularResponse.files.length > 0
    ) {
      reqData.files = [];

      // unlink old files
      if (findPost.files.length > 0) {
        for (const f of findPost.files) {
          console.log("====================================");
          console.log(f);
          console.log("====================================");
          unlinkFile(f);
        }
      }
      await Promise.all(
        regularResponse.files.map(async (file) => {
          await reqData.files.push(file.destination + "/" + file.filename);
        })
      );
    }

    await Post.updateOne({ _id: id._id }, reqData);
  }

  static async deletePost(authUser, reqData) {
    const findPost = await Post.findOne({
      _id: reqData._id,
      userId: authUser._id,
    });

    if (!findPost) {
      throw new NotFoundException("Post not found.");
    }

    // unlink old files
    if (findPost.files.length > 0) {
      for (const f of findPost.files) {
        console.log(f);
        unlinkFile(f);
      }
    }
  }

  static async like(authUser, reqData) {
    const findPost = await Post.findOne({ _id: reqData._id });

    if (!findPost) {
      throw new NotFoundException("Post not found");
    }

    const findLike = await Like.findOne({
      postId: reqData._id,
      userId: authUser._id,
    });

    if (findLike) {
      await Like.deleteOne({ _id: findLike._id });

      await Post.updateOne(
        { _id: findPost._id },
        { totalLikes: +findPost.totalLikes - 1 }
      );

      return { type: 1 };
    } else {
      await Like.create({ postId: findPost._id, userId: authUser._id });

      await Post.updateOne(
        { _id: findPost._id },
        { totalLikes: +findPost.totalLikes + 1 }
      );

      return { type: 2 };
    }
  }

  static async comment(authUser, reqData) {
    const findPost = await Post.findOne({ _id: reqData.postId });

    if (!findPost) {
      throw new NotFoundException("Post not found");
    }

    await Comment.create({
      userId: authUser._id,
      postId: reqData.postId,
      comment: reqData.comment,
    });
  }
}

export default PostService;
