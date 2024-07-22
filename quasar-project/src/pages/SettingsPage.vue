<template>
    <q-layout view="lHh Lpr lFf">
      <!-- Sidebar -->
      <q-drawer v-model="drawer" show-if-above side="left" bordered>
        <q-list>
          <q-item to="/dashboard" exact>
            <q-item-section>
              <q-icon name="view_module" />
            </q-item-section>
            <q-item-section>
              Dashboard
            </q-item-section>
          </q-item>
          <q-item to="/settings" exact>
            <q-item-section>
              <q-icon name="settings" />
            </q-item-section>
            <q-item-section>
              Settings
            </q-item-section>
          </q-item>
          <q-item to="/about" exact>
            <q-item-section>
              <q-icon name="info" />
            </q-item-section>
            <q-item-section>
              About
            </q-item-section>
          </q-item>
        </q-list>
      </q-drawer>
  
      <!-- Page Container -->
      <q-page-container>
        <!-- Header -->
        <q-header elevated>
          <q-toolbar>
            <q-btn flat round icon="menu" @click="toggleDrawer" />
            <q-toolbar-title>Settings</q-toolbar-title>
          </q-toolbar>
        </q-header>
  
        <!-- Main Content -->
        <q-page>
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
                    inline
                    v-model="selectedRoom"
                    :options="roomOptions"
                  />
                </div>
              </q-card-section>
            </q-card>
  
            <!-- Buttons outside the card -->
            <div class="action-buttons">
              <q-btn class="q-mb-md" color="primary" label="Done" />
              <q-btn color="negative" label="Sign Out" />
            </div>
          </div>
        </q-page>
      </q-page-container>
    </q-layout>
  </template>
  
  <script>
  export default {
    data () {
      return {
        drawer: false,
        selectedRoom: null,
        selectedOption: 'room-status', // Default to 'room-status'
        isMasterController: false,
        roomOptions: [
          { label: 'Room 1', value: 'room-1' },
          { label: 'Room 2', value: 'room-2' },
          { label: 'Room 3', value: 'room-3' },
          { label: 'Room 4', value: 'room-4' },
          { label: 'Room 5', value: 'room-5' },
        ]
      }
    },
    methods: {
      toggleDrawer () {
        this.drawer = !this.drawer;
      },
      setOption(option) {
        this.selectedOption = option;
        this.isMasterController = option === 'master-controller';
      },
      closeDrawer() {
        this.drawer = false;
      }
    },
    mounted() {
      this.closeDrawer();
    }
  }
  </script>
  
  
 
  <style scoped>
  .settings-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 75vh;
  }
  
  .my-card {
    width: 80%;
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
    background-color: green !important; /* Green color for active button */
    color: white !important;
  }
  
  .q-btn {
    color: black; /* Default text color */
    background-color: lightgrey; /* Default button background color */
  }
  
  .q-btn.light-grey {
    background-color: lightgrey;
    color: black; /* Ensure text color is black */
  }
  
  .q-btn.light-grey.btn-active {
    background-color: green; /* Green color when active */
    color: white; /* White text color when active */
  }
  
  .q-btn:hover {
    background-color: grey;
    color: black; /* Ensure text color is black on hover */
  }
  
  .room-options-box {
    border: 1px solid #ccc;
    padding: 1rem;
    width: 100%;
    max-width: 500px;
    display: flex;
    flex-direction: column;
  }
  
  .room-options-label {
    margin-bottom: 0.5rem;
  }
  
  .bold-text {
    font-weight: bold;
    color: rgb(99, 96, 96);
  }
  
  .action-buttons {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .action-buttons .q-mb-md {
    margin-bottom: 1rem;
  }
  </style>
  
