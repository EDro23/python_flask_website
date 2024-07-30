<template>
    <q-page padding>
      <div class="change-status-page">
        <q-card class="q-pa-md">
          <q-card-section>
            <div class="text-h6">Change Status for Room {{ room ? room.number : 'N/A' }}</div>
          </q-card-section>
  
          <q-card-section v-if="room">
            <q-select
              v-model="selectedStatus"
              :options="statuses"
              label="Select a new status"
            />
          </q-card-section>
  
          <q-card-actions align="right">
            <q-btn flat label="Cancel" @click="cancel" />
            <q-btn color="primary" label="Save" @click="saveStatus" />
          </q-card-actions>
        </q-card>
      </div>
    </q-page>
  </template>
  
  <script>
  export default {
    name: 'ChangeStatusPage',
    data() {
      return {
        room: null,
        selectedStatus: '',
        statuses: ['Status 1', 'Status 2', 'Status 3', 'Status 4', 'Status 5'], // Example statuses
      };
    },
    methods: {
      loadRoomData() {
        const roomData = this.$route.query.room;
        if (roomData) {
          this.room = JSON.parse(roomData);
          this.selectedStatus = this.room.status;
          console.log('Loaded room data:', this.room); // Log loaded room data
        } else {
          console.log('No room data received'); // Log if no room data is received
        }
      },
      cancel() {
        this.$router.push('/dashboard');
      },
      saveStatus() {
        if (this.room) {
          this.room.status = this.selectedStatus;
          // Save updated room data to local storage or state management
          // Example:
          // localStorage.setItem('rooms', JSON.stringify(this.rooms));
          this.$router.push('/dashboard');
        }
      },
    },
    mounted() {
      this.loadRoomData();
    },
  };
  </script>
  
  <style scoped>
  .change-status-page {
    max-width: 400px;
    margin: auto;
    margin-top: 100px;
  }
  </style>
  