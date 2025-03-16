

function getUpload(req, res) {
    res.render("upload");
}

function uploadFile(req, res) {
    console.log(req.file, req.body)
}

module.exports = { getUpload, uploadFile };