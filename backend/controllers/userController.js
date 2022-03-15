const db = require("../models");
const User = db.users;

exports.ModifyUser = async (req,res) => {
    try {
        const user = User.findOne({where:{ id: req.params.id}})
        if(user){
            await User.update({
                email: req.body.email,
                username: req.body.username,
                // profilepic: `${req.protocol}://${req.get('host')}//images/${req.file.filename}`
            },
                {where:{id: req.params.id}})
                return res.status(200).json({
                    message: ' Profile mis à jour'
                });
            }
    } catch (error) {
        return res.status(400).json({ error: error});
    }
}

exports.deleteUser =(req, res) => {
    try {
        const user = User.findOne({where:{ id: req.params.id}})
        if(user){
            User.destroy({where: {id: req.params.id}})
            return res.status(200).json({
                message: 'Profile retiré'
            })
        }

    } catch (error) {
        return res.status(400).json({ error: error});
    }

}