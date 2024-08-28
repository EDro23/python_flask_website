<template>
  <div class="fullscreen" :style="{ backgroundColor: roomStatus?.color || '#fff' }" @click="toggleMenu">
    <div class="header" :style="{ backgroundColor: headerColor }">
      <div class="row items-center">
        <div class="col">
          <img src="https://firebasestorage.googleapis.com/v0/b/my-clinic-c19ba.appspot.com/o/msmc-logo.png?alt=media&token=c627c52e-c31f-4086-82b6-866aaaa1baf8" alt="Main Street Medical" class="mc-company-logo responsive">
        </div>
        <div class="col">
          <span class="mc-room-number pull-right">01</span>
        </div>
      </div>
    </div>
    <div class="mc-status-main">
      <span class="mc-room-status">{{ roomStatus?.text || 'Loading...' }}</span>
    </div>
    <div v-if="menuVisible">
      <q-menu v-model="menuVisible" anchor="center middle">
        <q-list>
          <q-item v-for="status in statuses" :key="status._id" clickable @click="changeStatus(status)">
            <q-item-section>{{ status.name }}</q-item-section>
          </q-item>
        </q-list>
      </q-menu>
      <button
        class="q-btn q-btn-round q-btn-big q-btn-outline text-white cursor-pointer"
        id="mc-exit-button"
        @click.stop="goToDashboard"
      >
        <i aria-hidden="true" class="q-icon material-icons">exit_to_app</i>
      </button>
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
      headerColor: '#A45C28', // Default header color
      menuVisible: false, // Menu visibility state
      statuses: [] // Array to store all statuses
    };
  },
  async mounted() {
    try {
      const roomResponse = await axios.get('http://localhost:3001/api/rooms/room-1');
      this.roomStatus = roomResponse.data.status;
      // Calculate the darker header color
      this.headerColor = this.darkenColor(this.roomStatus.color, 0.8);
      
      // Load all statuses
      const statusesResponse = await axios.get('http://localhost:3001/api/statuses');
      this.statuses = statusesResponse.data;
    } catch (error) {
      console.error('Error fetching room status or statuses:', error);
    }
  },
  methods: {
    goToDashboard() {
      this.$router.push('/dashboard');
    },
    darkenColor(color, factor) {
      const rawColor = color.replace('#', '');
      const r = parseInt(rawColor.substring(0, 2), 16);
      const g = parseInt(rawColor.substring(2, 4), 16);
      const b = parseInt(rawColor.substring(4, 6), 16);

      const newR = Math.floor(r * factor);
      const newG = Math.floor(g * factor);
      const newB = Math.floor(b * factor);

      return `#${newR.toString(16).padStart(2, '0')}${newG.toString(16).padStart(2, '0')}${newB.toString(16).padStart(2, '0')}`;
    },
    toggleMenu() {
      this.menuVisible = !this.menuVisible;
    },
    async changeStatus(status) {
      try {
        // Update room status on the server
        await axios.put(`http://localhost:3001/api/rooms/room-1`, { status });
        this.roomStatus = status; // Update the status locally
        this.headerColor = this.darkenColor(status.color, 0.8); // Update header color
        this.menuVisible = false; // Close the menu
      } catch (error) {
        console.error('Error updating room status:', error);
      }
    }
  }
};
</script>

<style scoped>
.fullscreen {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  color: white;
  text-align: center;
}

.header {
  width: 100%;
  height:100%;
  padding: 1rem;
}

.row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.col {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
}

.mc-company-logo {
  width: 750px;
  height: 200px;
}

.mc-room-number {
  font-size: 10rem;
  display: flex;
  margin-left: 700px;
}

.mc-status-main {
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.mc-room-status {
  font-size: 7rem;
  margin-bottom: 500px;
  margin-right: 750px;
  display: flex;
}

.q-btn {
  position: absolute;
  bottom: 20px;
  margin: 10px;
  cursor: pointer; /* Ensure cursor is pointer when hovering */
}

#mc-exit-button {
  right: 20px;
}
</style>
