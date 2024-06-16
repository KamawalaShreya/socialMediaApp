import GetUserResource from "./resource/get-user.resource";
import UserServices from "./user.service";

class UserController {
  /**
   * Update user data
   * @param {*} req
   * @param {*} res
   */
  static async updateUserData(req, res) {
    const data = await UserServices.updateUserData(
      req.body,
      req.file,
      req.user
    );

    return res.send({
      message: "User update successfully.",
      data: new GetUserResource(data),
    });
  }

  /**
   * Get user data
   * @param {*} req
   * @param {*} res
   */
  static async getUserData(req, res) {
    const data = await UserServices.getUserData(req.user);

    return res.send({ data: new GetUserResource(data) });
  }

  /**
   * Delete user account
   * @param {*} req
   * @param {*} res
   */
  static async deleteUserAccount(req, res) {
    await UserServices.deleteUserAccount(req.user);

    return res.send({ message: "User account deleted successfully." });
  }

  static async follow(req, res) {
    await UserServices.follow(req.user, req.body);

    return res.send({ message: "Follow successfully" });
  }
}

export default UserController;
