import { baseUrl } from "../../common/config/constant.config";

export default class GetPostResource {
  constructor(data) {
    return data.map((post) => ({
      _id: post._id,
      userId: post.userId,
      totalLikes: post.totalLikes,
      files:
        post.files.length > 0
          ? post.files.map((f) => ({
              file: baseUrl(f),
            }))
          : null,
      comments:
        post.commentsData.length > 0
          ? post.commentsData.map((c) => ({
              comment: c.comment,
            }))
          : null,
    }));
  }
}
