const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) =>{
    const token = req.cookies?.token;

    if(!token){
        return res.status(401).send({message: "unauthorized: no token"});
    };


    jwt.verify(token, process.env.JWT_SECRET, (error, decoded)=>{
        if(error){
            return res.status(401).send({message: "unauthorized: invalid or expired token"});
        };

        req.decodedUser = decoded;
        next();
    });
};

module.exports = verifyToken;