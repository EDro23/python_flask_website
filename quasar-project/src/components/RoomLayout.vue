<template>
  <div
    class="fullscreen"
    :style="{ backgroundColor: roomStatus?.color || '#fff' }"
    @click="$emit('toggle-menu')"
  >
    <div class="header row items-center justify-between q-px-md q-py-md" :style="{ backgroundColor: headerColor }">
      <img
        src="https://firebasestorage.googleapis.com/v0/b/my-clinic-c19ba.appspot.com/o/msmc-logo.png?alt=media&token=c627c52e-c31f-4086-82b6-866aaaa1baf8"
        alt="Company Logo"
        class="mc-company-logo"
      />
      <span class="mc-room-number text-white text-h4" style="font-weight: bold;">{{ roomNumber }}</span>
    </div>

    <div class="mc-status-main q-mt-xl flex flex-center">
      <span class="mc-room-status text-white text-h3 text-center">
        {{ roomStatus?.text || 'Loading...' }}
      </span>
    </div>

    <q-menu v-model="menuVisible" anchor="center middle">
      <q-list>
        <q-item
          v-for="status in statuses"
          :key="status._id"
          clickable
          @click="$emit('change-status', status)"
        >
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
        @click.stop="$emit('exit')"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    roomNumber: String,
    roomStatus: Object,
    headerColor: String,
    statuses: Array,
    menuVisible: Boolean
  }
};
</script>


<style scoped>
.header {
  height: 150px; /* Increased height */
  padding-top: 20px;
  padding-bottom: 20px;
}

.mc-company-logo {
  height: 100px; /* Increased logo size */
  object-fit: contain;
}

.mc-status-main {
  margin-top: 40px;
}

.mc-room-status {
  font-weight: bold;
}

.fullscreen {
  width: 100vw;
  height: 100vh;
  position: relative;
}
</style>
