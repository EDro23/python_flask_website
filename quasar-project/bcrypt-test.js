const bcrypt = require('bcrypt');

const password = 'Oranges101';
const hashedPassword = '$2b$10$NuGURSq5gvIq7aBg5YEgt.iELBGwxmr7OE2YbWsXw4Z4X8vnT.wna'; // Your stored hash

bcrypt.compare(password, hashedPassword, (err, result) => {
  if (err) {
    console.error('Error during comparison:', err);
  } else {
    console.log('Password match result:', result); // Should print true if the password matches
  }
});
