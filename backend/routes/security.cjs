const express = require("express")
const path = require("path")
const router = express.Router()

router.get(`/profile`, (req, res) => {
  if (req.session.user) {
    res.sendFile(path.join(__dirname,'..','..', 'privatePage', 'profile.html'));
  } else {
    res.redirect('/home');
  }
});
router.get('/login', (req, res) => {
  console.log('Session user:', req.session.user);
  if (!req.session.user) {
    res.sendFile(path.join(__dirname,'..','..', 'privatePage', 'loginForm.html'));
  } else {
    res.redirect('/home')
  }
})
router.get('/signup', (req, res) => {
  if (!req.session.user) {
    res.sendFile(path.join(__dirname,'..','..', 'privatePage', 'signupForm.html'));
  } else {
    res.redirect('/home')
  }
})
module.exports = router;