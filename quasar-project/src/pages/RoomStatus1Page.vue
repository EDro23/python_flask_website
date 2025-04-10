<template>
  <RoomLayout
    :roomStatus="roomStatus"
    :headerColor="headerColor"
    roomNumber="01"
    :logoUrl="logoUrl"
    :menuVisible="menuVisible"
    :statuses="statuses"
    @toggle-menu="toggleMenu"
    @change-status="changeStatus"
    @exit="goToDashboard"
  />
</template>

<script>
import axios from 'axios';
import RoomLayout from 'src/components/RoomLayout.vue';

export default {
  name: 'Room1StatusPage',
  components: { RoomLayout },
  data() {
    return {
      roomStatus: null,
      headerColor: '#A45C28',
      logoUrl: 'https://firebasestorage.googleapis.com/v0/b/my-clinic-c19ba.appspot.com/o/msmc-logo.png?alt=media&token=c627c52e-c31f-4086-82b6-866aaaa1baf8',
      menuVisible: false,
      statuses: [],
      intervalId: null,
      lastLocalChange: 0 // 🕒 Tracks last local change timestamp
    };
  },
  async mounted() {
    await this.fetchRoomStatus(); // Initial load
    await this.loadStatuses();

    // ⏱ Poll every 3 seconds
    this.intervalId = setInterval(this.fetchRoomStatus, 3000);
  },
  beforeUnmount() {
    clearInterval(this.intervalId); // 🧹 Clean up
  },
  methods: {
    toggleMenu() {
      this.menuVisible = !this.menuVisible;
    },
    async fetchRoomStatus() {
      const now = Date.now();
      if (now - this.lastLocalChange < 5000) return; // 🚫 Skip if local change was recent

      try {
        const response = await axios.get('/rooms/room-1');
        const newStatus = response.data.status;

        if (!this.roomStatus || this.roomStatus._id !== newStatus._id) {
          this.roomStatus = newStatus;
          this.headerColor = this.darkenColor(newStatus.color, 0.8);
        }
      } catch (error) {
        console.error('Error fetching room status:', error);
      }
    },
    async loadStatuses() {
      try {
        const response = await axios.get('/statuses');
        this.statuses = response.data;
      } catch (error) {
        console.error('Error loading statuses:', error);
      }
    },
    async changeStatus(status) {
      try {
        await axios.put('/rooms/room-1', { statusId: status._id });
        this.roomStatus = status;
        this.headerColor = this.darkenColor(status.color, 0.8);
        this.menuVisible = false;
        this.lastLocalChange = Date.now(); // 🕒 Update timestamp of local change
      } catch (error) {
        console.error('Error updating status:', error);
      }
    },
    goToDashboard() {
      this.$router.push('/dashboard');
    },
    darkenColor(color, factor) {
      const raw = color.replace('#', '');
      const r = parseInt(raw.substring(0, 2), 16);
      const g = parseInt(raw.substring(2, 4), 16);
      const b = parseInt(raw.substring(4, 6), 16);
      const darken = (c) => Math.max(0, Math.floor(c * factor));
      return `rgb(${darken(r)}, ${darken(g)}, ${darken(b)})`;
    }
  }
};
</script>
