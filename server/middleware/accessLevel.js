const ApiError = require("../errors/ApiError")
const jwt = require('jsonwebtoken')
const config = require("config")
module.exports = function (role){
    return function (req, res, next) {
        if (req.method === "OPTIONS")
            next()
        try {
            const token = req.headers.authorization.split(' ')[1]
            // if (!token)
            //     return next(ApiError.unauthorized("Пользователь не авторизован"))

            // const {roles: userRoles} = jwt.verify(token, config.get('jwt-secret-key'))
            const {role: userRole} = jwt.verify(token, config.get('jwt-secret-key'))
            // console.log(role, userRole)
            // if(!checkRole(roles,userRoles))
            if(role !== userRole)
                return next(ApiError.forbidden("Доступ запрещен"))
            next()

        } catch (e) {
            return next(ApiError.forbidden("Доступ запрещен"))
        }
    }

}
// function checkRole(roles, userRoles){
//     // console.log(roles, userRoles)
//     for (let userRole of userRoles)
//         if(roles.includes(userRole))
//             return true
//
//     return false
// }