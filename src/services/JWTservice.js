import db from '../models/index';

const getGroupWithRoles = async (users) => {
    //get group and role
    //scope
    let roles = await db.Group.findOne({
        where: {id: users.groupId},
        attributes: ['id', 'name', 'description'],
        include: {
            model: db.Role,
            attributes: ['id', 'url', 'description'],
            through: {attributes: []}, //*to get roles of user only
        }
    })
    return roles ? roles :  {};
}

export { getGroupWithRoles }