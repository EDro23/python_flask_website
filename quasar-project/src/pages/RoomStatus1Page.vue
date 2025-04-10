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
      intervalId: null,  // 👈 for polling
      isStatusUpdatedLocally: false, // 👈 to track if status is changed manually
    };
  },
  async mounted() {
    await this.fetchRoomStatus(); // Initial fetch
    await this.loadStatuses();

    // ⏱️ Start polling every 3 seconds, but not if the status is changed locally
    this.intervalId = setInterval(this.fetchRoomStatus, 3000);
  },
  beforeUnmount() {
    // 🧹 Stop polling when leaving the page
    clearInterval(this.intervalId);
  },
  methods: {
    toggleMenu() {
      this.menuVisible = !this.menuVisible;
    },
    async fetchRoomStatus() {
      try {
        const response = await axios.get('/rooms/room-1');
        const newStatus = response.data.status;

        // Only update room status if it wasn't changed manually
        if (!this.isStatusUpdatedLocally && (!this.roomStatus || this.roomStatus._id !== newStatus._id)) {
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
      const selectedStatus = this.statuses.find(s => s.name === status.name);

      if (selectedStatus) {
        // Manually change the status and stop polling updates
        this.roomStatus = selectedStatus;
        this.headerColor = this.darkenColor(selectedStatus.color, 0.8);
        this.isStatusUpdatedLocally = true;
        this.menuVisible = false;

        // Reset polling to avoid overwriting the manual change
        clearInterval(this.intervalId);

        // Send the update to the server
        try {
          await axios.put(`/rooms/room-1`, {
            status: {
              text: selectedStatus.text,
              color: selectedStatus.color, // For the header color
            }
          });
          console.log('Room updated successfully');
        } catch (err) {
          console.error('Error updating status:', err);
        }

        // After 5 seconds, resume polling
        setTimeout(() => {
          this.isStatusUpdatedLocally = false;
          this.intervalId = setInterval(this.fetchRoomStatus, 3000);
        }, 5000);
      } else {
        console.error('Status not found:', status);
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
      const darken = (val) => Math.max(0, Math.floor(val * factor)).toString(16).padStart(2, '0');
      return `#${darken(r)}${darken(g)}${darken(b)}`;
    }
  }
};
</script>
