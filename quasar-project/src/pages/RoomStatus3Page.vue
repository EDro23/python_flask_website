<template>
  <div class="fullscreen" :style="{ backgroundColor: roomStatus?.color || '#fff' }" @click="toggleMenu">
    <div class="header" :style="{ backgroundColor: headerColor }">
      <img
        src="https://firebasestorage.googleapis.com/v0/b/my-clinic-c19ba.appspot.com/o/msmc-logo.png?alt=media&token=c627c52e-c31f-4086-82b6-866aaaa1baf8"
        alt="Main Street Medical"
        class="mc-company-logo"
      />
      <span class="mc-room-number">03</span>
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
  name: 'Room3StatusPage',
  data() {
    return {
      roomStatus: null,
      headerColor: '#A45C28',
      menuVisible: false,
      statuses: []
    };
  },
  async mounted() {
    try {
      const roomResponse = await axios.get('/rooms/room-3');
      this.roomStatus = roomResponse.data.status;
      this.headerColor = this.darkenColor(this.roomStatus.color, 0.8);

      const statusesResponse = await axios.get('/statuses');
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
        await axios.put(`/rooms/room-3`, { status });
        this.roomStatus = status;
        this.headerColor = this.darkenColor(status.color, 0.8);
        this.menuVisible = false;
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
  height: 100vh;
  color: white;
  text-align: center;
  overflow: hidden;
  position: relative;
}

.header {
  width: 100%;
  padding: 1rem;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.mc-company-logo {
  max-width: 90%;
  height: auto;
  margin-bottom: 1rem;
}

.mc-room-number {
  font-size: 6rem;
  position: absolute;
  top: 1rem;
  right: 1rem;
}

.mc-status-main {
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.mc-room-status {
  font-size: 5rem;
  padding: 1rem;
  word-break: break-word;
}

.q-btn {
  position: absolute;
  bottom: 20px;
  right: 20px;
}
</style>
