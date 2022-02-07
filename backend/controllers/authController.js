

exports.signup = (req, res) => {
    res.status(201);
    console.log('route signup ok')
}

exports.login = (req, res) => {
    res.status(200);
    console.log('route login ok')
}

exports.ModifyUser = (req,res) => {
    res.status(201);
    console.log('route modifyUser ok')
}

exports.deleteUser =(req, res) => {
    res.status(205)
    console.log('route deleteAccount ok')
}