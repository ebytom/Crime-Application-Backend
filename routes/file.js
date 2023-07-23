const express = require("express")
const router = express.Router()
const { uploadFile } = require("../utils/multer")

router.post("/add",uploadFile("file"), (req, res) => {
    res.send(req?.file?.filename)
})

router.get("/get", (req, res) => {
    const path = `${__dirname}/../${req.query.fileId}`;
    res.download(path)
})

module.exports = router