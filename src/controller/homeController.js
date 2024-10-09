import {createNewUser,deleteUser,getUserList,getIdUserUpdate,updateUser} from '../services/userServices.js' 

const handleUserPage = async (req, res) => {
    let userList = await getUserList()
    return res.render("home.ejs", {userList})
}

const handleCreateNewUser =  async (req, res) => {
    let {email,password,username} = req.body
    await createNewUser(email,password,username)
    return res.redirect('/')
}

const handleDeleteUser = async (req, res) => {
     let {id} = req.params
     await deleteUser(id)
     return res.redirect('/')
}
const getUserUpdatePage = async (req, res) => {
    let {id} = req.params
    let  userUpdateUnique = await getIdUserUpdate(id) //userUpdateId
    // let userUpdateUnique = {}       //just create a new brand
    //     userUpdateUnique = userUpdateId
    //     console.log("check>>>>>>>>",userUpdateId)
    // if(userUpdateId && userUpdateId.length > 0){
    //     userUpdateUnique = userUpdateId[0]
    // }
    return res.render('userUpdate.ejs', {userUpdateUnique})
}
const handleUpdateUser = async (req, res) => {
    let {id,email,username} = req.body
    await updateUser(id,email,username)
    return res.redirect('/')
    
}

export {handleCreateNewUser,handleDeleteUser,handleUserPage,getUserUpdatePage,handleUpdateUser}