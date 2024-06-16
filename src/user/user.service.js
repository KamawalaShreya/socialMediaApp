import AccessToken from "../../model/accessToken";
import Follow from "../../model/follow";
import User from "../../model/user";
import { unlinkFile } from "../common/helper";
import { BadRequestException } from "../error-exception";

class UserServices {
  /**
   * Update user
   * @param {*} data
   * @param {*} profileImage
   * @param {*} authUser
   */
  static async updateUserData(data, profileImage, authUser) {
    if (profileImage) {
      unlinkFile(authUser.profileImage);
      data.profileImage =
        profileImage.destination + "/" + profileImage.filename;
    }

    return await User.findOneAndUpdate(
      { _id: authUser._id },
      { ...data },
      { new: true }
    );
  }

  /**
   * Get user data
   * @param {*} authUser
   */
  static async getUserData(authUser) {
    const pipeline = [
      {
        $match: {
          _id: authUser._id,
        },
      },
      {
        $lookup: {
          from: "posts",
          localField: "_id",
          foreignField: "userId",
          as: "posts",
        },
      },

      {
        $lookup: {
          from: "follows",
          localField: "_id",
          foreignField: "toUserId",
          as: "followers",
        },
      },
      {
        $addFields: {
          followerCount: { $size: "$followers" },
        },
      },
    ];

    const users = await User.aggregate(pipeline);

    console.log(users);
    return users;
  }

  /**
   * User logout
   * @param {*} authUser
   * @param {*} deviceId
   */
  static async userLogout(authUser, deviceId) {
    await AccessToken.updateOne({ token: authUser.jti }, { isRevoked: true });

    return;
  }

  static async follow(authUser, reqData) {
    await Follow.create({
      userId: authUser._id,
      toUserId: reqData.toUserId,
    });
  }
}

export default UserServices;
