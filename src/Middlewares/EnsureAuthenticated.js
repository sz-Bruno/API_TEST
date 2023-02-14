const { verify } = require("jsonwebtoken");
const AppError = require("../Utils/AppError");
const authConfig = require("../Configs/Auth");

function EnsureAuthenticated(request, response, next) {
    const authHeader = request.headers.authorization; 

    if(!authHeader) {
        throw new AppError("JWT Token não informado!", 401);
    }

    const [, token] = authHeader.split(" "); //2ª parte

    try {
        const { sub: user_id } = verify(token, authConfig.jwt.secret); 
        
        //coloca o id na requisição, chamando-o do user_id
        request.user = {
            id: Number(user_id),
        };

        return next();
    } catch {
        throw new AppError("JWT Token inválido.", 401);
    }
}

module.exports = EnsureAuthenticated;