import db from '../models/index';
const getGroups = async () => {
    try {
        let data = await db.Group.findAll(
            {
                order: [['name','ASC']]
            }
        )
        return{
            EM:'get groups successfully',
            EC: 0,
            DT: data,  // array of group objects
        }

    }catch(e) {
        console.log('Error getting groups:', e);
        return {
            EM: 'Error from service',
            EC: '2',
            DT: [],
        };
    }
}
export {getGroups}