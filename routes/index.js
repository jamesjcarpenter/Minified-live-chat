const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');

// Welcome Page
router.get('/', forwardAuthenticated, (req, res) => res.sendFile(__dirname + '/index.html'))

// Dashboard
router.get('/', ensureAuthenticated, (req, res) =>
res.sendFile("register.html"))

module.exports = router;
