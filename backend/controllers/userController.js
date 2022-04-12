const db = require("../models");
const User = db.users;
const fs = require('fs');
const bcrypt = require("bcrypt");

//Afficher un utilisateur
exports.showUser = async (req, res) =>{
    try {
        const user = await User.findOne({
            where: {
                id: req.params.id
            },
            attributes: ["id", "username", "profilepic", "email"]
        });
        if (user){
            return res.status(200).json(user)
        }else{
            return res.status(404).json({
                message: "aucun utilisateur trouvé"
            })
        }
    } catch (error) {
        return res.status(500).json({ error})
    }
}

//Modifier un utilisateur
exports.ModifyUser = async (req, res) => {
    try {
        const userObject = req.file ? {
            ...req.body,
            // password: hash,
            profilepic: `${req.protocol}://${req.get('host')}/images/profile/${req.file.filename}`
        } : {
            ...req.body,
            // password: hash,
        }
        if(req.body.password){
            const hash = await bcrypt.hash(req.body.password, 10)
            userObject.password = hash
        }
        const user = await User.findOne({
            where: {
                id: req.params.id
            }
        })
        if (user) {
            if (req.file) {
                const toDelete = user.profilepic.split('/profile/')[1];
                try {
                    fs.unlinkSync(`images/profile/${toDelete}`)
                } catch (error) {
                    console.error(error)
                }
            }
            await User.update({
                ...userObject
            }, {
                where: {
                    id: req.params.id
                }
            })
            return res.status(200).json({
                message: ' Profile mis à jour'
            });
        }
    } catch (error) {
        return res.status(400).json({
            error: error
        });
    }
}

//Supprimer un utilisateur
exports.deleteUser = async (req, res) => {
    try {
        const user = User.findOne({
            where: {
                id: req.params.id
            }
        })
        const toDelete = user.profilepic.split('/profile/')[1];
        if (user) {
            fs.unlinkSync(`/profile/${toDelete}`)
            await User.destroy({
                where: {
                    id: req.params.id
                }
            })
            return res.status(200).json({
                message: 'Profile retiré'
            })
        }

    } catch (error) {
        return res.status(400).json({
            error: error
        });
    }

}