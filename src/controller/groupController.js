import {getGroups} from '../services/groupService.js'
const readFuncGroup = async(req,res) => {
    try {
        let data = await getGroups()
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT, 
        })
    } catch(e) {
        console.log('Error getting groups:', e);
        return {
            EM: 'Error from service',
            EC: '1',
            DT: [],
        };
    }  

}
export {readFuncGroup}