const User = require('../models/User');
const jwt = require('jsonwebtoken');

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public

const register = async (req, res, next) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User with this email already exists'
      });
    }

    // Create user
    const user = await User.create({
      firstName,
      lastName,
      email,
      password
    });

    const token = user.getSignedJwtToken();
    const userProfile = user.getPublicProfile();

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      token,
      user: userProfile
    });
    localStorage.setItem('status', JSON.stringify(res.status));

  } catch (error) {
    next(error);
  }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Check for user
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Check if password matches
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Check if user is active
    if (!user.isActive) {
      return res.status(401).json({
        success: false,
        message: 'Account is deactivated'
      });
    }

    const token = user.getSignedJwtToken();
    const userProfile = user.getPublicProfile();

    res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
      user: userProfile
    });

  } catch (error) {
    next(error);
  }
};

// @desc    Get current user
// @route   GET /api/auth/me
// @access  Private
const getMe = async (req, res, next) => {
  try {
    const user = req.user.getPublicProfile();

    res.status(200).json({
      success: true,
      user
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Logout user
// @route   POST /api/auth/logout
// @access  Private
const logout = async (req, res, next) => {
    try {
        // Invalidate the token by removing it from the client side
        res.status(200).json({
            success: true,
            message: 'Logged out successfully'
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Home route
// @route   GET /api/auth/home
// @access  Public
const home = (req, res) => {
    res.send(`
    <h1>Welcome to the Luxury API</h1>
    <h2>Register</h2>
    <form method="POST" action="/api/auth/register">
        <input name="username" placeholder="Username" required />
        <input name="email" type="email" placeholder="Email" required />
        <input name="password" type="password" placeholder="Password" required />
        <button type="submit">Register</button>
    </form>
    <h2>Login</h2>
    <form method="POST" action="/api/auth/login">
        <input name="email" type="email" placeholder="Email" required />
        <input name="password" type="password" placeholder="Password" required />
        <button type="submit">Login</button>
    </form>
    <h2>Get Me</h2>
    <form method="GET" action="/api/auth/me">
        <button type="submit">Get My Profile</button>
    </form>
    <h2>Logout</h2>
    <form method="POST" action="/api/auth/logout">
        <button type="submit">Logout</button>
    </form>
    `);
};

module.exports = {
  register,
  login,
  getMe,
  logout,
  home
};