const isItDwight = (req, res, next) => {
    if(req.body.email === "dwight@theoffice.com" && req.body.password === "123456"){
        res.status(201).send("Credentials are valid");
    }
    else{
        res.status(401).send("Credentials are unvalid")
    }
}

module.exports = isItDwight;