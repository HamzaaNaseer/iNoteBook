const express = require('express');
const User = require('../models/User');
const router = express.Router();
const bcrypt = require('bcryptjs'); // for hashing the password and creating salts
const jwt = require('jsonwebtoken'); // for creating tokens for sessions 
const JWT_SECRET = 'cod3s!nthedarK'; //for signing

const { body, validationResult } = require('express-validator');



//-----------CREATE A USER USING --POST "API/AUTH"------NO LOGIN REQUIRED
//validating email,name and password
router.post('/createuser', [
    body('email').isEmail(),
    body('name').isLength({ min: 3 }),
    body('password').isLength({ min: 5 }),
], async (req, res) => {
    //if errors occur in validation , send them with status code 400
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        // creating salt --- is asynchronous
        const salt = await bcrypt.genSaltSync(10);
        //creating hash --- is asynchronous
        var passHash = await bcrypt.hashSync(req.body.password, salt);
        //creating a user
        const user = await User.create({
            name: req.body.name,
            password: passHash,
            email: req.body.email,
        })
        const data = {
            user: {
                id: user.id // the user we created above ,,,, that's his id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET);
        console.log(authToken);
        //sending the user back as response
        //res.json(user);

        res.json({ authToken });
    }
    catch (error) {
        res.status(400).json({ error: 'please enter valid value', message: error.message })

    }

}
)

module.exports = router;