<template>
  <div class="settings-content">
    <q-card class="my-card" flat bordered>
      <q-card-section>
        <div class="q-mb-md">
          <q-item-label class="bold-text">Use this device to display room status or as master controller?</q-item-label>
          <div class="button-group">
            <q-btn
              :class="{'btn-active': selectedOption === 'master-controller'}"
              @click="setOption('master-controller')"
              class="full-width q-mb-sm"
              color="light-grey"
              label="Master Controller"
            />
            <q-btn
              :class="{'btn-active': selectedOption === 'room-status'}"
              @click="setOption('room-status')"
              class="full-width"
              color="light-grey"
              label="Room Status"
            />
          </div>
        </div>

        <div v-if="!isMasterController" class="q-mb-md room-options-box">
          <q-item-label class="room-options-label bold-text">Which room will this device show?</q-item-label>
          <q-option-group
            type="radio"
            v-model="selectedRoom"
            :options="roomOptions"
          />
        </div>
      </q-card-section>
    </q-card>
    
    <!-- Buttons outside the card -->
    <div class="action-buttons">
      <q-btn class="q-mb-md" color="primary" label="Done" />
      <q-btn color="negative" label="Sign Out" @click="confirmSignOut" />
    </div>

    <!-- Confirmation Dialog -->
    <q-dialog v-model="dialogVisible">
      <div class="confirmation-dialog">
        <q-card>
          <q-card-section class="row items-center">
            <q-item-label>Are you sure you want to sign out?</q-item-label>
          </q-card-section>

          <q-card-section class="dialog-buttons">
            <q-btn flat label="Cancel" color="black" @click="dialogVisible = false" />
            <q-btn flat label="Sign Out" color="negative" @click="signOut" />
          </q-card-section>
        </q-card>
      </div>
    </q-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedRoom: null,
      selectedOption: 'room-status', // Default to 'room-status'
      isMasterController: false,
      dialogVisible: false,
      roomOptions: [
        { label: 'Room 1', value: 'room-1' },
        { label: 'Room 2', value: 'room-2' },
        { label: 'Room 3', value: 'room-3' },
        { label: 'Room 4', value: 'room-4' },
        { label: 'Room 5', value: 'room-5' },
      ]
    };
  },
  methods: {
    setOption(option) {
      this.selectedOption = option;
      this.isMasterController = option === 'master-controller';
    },
    confirmSignOut() {
      this.dialogVisible = true;
    },
    signOut() {
      localStorage.removeItem('token'); // Clear the token from local storage
      this.$router.push('/'); // Redirect to the login page
      this.dialogVisible = false; // Close the dialog
    }
  }
};
</script>

<style scoped>
.settings-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 90vh;
}

.my-card {
  width: 50%;
  max-width: 800px;
  margin-bottom: 2rem;
}

.q-mb-md {
  margin-bottom: 1rem;
}

.button-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.full-width {
  width: 100%;
}

.btn-active {
  background-color: rgb(17, 199, 17) !important; /* Green color for active button */
  color: white !important;
}

.q-btn {
  color: black; /* Default text color */
  background-color: transparent; /* Remove background color */
  border-radius: 0;
  transition: color 0.3s, background-color 0.3s; /* Smooth color transitions */
}

.q-btn.light-grey {
  color: black; /* Text color for light grey buttons */
}

.q-btn.light-grey.btn-active {
  background-color: green !important; /* Green background when active */
  color: white !important; /* White text color when active */
}

.q-btn:hover {
  background-color: transparent; /* No background color on hover */
  color: grey; /* Text color changes to grey on hover */
}

/* Ensure the button text color is correct when active */
.button-group .q-btn {
  color: black !important; /* Ensure text color is black for all buttons in the group */
}

.button-group .q-btn.btn-active {
  color: white !important; /* White text color for active button */
}

.room-options-box {
  border: 1px solid #ccc;
  padding: 2rem;
  width: 100%;
  max-width: 500px;
  display: flex;
  flex-direction: column;
}

.room-options-label {
  margin-bottom: 1rem;
}

.bold-text {
  font-weight: bold;
  color: rgb(105, 102, 102);
}

.action-buttons {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 5px;
}

.action-buttons .q-mb-md {
  margin-bottom: 1rem;
}

/* Custom styles for the confirmation dialog */
.confirmation-dialog {
  width: 300px; /* Adjust the width of the dialog box */
  max-width: 80%; /* Ensure it doesn't exceed 80% of the screen width */
  margin: auto;
}

.dialog-buttons {
  display: flex;
  justify-content: center; /* Center the buttons */
  gap: 1rem;
}

</style>

