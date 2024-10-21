import jwt from 'jsonwebtoken'

const createJWT = (payload) => {
    let key = 'nguyenquocnhuit'; //key
    let token = null;//
    try {
        token = jwt.sign(payload,key)
        // console.log("Check token >>>>>>>",token)
    }catch(err) {
        console.log(err)
    }
    return token;//
}

const verifyToken = (token) => {
    let key = 'nguyenquocnhuit'; //key
    let decoded = null;
    try {
        decoded = jwt.verify(token, key);
    }catch(err) {
        console.log(err)
    }
    return decoded; //null
}
//checkJWT to secure security (login)
const checkUserJWT = (req,res,next) => {
    let cookies = req.cookies;
    if(cookies && cookies.jwt) {
        let token = cookies.jwt;
        let decoded = verifyToken(token);
        if(decoded){
            req.user = decoded; //bring to backend
            next();
            console.log("Done! It's time to check permission")
        } else {
            //check 401
            return res.status(401).json({
                EC: -1,
                DT: '',
                EM: 'Not authenticated the user'
            })
        }
    } else {
        return res.status(401).json({
            EC: -1,
            DT: '',
            EM: 'Not authenticated the user'
        })
    }
}
//check roles
const checkUserPermission = (req,res,next) => {
    console.log("Welcome to checking permission",req.user)
    // console.log('check request from frontend>>>>>>>>>>',req.body)
    if (req.user){
        //check from frontend
        console.log('Check request >>>', req.user)
        let email = req.user.email;
        let roles = req.user.groupWithRoles.Roles;
        let currentUrl = req.path;
        console.log("Checking role>>>>>>>>", roles)
        if(!roles || roles.length === 0) { //
            return res.status(403).json({
                EC: -1,
                DT: '',
                EM: 'You do not permission to access this resource...'
            })
        }
        //check access
        let canAccess = roles.some(item => item.url === currentUrl);
        if(canAccess === true) {
            next();
        }
        else {
            return res.status(403).json({
                EC: -1,
                DT: '',
                EM: 'You do not permission to access this resource...'
            })
        }
    } else {
        return res.status(401).json(
            {
                EC: -1,
                DT: '',
                EM: 'Not authenticated the user '
            }
        )
    }

}
export {createJWT,checkUserJWT,checkUserPermission}