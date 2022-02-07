

exports.showMessage = (req,res)=> {
    res.status(200);
    console.log("route showMessage ok")
}

exports.showMessages = (req,res)=> {
    res.status(200);
    console.log("route showMessages ok")
}

exports.postMessage = (req,res) => {
    res.status(201);
    console.log('route postMessage ok')
}

exports.modifyMessage = (req,res) => {
    res.status(201);
    console.log('route modifyMessage ok')
}

exports.deleteMessage = (req,res) => {
    res.status(205);
    console.log('route deleteMessage ok')
}