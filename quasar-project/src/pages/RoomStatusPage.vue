<template>
    <div class="room-status-page" :style="{ backgroundColor: room.statusColor }">
      <q-card class="room-status-card">
        <q-card-section class="room-number-section">
          <div class="room-number">{{ room.number }}</div>
        </q-card-section>
        <q-card-section class="room-status-section">
          <div class="room-status">{{ room.status }}</div>
        </q-card-section>
      </q-card>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        room: {
          number: '',
          status: '',
          statusColor: ''
        }
      };
    },
    methods: {
      loadRoomStatus() {
        const rooms = JSON.parse(localStorage.getItem('rooms')) || [];
        const room = rooms.find(r => r.number === this.$route.params.roomNumber);
        if (room) {
          this.room = room;
        } else {
          this.$router.push('/404'); // Redirect to a 404 page if room is not found
        }
      }
    },
    mounted() {
      this.loadRoomStatus();
    },
    watch: {
      '$route.params.roomNumber': 'loadRoomStatus'
    }
  };
  </script>
  
  <style scoped>
  .room-status-page {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }
  
  .room-status-card {
    width: 300px;
    text-align: center;
  }
  
  .room-number-section {
    font-size: 2rem;
    font-weight: bold;
    background-color: #2196f3;
    color: white;
  }
  
  .room-status-section {
    font-size: 1.5rem;
    color: white;
  }
  </style>
  