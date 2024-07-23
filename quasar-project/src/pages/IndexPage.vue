<template>
  <div id="q-app">
    <div class="row">
      <div class="col-md-6 fixed-center">
        <div id="mc-sign-in" class="q-card">
          <div class="q-card-primary q-card-container row no-wrap text-center bg-primary">
            <div class="col column">
              <div class="q-card-title">
                <img src="/msmc_medical_logo.png" alt="Logo" class="logo">
              </div>
            </div>
            <div class="col-auto self-center q-card-title-extra"></div>
          </div>
          <div class="q-card-main q-card-container">
            <div class="input-container">
              <i class="fa fa-envelope mail-icon"></i>
              <input type="email" id="email" class="text-input" v-model="email" placeholder="Email">
            </div>
            <div class="input-container">
              <i class="fa fa-lock lock-icon"></i>
              <input :type="passwordFieldType" id="password" class="text-input" v-model="password" placeholder="Password">
              <i class="fa fa-eye eye-icon" @click="togglePasswordVisibility"></i>
            </div>
            <!-- Error message -->
            <div v-if="errorMessage" class="error-message">
              {{ errorMessage }}
            </div>
          </div>
          <div class="q-card-actions q-card-actions-vert column justify-start items-start">
            <button @click="signIn" class="q-btn row inline flex-center q-focusable q-hoverable relative-position fit q-btn-rectangle q-btn-standard bg-primary text-white">
              <div class="desktop-only q-focus-helper"></div>
              <span class="q-btn-inner row col flex-center">
                Sign In
              </span>
            </button>
          </div>
        </div>
        <p class="text-center light-paragraph">
          <small>Developed by MainStreet Medical</small>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      email: '',
      password: '',
      passwordFieldType: 'password', // Default to password hidden
      errorMessage: '' // Initialize errorMessage
    }
  },
  methods: {
    async signIn() {
      try {
        const response = await axios.post('http://localhost:3000/login', {
          username: this.email, // The username (email) field
          password: this.password // The password field
        });

        // Check if response contains a token
        if (response.data && response.data.token) {
          localStorage.setItem('token', response.data.token); // Save the token in local storage
          this.$router.push({ path: '/settings' }); // Redirect to the settings page or wherever needed
        } else {
          this.errorMessage = 'Unexpected response format';
        }
      } catch (error) {
        // Handle error response and show message to the user
        console.error('Login failed:', error.response?.data || error.message);
        this.errorMessage = error.response?.data || 'Login failed. Please check your username and password.';
      }
    },
    togglePasswordVisibility() {
      this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
    }
  }
}
</script>

<style>
#q-app {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f0f0;
  text-align: start;
}

.q-card {
  width: 100%;
  max-width: 400px;
  padding: 25px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: #fff;
}

.q-card-primary {
  height: auto; /* Adjust as needed */
  display: flex;
  flex-direction: column; /* Stack items vertically */
  align-items: center; /* Center horizontally */
  background-color: #007bff; /* Blue background color */
  border-radius: 10px;
  padding: 5px; /* Add padding for spacing */
}

.logo {
  width: 100%;
  max-width: 200px; /* Adjust logo size */
  margin-bottom: 0px; /* Space between logo and form */
  align-items: center;
}

.q-card-main {
  padding: 40px;
}

.input-container {
  position: relative;
  margin-bottom: 25px;
}

.input-container .fa {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  font-size: 18px;
  color: #999;
  z-index: 1;
}

.mail-icon {
  left: 10px;
}

.lock-icon {
  left: 10px;
}

.eye-icon {
  right: 10px;
  cursor: pointer;
}

.text-input {
  width: 100%;
  padding: 10px 10px 10px 40px; /* Adjust padding to make space for icons */
  padding-right: 40px; /* Space for the eye icon */
  border: none;
  border-bottom: 2px solid #ddd;
  margin-top: 2px;
  outline: none;
  transition: border-color 0.3s, border-bottom-width 0.3s;
}

.text-input:focus {
  border-bottom: 2px solid #ff0000; /* Red underline */
  font-weight: bold; /* Make text bold on focus */
  border-bottom-width: 2px; /* Thicker red line on focus */
}

.q-card-actions {
  margin-top: 5px;
}

.fixed-center {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.error-message {
  color: red; /* Makes the error message text red */
  margin-top: 10px; /* Adds some space above the error message */
}
</style>