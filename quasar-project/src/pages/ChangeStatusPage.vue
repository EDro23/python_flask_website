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
import axios from 'axios';

export default {
  name: 'ChangeStatusPage',
  data() {
    return {
      room: null,
      selectedStatus: '',
      statusOptions: [],
    };
  },
  methods: {
    loadRoomData() {
      const roomData = this.$route.query.room;
      if (roomData) {
        try {
          this.room = JSON.parse(roomData);
          this.selectedStatus = this.room.status ? this.room.status.text : '';
          console.log('Loaded room data:', this.room);
        } catch (error) {
          console.error('Error parsing room data:', error);
        }
      } else {
        console.log('No room data received');
      }
    },
    async loadStatuses() {
      try {
        const response = await axios.get('http://localhost:3001/api/statuses');
        this.statusOptions = response.data.map(status => ({
          id: status._id,
          name: status.name,
          color: status.color,
          text: status.text,
        }));
        console.log('Loaded statuses:', this.statusOptions);
      } catch (error) {
        console.error('Error loading statuses:', error);
      }
    },
    cancel() {
      this.$router.push('/dashboard');
    },
    async saveStatus() {
      console.log('Save button clicked');
      console.log('Selected status:', this.selectedStatus);

      if (this.room && this.selectedStatus) {
        // Extract the plain object from the Proxy
        const selectedName = this.selectedStatus.name || this.selectedStatus;

        // Find the selected status by name
        const selectedStatus = this.statusOptions.find(
          status => status.name === selectedName
        );

        if (selectedStatus) {
          console.log('Selected status found:', selectedStatus);

          // Update the room's status and color
          this.room.status = {
            text: selectedStatus.text,
            color: selectedStatus.color,
          };

          try {
            await axios.put(`http://localhost:3001/api/rooms/${this.room.number}`, {
              status: this.room.status,
              primaryColor: this.room.primaryColor,
            });
            console.log('Room updated successfully');
            this.$router.push('/dashboard');
          } catch (error) {
            console.error('Error updating room status:', error);
          }
        } else {
          console.error('Selected status not found.');
        }
      } else {
        console.error('Room or selected status is undefined.');
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
