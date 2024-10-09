import {testApi,handleRegister,handleLogin} from '../controller/apiController.js'
import {ReadFunc, CreateFunc, UpdateFunc, DeleteFunc} from '../controller/userController.js'
import express from 'express';
const router = express.Router();

const initApiRoutes = (app) => {
    //====handling route=======
    router.get("/test-api",testApi)
    router.post("/register",handleRegister)
    router.post("/login",handleLogin)
    //====handling CRUD=========
    router.get("/user/read",ReadFunc) //read?page=10&limit=20 = query
    router.post("/user/create",CreateFunc)
    router.put("/user/update",UpdateFunc)
    router.delete("/user/delete",DeleteFunc)

    return (app.use("/api/v1/", router))
}

export default initApiRoutes;
//GET = R, POST = C, PUT = U, DELETE = D
