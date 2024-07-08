const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/register');
const auth = require('../middleware/register');
const model = require('../controller/register')

router.post('/create', model.add)
router.get('/all', model.getAll)
router.get('/:id', model.getId)
router.put('/:id', model.modelPut)
router.delete('/:id', model.modelDelete)

router.post('/login', async (req, res) => {
  const { user_name, password } = req.body;

  try {
    // Check if the user exists
    const user = await User.findOne({ user_name });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check if the password is correct
    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Create and assign a token
    const token = jwt.sign({ id: user._id }, 'your_jwt_secret', {
      expiresIn: '7d'
    });

    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router