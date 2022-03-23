const db = require("../models");
const User = db.users;
const fs = require('fs');
const bcrypt = require("bcrypt");


//Modifier un utilisateur
exports.ModifyUser = async (req, res) => {
    try {
        const hash = await bcrypt.hash(req.body.password, 10)
        const userObject = req.file ? {
            email: req.body.email,
            username: req.body.username,
            password: hash,
            profilepic: `${req.protocol}://${req.get('host')}//images/profile/${req.file.filename}`
        } : {
            ...req.body,
            password: hash,

        }
        const user = User.findOne({
            where: {
                id: req.params.id
            }
        })
        if (user) {
            if (req.file) {
                const toDelete = user.profilepic.split('/profile/')[1];
                try {
                    fs.unlinkSync(`/profile/${toDelete}`)
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