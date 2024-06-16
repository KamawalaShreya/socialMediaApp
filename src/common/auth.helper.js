import bcrypt from "bcrypt";
import moment from "moment";
import jwt from "jsonwebtoken";
import { JWT, BCRYPT } from "./constants/constant";
import AccessToken from "../../model/accessToken";
// import cryptoRandomString from "crypto-random-string";
require("dotenv").config();
const Hours = 8760;

class AuthHelper {
  static async matchHashedPassword(password, userPassword) {
    const hashedPassword = await new Promise((resolve, reject) => {
      bcrypt.compare(password, userPassword, (err, res) => {
        if (err) reject(err);
        resolve(res);
      });
    });
    return hashedPassword;
  }

  /**
   * Generate bcrypt Password
   *
   * @param String password
   * @return Response
   */
  static async bcryptPassword(password) {
    const hashedPassword = await new Promise((resolve, reject) => {
      bcrypt.hash(password, BCRYPT.SALT_ROUND, (err, hash) => {
        if (err) reject(err);
        resolve(hash);
      });
    });
    return hashedPassword;
  }

  /**
   * JWT access token generator
   * @param {*} data
   * @returns
   */
  static async accessTokenGenerator(userId, jti) {
    await this.storeAccessToken(userId, jti);

    return await jwt.sign(
      {
        id: userId,
        jti,
      },
      JWT.SECRET,
      { expiresIn: JWT.EXPIRES_IN }
    );
  }

  /**
   * JWT token generator
   * @param {*} data
   * @returns
   */
  // static async tokensGenerator(userId) {
  //   const cryptoString = cryptoRandomString({
  //     length: 40,
  //     characters: "abcdefg1234567890",
  //   });
  //   const accessToken = await this.accessTokenGenerator(userId, cryptoString);

  //   return { accessToken };
  // }

  /**
   * JWT token generator
   * @param {*} data
   * @returns
   */
  static async tokenGenerator(data) {
    return await jwt.sign(data, JWT.SECRET, {
      expiresIn: data.code ? "1h" : JWT.EXPIRES_IN,
    });
  }

  /**
   * Get data from jwt token
   * @param {*} token
   * @returns
   */
  static async getDataFromToken(token) {
    return jwt.verify(token, JWT.SECRET);
  }

  /**
   * Store access token to database
   *
   * @param Object user
   * @param String cryptoString
   * @return Response
   */
  static async storeAccessToken(userId, cryptoString) {
    const expiredAt = moment(new Date())
      .utc()
      .add(Hours, "hours")
      .format("YYYY-MM-DD hh:mm:ss");

    await AccessToken.create({
      token: cryptoString,
      userId,
      expires_at: expiredAt,
    });

    return true;
  }
}

export default AuthHelper;
