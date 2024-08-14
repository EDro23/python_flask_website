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
import { io } from 'socket.io-client';

export default {
  name: 'RoomStatusPage',
  data() {
    return {
      roomStatus: null,
      socket: null,
    };
  },
  async mounted() {
    const roomNumber = this.$route.params.number;
    try {
      const response = await axios.get(`http://localhost:3001/api/rooms/${roomNumber}`);
      this.roomStatus = response.data.status;

      // Set up WebSocket connection
      this.socket = io('http://localhost:3001');
      this.socket.on('statusUpdated', (updatedStatus) => {
        if (updatedStatus._id === response.data._id) {
          this.roomStatus = updatedStatus;
        }
      });
    } catch (error) {
      console.error('Error fetching room status:', error);
    }
  },
  beforeUnmount() {
    if (this.socket) {
      this.socket.disconnect();
    }
  },
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
