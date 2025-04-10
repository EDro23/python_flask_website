<template>
  <div class="fullscreen" :style="{ backgroundColor: roomStatus?.color || '#fff' }" @click="toggleMenu">
    <div class="header" :style="{ backgroundColor: headerColor }">
      <img
        src="https://firebasestorage.googleapis.com/v0/b/my-clinic-c19ba.appspot.com/o/msmc-logo.png?alt=media&token=c627c52e-c31f-4086-82b6-866aaaa1baf8"
        alt="Main Street Medical"
        class="mc-company-logo"
      />
      <span class="mc-room-number">05</span>
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
  name: 'Room5StatusPage',
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
      const roomResponse = await axios.get('/rooms/room-5');
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
      const darken = (c) => Math.floor(c * factor);
      return `rgb(${darken(r)}, ${darken(g)}, ${darken(b)})`;
    },
    toggleMenu() {
      this.menuVisible = !this.menuVisible;
    },
    async changeStatus(status) {
      try {
        await axios.post('/update-room-status', {
          room: 'room-5',
          statusId: status._id
        });
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
.header {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  padding: 10px 20px;
}

.mc-company-logo {
  height: 60px;
  object-fit: contain;
}

.mc-room-number {
  position: absolute;
  right: 20px;
  top: 15px;
  font-size: 28px;
  font-weight: bold;
  color: white;
}

.mc-status-main {
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 100px);
}

.mc-room-status {
  font-size: 72px;
  font-weight: bold;
  color: white;
  text-align: center;
  word-wrap: break-word;
  padding: 0 30px;
}
</style>
