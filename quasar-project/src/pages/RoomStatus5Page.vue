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
  name: 'Room5StatusPage',
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
    toggleMenu() {
      this.menuVisible = !this.menuVisible;
    },
    changeStatus(status) {
      axios
        .put('/rooms/room-5', { statusId: status._id })
        .then(() => {
          this.roomStatus = status;
          this.headerColor = this.darkenColor(status.color, 0.8);
          this.menuVisible = false;
        })
        .catch(err => console.error('Error updating status:', err));
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
