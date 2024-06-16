import { baseUrl } from "../../common/config/constant.config";

export default class GetUserResource {
  constructor(data) {
    this._id = data[0]._id;
    this.fullName = data[0].fullName;
    this.profileImage = data[0].profileImage
      ? baseUrl(data[0].profileImage)
      : null;
    this.email = data[0].email;
    this.bio = data[0].bio;
    this.posts =
      data[0].posts && data[0].posts.length > 0
        ? data[0].posts.map((post) => ({
            _id: post._id,
            caption: post.caption,
            files:
              post.files.length > 0
                ? post.files.map((file) => ({
                    file: baseUrl(file),
                  }))
                : null,
            likes: post.totalLikes,
          }))
        : null;
    this.follower = data[0].followerCount ? data[0].followerCount : 0;
  }
}
