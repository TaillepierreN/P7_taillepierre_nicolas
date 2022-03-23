const db = require("../models");
const User = db.users;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")


// Création de compte
exports.signup = async (req, res) => {
    try {
        const hash = await bcrypt.hash(req.body.password, 10)
        const user = {
            email: req.body.email,
            password: hash,
            username: req.body.username,
        };
        if(req.file){
            user.profilepic = `${req.protocol}://${req.get('host')}//images/profile/${req.file.filename}`
        }
        await User.create(user)
        return res.status(201).json({
            message: "utilisateur crée"
        });
    } catch (error) {
        return res.status(500).json({
            error
        })
    }
}

//Connexion au compte
exports.login = async (req, res) => {
    try {
        const user = await User.findOne({ where: {
            email: req.body.email
        }
        })
        if (!user) {
            return res.status(404).json({
                error: "Utilisateur non trouvé"
            });
        }
        const isValid = await bcrypt.compare(req.body.password, user.password)
        if (!isValid) {
            return res.status(400).json({
                error: "Mot de passe incorrect"
            });
        }
        console.log(user)
        return res.status(200).json({
            userId: user.id,
            token: jwt.sign({
                    userId: user.id
                },
                process.env.TOKEN, {
                    expiresIn: '24h'
                })
        })
    } catch (error) {
        return res.status(500).json({
            error
        })
    }
}