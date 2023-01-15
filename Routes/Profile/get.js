const express = require('express');
const router = express.Router();

router.get("/pic/:filename", (req, res) => {
    res.sendFile(__dirname + `/ProfilePic/${req.params.filename}`);
})

module.exports = router;
