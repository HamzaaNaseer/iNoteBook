const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
    obj = {
        id: "i'm auth"
    }
    res.json(obj)
})

module.exports = router;