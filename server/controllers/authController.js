const userModel = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


exports.login = async(req, res)=>{
try {
    const { email, password } = req.body;
    const user = await userModel.getUserByEmail(email);

    if (!user) {
        return res.status(401).json({
        message: "Invalid credentials"
        });
    }

    const validPassword = await bcrypt.compare(
        password,
        user.password
    );

    if (!validPassword) {
        return res.status(401).json({
        message: "Invalid credentials"
    });
    }   

    const token = jwt.sign({id: user.user_id, role: user.role_id}, process.env.JWT_SECRET,{expiresIn: "1h"});

    res.json({token});

} catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
        
};