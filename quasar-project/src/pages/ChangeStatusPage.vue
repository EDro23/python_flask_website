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
            :options="statusOptions"
            option-value="name"
            option-label="name"
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
      selectedStatus: '', // Use to bind the selected status name
      statusOptions: [], // Options for q-select with status names
    };
  },
  methods: {
    loadRoomData() {
      const roomData = this.$route.query.room;
      if (roomData) {
        this.room = JSON.parse(roomData);
        this.selectedStatus = this.room.status ? this.room.status.name : '';
        console.log('Loaded room data:', this.room); // Debugging
      } else {
        console.log('No room data received'); // Debugging
      }
    },
    loadStatuses() {
      const storedStatuses = JSON.parse(localStorage.getItem('statuses')) || [];
      this.statusOptions = storedStatuses.map(status => ({
        id: status.id,
        name: status.name,
        color: status.color,
        text: status.text,
      }));
      console.log('Loaded statuses:', this.statusOptions); // Debugging
    },
    cancel() {
      this.$router.push('/dashboard');
    },
    saveStatus() {
      console.log('Save button clicked'); // Debugging
      console.log('Selected status:', this.selectedStatus); // Debugging

      if (this.room && this.selectedStatus) {
        // Convert selectedStatus to a plain object if needed
        const selectedName = this.selectedStatus.name || this.selectedStatus;

        // Find the selected status by name
        const selectedStatus = this.statusOptions.find(status => status.name === selectedName);

        if (selectedStatus) {
          console.log('Selected status found:', selectedStatus); // Debugging

          // Update the room's status and color
          this.room.status = {
            text: selectedStatus.text,
            color: selectedStatus.color
          };

          // Update localStorage
          let storedRooms = JSON.parse(localStorage.getItem('rooms')) || [];
          const index = storedRooms.findIndex(r => r.number === this.room.number);
          if (index !== -1) {
            storedRooms[index] = this.room;
            localStorage.setItem('rooms', JSON.stringify(storedRooms));
            console.log('Room updated successfully'); // Debugging
          } else {
            console.error('Room not found in localStorage.'); // Debugging
          }

          // Redirect to dashboard
          this.$router.push('/dashboard');
        } else {
          console.error('Selected status not found.'); // Debugging
        }
      } else {
        console.error('Room or selected status is undefined.'); // Debugging
      }
    },
  },
  mounted() {
    this.loadRoomData();
    this.loadStatuses();
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
