import { getAllUser,getUserWithPagination, createNewUser, updateUser, deleteUser } from '../services/userApiService.js'
const ReadFunc = async (req,res) => {
    try {
        if(req.query.page && req.query.limit) {
            //Get with query
            // console.log("checking ==========",req.query)
            let { page, limit } = req.query;
            let data = await getUserWithPagination(+page,+limit);
            //console.log(data)
            return res.status(200).json({
                EM: data.EM,
                EC: data.EC,
                DT: data.DT, 
            })
        } 
        else {
            //Get all
            let data = await getAllUser()
            return res.status(200).json({
                EM: data.EM,                 
                EC: data.EC,
                DT: data.DT, 
            })

        }
    }catch(e) {
        console.log(e)
        return res.status(500).json({
            EM: 'error from server',
            EC: '-1',
            DT:'', 
        })
    }

}
const CreateFunc = async(req,res) => {
    try {
        //validation as needed (*)
        // console.log("Check data ====> create", req.body)
        let data = await createNewUser(req.body)
        
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT, 
        })
    }
    catch (e) {
        console.log(e)
        return res.status(500).json({
            EM: 'error from server',
            EC: '-1',
            DT:'', 
        })
    }
 
}
const UpdateFunc = async(req,res) => {
    try {
        //validation as needed (*)
        // console.log("Check data ====> update", req.body)
        let data = await updateUser(req.body)
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT, 
        })
    }
    catch (e) {
        console.log(e)
        return res.status(500).json({
            EM: 'error from server',
            EC: '-1',
            DT:'', 
        })
    }

}
const DeleteFunc = async (req,res) => {
    try {
        let userId = req.body.id
        // console.log("UserId here =============>", userId)
        let data = await deleteUser(userId)
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT, 
        })
    }
    catch (e) {
        console.log(e)
        return res.status(500).json({
            EM: 'error from server',
            EC: '-1',
            DT:'', 
        })
    }
}
export {ReadFunc,CreateFunc,UpdateFunc,DeleteFunc}