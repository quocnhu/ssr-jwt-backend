import db from "../models/index.js";
import {
  hashUserPassword,
  checkEmailExist,
  checkPhoneExist,
} from "../services/loginRegisterService.js";
const getAllUser = async () => {
  try {
    let users = await db.User.findAll({
      attributes: ["id", "username", "email", "phone", "sex"],
      include: { model: db.Group, attributes: ["id", "name", "description"] },
    });
    // let data = users.get({plain: true})
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
//PAGINATION HANDLING ON DB
const getUserWithPagination = async (page, limit) => {
  try {
    let offset = (page - 1) * limit;
    let { count, rows } = await db.User.findAndCountAll({
      offset: offset,
      limit: limit,
      attributes: ["id", "username", "email", "phone", "sex", "address"],
      include: { model: db.Group, attributes: ["id", "name", "description"] },
      order: [["id", "DESC"]],

    });
    let totalPages = Math.ceil(count / limit);
    //
    let data = {
      totalRows: count,
      totalPages: totalPages,
      users: rows,
    };
    // console.log("=======check data ======", data);
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

const createNewUser = async (data) => {
  try {
    //CHECK EMAIL, PHONE, PASSWORD EXISTED ON MODAL CREATE USER;
    let isEmailExist = await checkEmailExist(data.email);
    if (isEmailExist === true) {
      return {
        EM: "Email already exists",
        EC: 1,
      };
    }
    let isPhoneExist = await checkPhoneExist(data.phone);
    if (isPhoneExist === true) {
      return {
        EM: "Phone already exists",
        EC: 1,
      };
    }
    //hash password
    let hashedPassword = await hashUserPassword(data.password);
    //create new user
    await db.User.create({
      ...data,
      password: hashedPassword,
    });
    // return success message
    return {
      EM: "User created",
      EC: 0,
      DT: [],
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
const updateUser = async (data) => {
  try {
    //validate group
    console.log('Check data:', data)
    if(!data.groupId){
      return {
        EM: "GroupId is empty or something wrong",
        EC: 1,
        DT:"Group"
      }
    }
    let user = await db.User.findOne({
      where: {id: data.id}
    })
    if(user) {
      await user.update({
        //hack
        username: data.username,
        address: data.address,
        sex: data.sex,
        groupId: data.groupId
      })
      return {
        EM: "User was updated successfully",
        EC: 0,
        DT: "",
      }
    } else {
      return {
        EM: "User not found",
        EC: 0,
        DT:""
      }
    }
  } catch (e) {
    console.log(e);
    return {
      EM: "something wrong with services",
      EC: 1,
      DT: [],
    };
  }
};
// DELETE MODAL HANDLING 
const deleteUser = async (id) => {
  try {
    let user = await db.User.findOne({
      where: { id: id }, //left = sequelize
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
