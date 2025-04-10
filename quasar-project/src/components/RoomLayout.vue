<template>
  <div
    class="fullscreen"
    :style="{ backgroundColor: roomStatus?.color || '#fff' }"
    @click="$emit('toggle-menu')"
  >
    <div class="header row items-center justify-between q-px-md q-py-lg" :style="{ backgroundColor: headerColor }">
      <img
        :src="logoUrl"
        alt="Company Logo"
        class="mc-company-logo"
        style="height: 80px; object-fit: contain"
      />
      <span class="mc-room-number text-white text-h4" style="font-weight: bold;">
        {{ roomNumber }}
      </span>
    </div>

    <div class="mc-status-main q-mt-xl flex flex-center">
      <span class="mc-room-status text-white text-h3 text-center">
        {{ roomStatus?.text || 'Loading...' }}
      </span>
    </div>

    <div v-if="menuVisible">
      <q-menu v-model="menuOpen" anchor="center middle" self="center middle" :no-parent-event="true">
        <q-list>
          <q-item
            v-for="status in statuses"
            :key="status._id"
            clickable
            @click.stop="$emit('change-status', status)"
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
  </div>
</template>

<script>
export default {
  name: 'RoomLayout',
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
    logoUrl: {
      type: String,
      default: ''
    },
    menuVisible: {
      type: Boolean,
      default: false
    },
    statuses: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    menuOpen: {
      get() {
        return this.menuVisible;
      },
      set() {
        // we don't set it locally, just emit to parent
        this.$emit('toggle-menu');
      }
    }
  }
};
</script>

<style scoped>
.mc-company-logo {
  max-height: 80px;
  max-width: 200px;
}
.mc-room-number {
  font-size: 2.5rem;
}
.mc-status-main {
  min-height: 60vh;
}
</style>
