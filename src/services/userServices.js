//Imported database
// import { poolsql } from "../config/db.js";
import db from "../models/index.js";
//Encrypting password
import bcrypt from "bcryptjs";
const salt = bcrypt.genSaltSync(10);

const hashUserPassword = async (userPassword) => {
  let hashPassword = bcrypt.hashSync(userPassword, salt);
  // console.log(`>>>hashPassword`, hashPassword)
  return hashPassword;
};

//Handling database "CRUD"
const getUserList = async (email, password, username) => {
  try {
    // const [results, fields] = await poolsql.query(`SELECT * FROM users `);
    // // console.log("SELECTED SUCCESSFULLY:", results);
    // return results;
    let users = [];
    users = await db.User.findAll(); //get all different to findOne
    return users;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};
const createNewUser = async (email, password, username) => {
  try {
    const hashPass = await hashUserPassword(password);

    // // Insert user into database using poolsql.query
    // const [results, fields] = await poolsql.execute(
    //   `INSERT INTO users (email, password, username) VALUES (?,?,?)`,
    //   [email, hashPass, username]
    // );

    // // console.log("User created successfully:", results);
    // //   return results.insertId;
    // return results;
    await db.User.create({  //******remember that  the name User here is the name is declared in user.js******
      email: email,
      password: hashPass, //sequelize insert db
      username: username,
    });
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};
const deleteUser = async (userId) => {
  try {
    // const [results, fields] = await poolsql.execute(
    //   `DELETE FROM users WHERE id = ?`,
    //   [userId]
    // );
    // return results;
    // console.log("hello delete")
    await db.User.destroy({
      where: {
        id: userId, //sequelize delete
      },
    });
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};

const getIdUserUpdate = async (userId) => {
  try {
    // const [results, fields] = await poolsql.execute(
    //   `SELECT * FROM users WHERE id = ?`,
    //   [userId]
    // );
    // return results;
    let user = {};
    user = await db.User.findOne({
      where: {
        id: userId,
      },
    });
    return user.get({ plain: true }); //change to premitive javascript
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};

const updateUser = async (id, email, username) => {
  try {
    // const [results, fields] = await poolsql.execute(
    //   `UPDATE users
    //   SET email = ?, username = ?
    //   WHERE id = ?;`,
    //   [email, username,id] //remember that put in order
    // );
    // return results;
    await db.User.update(
      { email: email, username: username },
      {                             // update by sequelize
        where: {
          id:id,
        },
      }
    );
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};

export { createNewUser, deleteUser, getUserList, getIdUserUpdate, updateUser };

