<template>
    <div class="room-status-page" :style="{ backgroundColor: roomStatus?.color || '#fff' }">
      <div class="header">
        <img src="/msmc_medical_logo.png" alt="Main Street Medical" class="logo">
        <h1>{{ roomStatus?.text || 'Loading...' }}</h1>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'Room1StatusPage',
    data() {
      return {
        roomStatus: null,
      };
    },
    async mounted() {
      try {
        const response = await axios.get('http://localhost:3001/api/rooms/room-4');
        this.roomStatus = response.data.status;
      } catch (error) {
        console.error('Error fetching room status:', error);
      }
    }
  };
  </script>
  
  <style scoped>
  .room-status-page {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    color: white;
    text-align: center;
  }
  
  .header {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .logo {
    width: 200px;
    margin-bottom: 20px;
  }
  
  h1 {
    font-size: 3rem;
  }
  </style>
  