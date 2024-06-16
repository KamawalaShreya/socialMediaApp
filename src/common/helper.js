import path from "path";
import fs from "fs";
require("dotenv").config();

const secretKey = process.env.JWT_SECRET;

/**
 * randomString : generate random string for given length
 * @param {number} length : length of random string to be generated (default 75)
 * @return {number} : generated random string
 */
export const randomStringGenerator = (givenLength = 75) => {
  const characters =
    givenLength > 10
      ? "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
      : "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const length = givenLength;
  let randomStr = "";

  for (let i = 0; i < length; i++) {
    const randomNum = Math.floor(Math.random() * characters.length);
    randomStr += characters[randomNum];
  }
  return randomStr;
};

/**
 * unlink file from the storage
 * @param {*} filepath
 * @returns
 */
export const unlinkFile = (filepath) => {
  const deletFilePath = path.join(`${__dirname}../../../${filepath}`);
  if (fs.existsSync(deletFilePath)) {
    fs.unlinkSync(deletFilePath);
  }
  return;
};
