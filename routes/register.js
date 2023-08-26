// server.js (Backend)
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(bodyParser.json());

// Simulated database
const users = [];
let adminRole = false;

// User registration endpoint
app.post('/api/register', (req, res) => {
  const newUser = req.body;
  newUser.approved = false;
  users.push(newUser);
  res.json({ msg: 'User registered and pending approval' });
});

// Admin approval endpoint
app.post('/api/approve/:userId', (req, res) => {
  const userId = req.params.userId;
  const user = users.find((u) => u.id === userId);
  
  if (!user) {
    return res.status(404).json({ msg: 'User not found' });
  }

  if (!adminRole) {
    return res.status(403).json({ msg: 'Only admin can approve users' });
  }

  user.approved = true;
  res.json({ msg: 'User approved by admin' });
});

// User login endpoint
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find((u) => u.email === email && u.password === password);
  
  if (!user) {
    return res.status(401).json({ msg: 'Invalid credentials' });
  }

  if (!user.approved) {
    return res.status(401).json({ msg: 'User not approved by admin' });
  }

  res.json({ msg: 'Login successful' });
});

app.listen(8080, () => {
  console.log('Server is running on port 8080');
});
