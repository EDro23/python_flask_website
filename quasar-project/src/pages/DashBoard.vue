<template>
  <div id="mc-rooms" class="dashboard">
    <div
      v-for="room in rooms"
      :key="room.number"
      class="q-card mc-room cursor-pointer"
      :style="{ width: '250px', backgroundColor: room.primaryColor }"
    >
      <div class="q-card-primary q-card-container row no-wrap text-white">
        <div class="col column">
          <div class="q-card-title">
            <big class="text-bold rm-num">{{ formatRoomNumber(room.number) }}</big>
          </div>
          <div class="q-card-subtitle"></div>
        </div>
        <div class="col-auto self-center q-card-title-extra"></div>
      </div>
      <div
        class="q-card-main q-card-container mc-room-status"
        :style="{ backgroundColor: room.status.color }"
      >
        <big class="text-bold">{{ room.status.text }}</big>
      </div>
      <div class="q-card-actions q-card-actions-horiz row justify-start">
        <q-btn
          flat
          label="Status"
          @click="goToChangeStatus(room)"
          class="status-btn"
        >
          <span></span>&nbsp;<i aria-hidden="true" class="q-icon material-icons">menu</i>
        </q-btn>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      rooms: [],
    };
  },
  methods: {
    async loadRooms() {
      try {
        const response = await axios.get('http://localhost:3001/api/rooms');
        // Sort rooms by room number after fetching
        this.rooms = response.data.sort((a, b) => {
          const roomA = parseInt(a.number.replace('room-', ''));
          const roomB = parseInt(b.number.replace('room-', ''));
          return roomA - roomB;
        });
      } catch (error) {
        console.error('Error loading rooms:', error);
      }
    },
    goToChangeStatus(room) {
      this.$router.push({
        path: '/change-status',
        query: { room: JSON.stringify(room) },
      });
    },
    formatRoomNumber(roomNumber) {
      return `Room ${roomNumber.replace('room-', '')}`;
    },
  },
  mounted() {
    this.loadRooms();
  },
};
</script>

<style scoped>
.dashboard {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: flex-start;
  margin-left: 60px;
  margin-top: 100px;
  padding: 1rem;
}

.q-card {
  background-color: transparent;
  border: 1px solid #777777;
  min-height: 250px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.q-card-primary,
.q-card-actions {
  background-color: transparent;
}

.q-card-main {
  height: 110px;
  width: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
}

.q-card-actions {
  padding: 0;
}

.status-btn {
  width: 100%;
  border: none;
  color: rgb(0, 0, 0);
  margin-top: 30px;
  margin-bottom: -10px;
}

.q-menu {
  z-index: 1000;
}

.dashboard {
  color: white;
}

.rm-num {
  color: black;
}
</style>
