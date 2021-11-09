const express = require('express');
const User = require('../models/User');
const router = express.Router();

const { body, validationResult } = require('express-validator');



//-----------CREATE A USER USING --POST "API/AUTH"
router.post('/', [
    body('email').isEmail(),
    body('name').isLength({ min: 3 }),
    body('password').isLength({ min: 5 }),
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const user = await User.create({
            name: req.body.name,
            password: req.body.password,
            email: req.body.email,
        })
        res.json(user);
    } catch (error) {
        res.json({ error: 'please enter valid value', message: error.message })

    }

}
)

module.exports = router;