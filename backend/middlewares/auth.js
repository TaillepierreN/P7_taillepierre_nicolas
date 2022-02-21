const jwt = require("jsonwebtoken");
const db = require("../models");
const User = db.users;

module.exports = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.TOKEN);
        const userId = decodedToken.userId;
        const user = await User.findOne({where: {id: userId}})
        if(!user){
          return  res.status(403).json({ message: "votre compte n'a pas été trouvé"})
        }
        next();
    } catch (error) {
        return res.status(401).json({
            message: 'invalid request'
        });
    }
} 