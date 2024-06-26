const argon2 = require("argon2");
const jwt = require("jsonwebtoken")
require("dotenv").config()

const hashPassword = (req, res, next) => {
    argon2.hash(req.body.password, {
        type: argon2.argon2id,
        memoryCost: 15000,
        timeCost: 2,
        parallelism: 1
    })
    .then((hashedPassword) => {
        req.body.hashedPassword = hashedPassword;
        delete req.body.password
        next();
    })
    .catch((err) => {
        res.status(500).send(err)
    })
}

const verifyPassword = (req, res, next) => {
    argon2
    .verify(req.user.hashedPassword, req.body.password)
    .then((match) => {
        if(match){
            const token = jwt.sign({
                sub: req.user.id
            }, process.env.JWT_SECRET, {
                expiresIn: "1h"
            })
            console.log("Bearer " + token)
            delete req.user.hashedPassword
            delete req.body.password
            res.send("Credentials are valid");
            next();
        }
        else{
            console.log("Failure");
            res.sendStatus(401);
        }
    })
    .catch((err) => {
        res.status(500).send(err);
    })
}

const verifyToken = (req, res, next) => {
    try{
        if(!req.headers.authorization){
            throw new Error("Authorization header is missing");
        }

        const [type, token] = req.headers.authorization.split(" ");

        if(type === "Bearer"){
            req.payload = jwt.verify(token, process.env.JWT_SECRET);

            if(req.method == "DELETE" || req.method == "PUT"){
                console.log(req.params.id)
                if(req.payload.sub == req.params.id){
                    next();
                }
                else{
                    throw new Error("Incorrect ID")
                }
            }
        }
        else{
            throw new Error("Authorization header has not the 'Bearer' type");
        }
    }
    catch(error){
        console.log(error);
        res.sendStatus(401);
    }
}



module.exports = {
    hashPassword,
    verifyPassword,
    verifyToken
};