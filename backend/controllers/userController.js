const db = require("../models");
const User = db.users;

exports.ModifyUser = (req,res) => {
    res.status(201);
    console.log('route modifyUser ok')
}

exports.deleteUser =(req, res) => {
    res.status(205)
    console.log('route deleteAccount ok')
}