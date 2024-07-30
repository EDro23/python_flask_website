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
            <big class="text-bold">{{ room.number }}</big>
          </div>
          <div class="q-card-subtitle"></div>
        </div>
        <div class="col-auto self-center q-card-title-extra"></div>
      </div>
      <div
        class="q-card-main q-card-container mc-room-status"
        :style="{ backgroundColor: room.statusColor }"
      >
        <big class="text-bold">{{ room.status }}</big>
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
export default {
  data() {
    return {
      rooms: [
        { number: '01', primaryColor: 'rgb(164, 92, 40)', status: 'OH&S', statusColor: 'rgb(205, 115, 50)' },
        { number: '02', primaryColor: 'rgb(31, 176, 72)', status: 'Your Room is Ready!', statusColor: 'rgb(42, 217, 91)' },
        { number: '03', primaryColor: 'rgb(31, 176, 72)', status: 'Your Room is Ready!', statusColor: 'rgb(42, 217, 91)' },
        { number: '04', primaryColor: 'rgb(31, 176, 72)', status: 'Your Room is Ready!', statusColor: 'rgb(42, 217, 91)' },
        { number: '05', primaryColor: 'rgb(250, 35, 0)', status: 'OAMT', statusColor: 'rgb(255, 86, 58)' }
      ],
    };
  },
  methods: {
    goToChangeStatus(room) {
      this.$router.push({
        path: '/change-status',
        query: { room: JSON.stringify(room) },
      });
    },
  },
};
</script>

<style scoped>
.dashboard {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: flex-start; /* Align cards to the left */
  margin-left: 60px;
  margin-top: 100px;
  padding: 1rem; /* Add padding to move cards from the edges */
}

.q-card {
  background-color: transparent; /* Remove background color */
  border: 1px solid #ccc; /* Optional: Add border if needed */
  min-height: 250px; /* Set a minimum height for the card */
  display: flex;
  flex-direction: column; /* Ensure the card contents stack vertically */
  justify-content: space-between; /* Space out the card contents */
}

.q-card-primary,
.q-card-actions {
  background-color: transparent; /* Remove background color from card sections */
}

.q-card-main {
  height: 110px; /* Set a fixed height for the status box */
  width: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent; /* Remove background color from card sections */
}

.q-card-actions {
  padding: 0; /* Optional: Remove padding */
}

.status-btn {
  width: 100%; /* Make button span the full width */
  border: none; /* Optional: Border for button */
  color: rgb(255, 255, 255); /* Button text color */
  margin-top: 30px;
  margin-bottom: -10px;
}

.q-menu {
  z-index: 1000; /* Ensure menu appears on top */
}

.dashboard {
  color: white;
}
</style>
