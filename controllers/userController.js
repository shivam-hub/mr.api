const User = require('../models/User');

const createUser = async (req, res) => {
    try {
        const payload = req.body;

        if (!payload || !payload.username || !payload.password || !payload.name || !payload.userType) {
            return res.status(500).json({ message: 'Either username or password or name or user type is missing' })
        }

        const createdOn = Date.now();
        const dt = new Date();

        const userId = `N${String(dt.getDate()).padStart(2, '0')}${String(dt.getMonth() + 1).padStart(2, '0')}${dt.getFullYear()}${String(dt.getHours()).padStart(2,'0')}${String(dt.getMinutes()).padStart(2,'0')}`;

        payload.createdOn = createdOn;
        payload.modifiedOn = createdOn;
        payload.createdOn = createdOn;
        payload.userId = userId;

        const newUser = new User(payload)
        const result = await newUser.save();

        res.status(201).json({ message: 'User created successfully', data: result});
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const getUserById = async (req, res) => {
    try {
        const userId = req.params.userId;
        const user = await User.findOne({ userId: userId });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(user);
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const updateUser = async (req, res) => {
    try {
        const userId = req.params.userId;

        const updatedUser = req.body;

        updatedUser.modifiedOn = Date.now();

        const result = await User.updateOne(
            { userId: userId },
            { $set: updatedUser }
        );

        if (result.matchedCount === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'User updated successfully' });
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const deleteUser = async (req, res) => {
    try {
        const userId = req.params.userId;

        const result = await User.deleteOne({ userId: userId });

        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = { createUser, getAllUsers, getUserById, updateUser, deleteUser };
