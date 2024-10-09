import db from "../models/index.js";

const getAllUser = async () => {
  try {
    let users = await db.User.findAll({
      attributes: ["id", "username", "email", "phone", "sex"],
      // include: { model: db.Group_, attributes: ["name","description"]},
    });
    // let data = users.get({plain: true})
    // let users = await db.Group_.findAll({attributes: ["name","description"]})
    // console.log("check--------------------11-", users)

    if (users) {
      return {
        EM: "get data successfully",
        EC: 0,
        DT: users,
      };
    } else {
      return {
        EM: "get data successfully",
        EC: 0,
        DT: [],
      };
    }
  } catch (e) {
    console.log(e);
    return {
      EM: "something wrong",
      EC: 1,
      DT: [],
    };
  }
};
const getUserWithPagination = async (page, limit) => {
  try {
    let offset = (page - 1) * limit;
    let { count, rows } = await db.User.findAndCountAll({
      offset: offset,
      limit: limit,
      attributes: ["id", "username", "email", "phone", "sex"],
      // include: { model: db.Group_, attributes: ["name","description"]},
      //a-z
    });
    let totalPages = Math.ceil(count / limit);
    //
    let data = {
      totalRows: count,
      totalPages: totalPages,
      users: rows,
    };
    console.log("=======check data ======", data);
    return {
      EM: "Fetching is ok",
      EC: 0,
      DT: data,
    };
  } catch (e) {
    console.log(e);
    return {
      EM: "something wrong with services",
      EC: 1,
      DT: [],
    };
  }
};
const createNewUser = async () => {
  try {
  } catch (e) {
    console.log(e);
  }
};
const updateUser = async (data) => {
  try {
    let user = await db.User.findOne({
      where: { id: data.id },
    });
    if (user) {
      //update
      user.save({});
    } else {
      //not found
    }
  } catch (e) {
    console.log(e);
  }
};
const deleteUser = async (id) => {
  try {
    let user = await db.User.findOne({
      where: { id:id }, //left = sequelize
    });
    if (user) {
      await user.destroy();
      return {
        EM: "User is deleted",
        EC: 0,
        DT: [],
      };
    } else {
      return {
        EM: "User not found",
        EC: 2,
        DT: [],
      };
    }
  } catch (e) {
    console.log(e);
  }
};

export {
  getAllUser,
  getUserWithPagination,
  createNewUser,
  updateUser,
  deleteUser,
};
