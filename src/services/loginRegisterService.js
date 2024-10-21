import db from "../models/index.js";
import { Op } from "sequelize";
import {getGroupWithRoles} from '../services/JWTservice.js';
import {createJWT} from '../middleware/JWTAction.js'
//Encrypting password
import bcrypt from "bcryptjs";
const salt = bcrypt.genSaltSync(10);
//Hashing password
const hashUserPassword = async (userPassword) => {
  let hashPassword = bcrypt.hashSync(userPassword, salt);
  // console.log(`>>>hashPassword`, hashPassword)
  return hashPassword;
};
//=========VALIDATION========
const checkEmailExist = async (userEmail) => {
  let user = await db.User.findOne({
    where: {
      email: userEmail,
    },
  });
  if (user) {
    return true; // user already exists
  }
  return false; // user does not exist
};
const checkPhoneExist = async (userPhone) => {
  let user = await db.User.findOne({
    where: {
      phone: userPhone,
    },
  });
  if (user) {
    return true; // Phone already exists
  }
  return false; // Phone does not exist
};
//==========HANDLE R and L==========
//======handle registration=========
const registerNewUser = async (rawUserData) => {
  try {
    //check email, phone number are existed
    let isEmailExist = await checkEmailExist(rawUserData.email);
    if (isEmailExist === true) {
      return {
        EM: "Email already exists",
        EC: "1",
      };
    }
    let isPhoneExist = await checkPhoneExist(rawUserData.phone);
    if (isPhoneExist === true) {
      return {
        EM: "Phone already exists",
        EC: "1",
      };
    }
    //hash user password
    let hashPassword = await hashUserPassword(rawUserData.password);

    //create new user
    await db.User.create({
      email: rawUserData.email,
      phone: rawUserData.phone,
      username: rawUserData.username,
      password: hashPassword,
      groupId: 4 //set static for guest view only
    });
    //return success message
    return {
      EM: "User created successfully",
      EC: "0",
    };
  } catch (e) {
    console.error("Error creating user>>>>>:", e);
    return {
      EM: "Error from server",
      EC: "-2",
    };
  }
};
//==========handle login==========
const checkPassword = (inputPassword, hashPassword) => {
  return bcrypt.compareSync(inputPassword, hashPassword);
};
const handleUserLogin = async (rawData) => {
  try {
    let user = await db.User.findOne({
      where: {
        [Op.or]: [
          { email: rawData.valueLogin },
          { phone: rawData.valueLogin }, // javascript object =>data 'user.get({plain: true})'
        ],
      },
    });
    if (user) {
      let isCorrectPassword = checkPassword(rawData.password, user.password);
      if (isCorrectPassword === true) {

        //=====HANDLING TOKEN COOKIE======
        let groupWithRoles = await getGroupWithRoles(user)
        let payload = {
          email: user.email,
          groupWithRoles,
        }
        let token = createJWT(payload)
        // console.log("Check token >>>>>>> backend >>>>>>>>>>>>>>>>>",token)
        return {
          EM: "Ok!",
          EC: "0",
          DT: {
            access_token: token,
            groupWithRoles
          },
        };
      }} 
     //else
      return {
        EM: "something wrong with email/phone number/password ",
        EC: "1",
        DT: "",
      }
      
    }catch (e) {
      console.error("Error creating user>>>>>:", e);
      return {
        EM: "Error from server",
        EC: "-2",
      };
    }
  } 
export { registerNewUser, handleUserLogin, hashUserPassword,checkEmailExist, checkPhoneExist};
