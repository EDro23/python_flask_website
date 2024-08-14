<template>
  <div class="settings-content">
    <q-card class="my-card" flat bordered>
      <q-card-section>
        <div class="q-mb-md">
          <div class="top-text">
            <q-item-label class="bold-text">Use this device to display room status or as master controller?</q-item-label>
          </div>
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
    
    <div class="action-buttons">
      <q-btn class="q-mb-md" color="primary" label="Done" @click="navigateToRoom" />
      <q-btn color="negative" label="Sign Out" @click="confirmSignOut" />
    </div>

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
      selectedOption: 'room-status',
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
    navigateToRoom() {
  if (this.selectedOption === 'room-status' && this.selectedRoom) {
    this.$router.push({ path: `/roomstatus/${this.selectedRoom}` });
  } else if (this.selectedOption === 'master-controller') {
    this.$router.push({ path: '/dashboard' });
  }
},
    confirmSignOut() {
      this.dialogVisible = true;
    },
    signOut() {
      localStorage.removeItem('token');
      this.$router.push('/');
      this.dialogVisible = false;
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
  background-color: rgb(17, 199, 17) !important;
  color: white !important;
}

.q-btn {
  color: black;
  background-color: transparent;
  border-radius: 0;
  transition: color 0.3s, background-color 0.3s;
}

.q-btn.light-grey {
  color: black;
}

.q-btn.light-grey.btn-active {
  background-color: green !important;
  color: white !important;
}

.q-btn:hover {
  background-color: transparent;
  color: grey;
}

.button-group .q-btn {
  color: black !important;
}

.button-group .q-btn.btn-active {
  color: white !important;
}

.room-options-box {
  border: 1px solid #dddddd;
  padding: 3rem;
  width: 100%;
  max-width: 720px;
  display: flex;
  flex-direction: column;
  border-radius: 5px;
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

.confirmation-dialog {
  width: 300px;
  max-width: 80%;
  margin: auto;
}

.dialog-buttons {
  display: flex;
  justify-content: center;
  gap: 10px;
}

.dialog-buttons .q-btn {
width: 100px;
margin-top: 10px;
}

.top-text {
  margin-bottom: 20px;
}
</style>
