<template>
  <RoomLayout
    :roomStatus="roomStatus"
    :headerColor="headerColor"
    roomNumber="04"
    logoUrl="https://firebasestorage.googleapis.com/v0/b/my-clinic-c19ba.appspot.com/o/msmc-logo.png?alt=media&token=c627c52e-c31f-4086-82b6-866aaaa1baf8"
    :menuVisible="menuVisible"
    :statuses="statuses"
    @background-click="toggleMenu"
    @select-status="changeStatus"
    @exit-click="goToDashboard"
  />
</template>

<script>
import axios from 'axios';
import RoomLayout from 'src/components/RoomLayout.vue';

export default {
  name: 'Room4StatusPage',
  components: {
    RoomLayout
  },
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
      const roomResponse = await axios.get('/rooms/room-4');
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
      axios
        .put('/rooms/room-4', { statusId: status._id })
        .then(() => {
          this.roomStatus = status;
          this.headerColor = this.darkenColor(status.color, 0.8);
          this.menuVisible = false;
        })
        .catch((error) => {
          console.error('Error updating status:', error);
        });
    },
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

      return `rgb(${newR}, ${newG}, ${newB})`;
    }
  }
};
</script>
