import User from "../../model/user";
// import AuthHelper from "../common/auth.helper";
import AuthHelper from "../common/auth.helper";
import { randomStringGenerator } from "../common/helper";
import { BadRequestException } from "../error-exception";

// import AccessToken from "../../model/accessToken";
const SECRET = process.env.JWT_SECRET || "sarvadhi@123";
const expiresIn = process.env.JWT_EXPIRES_IN || "8760h";

class authService {
  /**
   * Register data
   * @param {*} data
   * @returns
   */
  static async registerUser(residenceId, profileImage, data) {
    data.email = data.email.toLowerCase();

    const emailExist = await User.findOne({
      email: data.email,
    });

    if (emailExist) {
      throw new BadRequestException("Email already in use.");
    }

    if (!profileImage) {
      throw new BadRequestException("Profile image is required.");
    }

    const hashedPassword = await AuthHelper.bcryptPassword(data.password);
    data.password = hashedPassword;

    data.profileImage = profileImage
      ? profileImage.destination + "/" + profileImage.filename
      : null;

    const user = await User.create(data);

    const randomString = randomStringGenerator();

    const token = await AuthHelper.tokenGenerator({
      id: user._id,
      jti: randomString,
    });

    await AuthHelper.storeAccessToken(user, randomString);

    user.tokens = token;

    return user;
  }

  /**
   * Login user
   * @param {*} data
   */
  static async loginUser(data) {
    data.email = data.email.toLowerCase();

    const userExist = await User.findOne({
      email: data.email,
    });
    if (!userExist) {
      throw new BadRequestException("Account does not exist.");
    }

    const matchHashedPassword = await AuthHelper.matchHashedPassword(
      data.password,
      userExist.password
    );

    if (!matchHashedPassword) {
      throw new BadRequestException("Invalid Credentials!");
    }

    const randomString = randomStringGenerator();
    const token = await AuthHelper.tokenGenerator({
      id: userExist._id,
      jti: randomString,
    });

    await AuthHelper.storeAccessToken(userExist, randomString);

    userExist.tokens = token;
    // const tokens = await AuthHelper.tokensGenerator(userExist.id);

    // userExist.tokens = tokens;

    console.log([userExist]);
    return userExist;
  }
}

export default authService;
