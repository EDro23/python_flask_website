const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
const port = 3000;

console.log('Starting server script...');

app.use(cors());
app.use(bodyParser.json());

// Log incoming requests
app.use((req, res, next) => {
  console.log(`Received ${req.method} request for ${req.url}`);
  next();
});

// Hard-coded user credentials
const storedUser = {
  username: 'ethandrover@hotmail.com', // Change as needed
  password: '$2b$10$NuGURSq5gvIq7aBg5YEgt.iELBGwxmr7OE2YbWsXw4Z4X8vnT.wna' // Replace with your hashed password
};

app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  console.log('Received request:', { username, password });
  console.log('Stored user:', storedUser);

  if (username === storedUser.username) {
    console.log('Username matches.');
    try {
      const match = await bcrypt.compare(password, storedUser.password);
      console.log('Password match:', match);

      if (match) {
        const token = jwt.sign({ username }, 'your_jwt_secret', { expiresIn: '1h' });
        res.json({ token });
      } else {
        console.log('Password did not match.');
        res.status(401).send('Username or Password did not match, Please try Again.');
      }
    } catch (error) {
      console.error('Error during bcrypt comparison:', error);
      res.status(500).send('Internal Server Error');
    }
  } else {
    console.log('Username did not match.');
    res.status(401).send('Username or Password did not match, Please try Again.');
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});


