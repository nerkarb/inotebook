const jwt = require('jsonwebtoken');
//AUthentication token
const JWT_SECRET = "SecretToekn$"
fetchUser = (req, res, next)=>{

    //get the user from the jwt Token and add id to the req object
    const token = req.header('auth-token')
    if(!token){
        res.status(401).send({error:"PLease authenticate using valid token"})
    }

    try {
        const data = jwt.verify(token,JWT_SECRET)

        req.user = data.user
        
        next();
    } catch (error) {
        res.status(401).send({error:"PLease authenticate using valid token"})
    }

    
}

module.exports = fetchUser