const bcrypt = require('bcrypt');

const password = 'ethan'; // Replace with your actual password
const saltRounds = 10; // Number of salt rounds

bcrypt.hash(password, saltRounds, (err, hash) => {
  if (err) {
    console.error('Error generating hash:', err);
    return;
  }
  console.log('Generated Hash:', hash);
});
