import {registerNewUser,handleUserLogin} from "../services/loginRegisterService.js"
const testApi = (req, res) => {
    return res.status(200).json({
        message: 'ok',
        data:'test api quoc nhu'
    })
}
//====Handle register======================
const handleRegister = async (req,res) => {
   try {
    //======VALIDATE FRONTEND REQUEST =============
        //req.body: email, phone, username, password
        if(!req.body.email || !req.body.phone || !req.body.username){
            return res.status(400).json({
                EM: 'Missing required fields',
                EC: '1', 
                DT:'', 
            })
        }
        if(req.body.password && req.body.password.length < 4){
            return res.status(200).json({
                EM: 'Password must be at least 4 characters long',
                EC: '1', 
                DT:'', 
            })
        }
    //========HANDLE SERVICE==========    
        //service: create user
        let data = await registerNewUser(req.body)

        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT:'', 
        })

   } catch (e) {
    //server error defination
    return res.status(500).json({
        EM: 'error from server', 
        EC: '-1', 
        DT:'', 

    })
   }
}
//======Handle login===========
const handleLogin = async (req,res) => {
   try {
        let data = await handleUserLogin(req.body)
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,   // token
            DT: data.DT
        })
   }catch(error) {
    return res.status(500).json({
        EM: 'error from server', //error message
        EC: '-1', //error code
        DT:'', //data

    })
   }
}
export {testApi, handleRegister, handleLogin}