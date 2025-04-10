<!-- src/components/RoomLayout.vue -->
<template>
    <div class="fullscreen" :style="{ backgroundColor: roomStatus?.color || '#fff' }" @click="toggleMenu">
      <div class="header row items-center justify-between q-px-md q-py-sm" :style="{ backgroundColor: headerColor }">
        <img src="https://firebasestorage.googleapis.com/v0/b/my-clinic-c19ba.appspot.com/o/msmc-logo.png?alt=media&token=c627c52e-c31f-4086-82b6-866aaaa1baf8" alt="Company Logo" class="mc-company-logo" />
        <span class="mc-room-number text-white text-h5" style="font-weight: bold;">{{ roomNumber }}</span>
      </div>
  
      <div class="mc-status-main q-mt-xl flex flex-center">
        <span class="mc-room-status text-white text-h3 text-center">{{ roomStatus?.text || 'Loading...' }}</span>
      </div>
  
      <div v-if="menuVisible">
        <q-menu v-model="menuVisible" anchor="center middle">
          <q-list>
            <q-item v-for="status in statuses" :key="status._id" clickable @click="changeStatus(status)">
              <q-item-section>{{ status.name }}</q-item-section>
            </q-item>
          </q-list>
        </q-menu>
  
        <div class="absolute-top-right q-ma-md">
          <q-btn
            round
            icon="exit_to_app"
            color="white"
            text-color="primary"
            class="bg-white"
            @click.stop="goToDashboard"
          />
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      roomNumber: {
        type: String,
        required: true
      },
      roomStatus: {
        type: Object,
        default: () => ({})
      },
      headerColor: {
        type: String,
        default: '#A45C28'
      },
      statuses: {
        type: Array,
        default: () => []
      },
    },
    data() {
      return {
        menuVisible: false,
      };
    },
    methods: {
      toggleMenu() {
        this.menuVisible = !this.menuVisible;
      },
      goToDashboard() {
        this.$router.push('/dashboard');
      },
      async changeStatus(status) {
        // Logic to change status goes here
      }
    }
  };
  </script>
  
  <style scoped>
  .mc-company-logo {
    height: 60px;
  }
  
  .mc-room-number {
    font-size: 2rem;
    font-weight: bold;
  }
  
  .mc-room-status {
    font-size: 3rem;
  }
  
  .q-btn {
    position: absolute;
    top: 20px;
    right: 20px;
  }
  </style>
  