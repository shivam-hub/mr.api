const User = require('../models/User');
const jwt = require('jsonwebtoken');

const generateJwtToken = (user) => {
    const secret = process.env.JWT_SECRET;
    return jwt.sign({ id: user._id, username: user.username }, secret, {
        algorithm: "HS256",
        expiresIn: '5h',
    });
};

const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ username, password });

        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = generateJwtToken(user);

        res.status(200).json({ token });
    } catch (error) {
        console.error('Login error:', error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const getUser = async (req, res) => {
    try {
        
        const { username, id } = req.user;

        console.log("reached here")
        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ username: user.username });
    } catch (error) {
        console.error('Get user error:', error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = { login, getUser };
