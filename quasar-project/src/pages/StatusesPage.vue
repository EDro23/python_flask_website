<template>
  <q-page padding>
    <div class="statuses-page">
      <q-btn fab icon="add" @click="goToNewStatus" class="add-btn" color="primary" />

      <!-- Display list of statuses -->
      <q-list>
        <q-item
          v-for="status in statuses"
          :key="status.id"
          class="status-item"
          @click.stop="selectStatus(status)"
        >
          <q-item-section side>
            <div class="mc-color-swatch round" :style="{ backgroundColor: status.color }"></div>
          </q-item-section>
          <q-item-section>
            <div class="q-item-label">{{ status.name }}</div>
            <div class="q-item-sublabel">{{ status.text }}</div>
          </q-item-section>
          <q-item-section side>
            <q-btn
              flat
              round
              icon="more_vert"
              @click="showActions(status, $event)"
              class="status-options-btn"
            />
          </q-item-section>
        </q-item>
      </q-list>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'StatusesPage',
  data() {
    return {
      statuses: [], // Array to hold statuses
      menuVisible: false,
      menuAnchor: null,
      currentStatus: null
    };
  },
  methods: {
    goToNewStatus() {
      this.$router.push('/statuses/newstatus');
    },
    loadStatuses() {
      this.statuses = JSON.parse(localStorage.getItem('statuses')) || [];
    },
    showActions(status, event) {
      event.stopPropagation(); // Prevent click from bubbling up
      this.currentStatus = status;
      this.$router.push({ path: `/statuses/edit/${status.id}` }); // Navigate to edit page
    },
    selectStatus(status) {
      // Add logic to handle clicking on a status if needed
    }
  },
  mounted() {
    this.loadStatuses(); // Load statuses when component is mounted
  }
};
</script>

<style scoped>
.statuses-page {
  position: relative;
  min-height: 90vh;
  padding: 70px;
}

.add-btn {
  position: fixed;
  bottom: 20px;
  right: 20px;
}

.status-item {
  margin: 0;
  padding: 20px 0;
  border-bottom: 1px solid #e0e0e0; /* Light grey line */
}

.mc-color-swatch {
  width: 2rem;
  height: 2rem;
  border-radius: 15px;
}

.status-options-btn {
  padding: 0;
}
</style>
