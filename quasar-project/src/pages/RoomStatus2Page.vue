<template>
  <RoomLayout
    :roomStatus="roomStatus"
    :headerColor="headerColor"
    roomNumber="02"
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
  name: 'Room2StatusPage',
  components: { RoomLayout },
  data() {
    return {
      roomStatus: null,
      headerColor: '#A45C28',
      logoUrl: 'https://firebasestorage.googleapis.com/v0/b/my-clinic-c19ba.appspot.com/o/msmc-logo.png?alt=media&token=c627c52e-c31f-4086-82b6-866aaaa1baf8',
      menuVisible: false,
      statuses: []
    };
  },
  async mounted() {
    try {
      const roomResponse = await axios.get('/rooms/room-2');
      this.roomStatus = roomResponse.data.status;
      this.headerColor = this.darkenColor(this.roomStatus.color, 0.8);

      const statusesResponse = await axios.get('/statuses');
      this.statuses = statusesResponse.data;
    } catch (error) {
      console.error('Error fetching room status or statuses:', error);
    }
  },
  methods: {
    toggleMenu() {
      this.menuVisible = !this.menuVisible;
    },
    changeStatus(status) {
      // Find the selected status from the statuses list
      const selectedStatus = this.statuses.find(s => s.name === status.name);

      if (selectedStatus) {
        // Update the room's status and color
        this.roomStatus = selectedStatus;
        this.headerColor = this.darkenColor(selectedStatus.color, 0.8); // Update only the header color
        this.menuVisible = false;

        // Send the full status (text and color) to the backend for updating
        axios
          .put(`/rooms/room-2`, {
            status: {
              text: selectedStatus.text,
              color: selectedStatus.color, // This is for the header color
            },
            // Keep the original room's background color (primaryColor) intact
            primaryColor: this.roomStatus.primaryColor, // Do not change the background color
          })
          .then(() => {
            console.log('Room updated successfully');
          })
          .catch(err => {
            console.error('Error updating status:', err);
          });
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
      const darken = x => Math.floor(x * factor);
      return `rgb(${darken(r)}, ${darken(g)}, ${darken(b)})`;
    }
  }
};
</script>
