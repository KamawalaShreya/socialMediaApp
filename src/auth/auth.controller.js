import GetUserResource from "../user/resource/get-user.resource";
import UserService from "../user/user.service";
import authService from "./auth.service";
const expiresInSeconds = 31536000;

class AuthController {
  /**
   * User login
   * @param {*} req
   * @param {*} res
   */
  static async loginUser(req, res) {
    const loginUser = await authService.loginUser(req.body);

    return res.send({
      data: {
        ...new GetUserResource([loginUser]),
        auth: {
          tokenType: "Bearer",
          accessToken: loginUser.tokens,
          expiresIn: expiresInSeconds,
        },
      },
    });
  }

  /**
   * User Registration
   * @param {*} req
   * @param {*} res
   */
  static async registerUser(req, res) {
    const userData = await authService.registerUser(
      req.params.residenceId,
      req.file,
      req.body
    );

    return res.send({
      message: "You have singed up successfully!.",
      data: {
        auth: {
          tokenType: "Bearer",
          accessToken: userData.tokens,
          expiresIn: expiresInSeconds,
        },
      },
    });
  }

  /**
   * Auth logout
   * @param {*} req
   * @param {*} res
   * @returns
   */
  static async logoutUser(req, res) {
    await UserService.userLogout(req.user);

    return res.send({ message: "User logged out successfully" });
  }
}

export default AuthController;
