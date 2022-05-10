const db = require("../models");
const User = db.users;
const fs = require('fs');
const bcrypt = require("bcrypt");

//Afficher un utilisateur
exports.showUser = async (req, res) => {
    try {
        const user = await User.findOne({
            where: {
                id: req.params.id
            },
            attributes: ["id", "username", "profilepic", "email", "isMod"]
        });
        if (user) {
            return res.status(200).json(user)
        } else {
            return res.status(404).json({
                message: "aucun utilisateur trouvé"
            })
        }
    } catch (error) {
        return res.status(500).json({ message: error })
    }
}

//Modifier un utilisateur
exports.modifyUser = async (req, res) => {
    try {
        const userObject = req.file ? {
            ...req.body,
            profilepic: `${req.protocol}://${req.get('host')}/images/profile/${req.file.filename}`
        } : {
            ...req.body
        }
        const user = await User.findOne({
            where: {
                id: req.params.id
            }
        })
        if (user) {
            if (req.body.password) {
                const isValid = await bcrypt.compare(req.body.oldPassword, user.password)
                if (!isValid) {
                    return res.status(400).json(
                        { message: "Ancien mot de passe incorrect" }
                    );
                }
                const hash = await bcrypt.hash(req.body.password, 10)
                userObject.password = hash
            }
            let toDelete
            if (user.profilepic && req.file) {
                toDelete = user.profilepic.split('/profile/')[1];
            }
            await User.update({
                ...userObject
            }, {
                where: {
                    id: req.params.id
                }
            })
            if (toDelete) {
                fs.unlinkSync(`images/profile/${toDelete}`)
            }
            return res.status(200).json({
                message: ' Profile mis à jour'
            });
        } else {
            return res.status(404).json({
                message: "Utilisateur non trouvé"
            })
        }
    } catch (error) {
        return res.status(500).json({
            message: error
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
        if (user) {
            let toDelete
            if (user.profilepic) {
                toDelete = user.profilepic.split('/profile/')[1];
            }
            await User.destroy({
                where: {
                    id: req.params.id
                }
            })
            if (toDelete){
                fs.unlinkSync(`/profile/${toDelete}`)
            }
            return res.status(200).json({
                message: 'Profile retiré'
            })
        }

    } catch (error) {
        return res.status(400).json({
            message: error
        });
    }

}