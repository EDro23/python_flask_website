<template>
  <q-page padding>
    <div class="statuses-page">
      <q-btn fab icon="add" @click="goToNewStatus" class="add-btn" color="primary" />

      <div class="statuses-container">
        <q-list>
          <q-item
            v-for="status in statuses"
            :key="status._id"
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
    </div>
  </q-page>
</template>

<script>
import axios from 'axios';

export default {
  name: 'StatusesPage',
  data() {
    return {
      statuses: [],
      menuVisible: false,
      menuAnchor: null,
      currentStatus: null
    };
  },
  methods: {
    goToNewStatus() {
      this.$router.push('/statuses/newstatus');
    },
    async loadStatuses() {
      try {
        const response = await axios.get('/api/statuses');
        console.log('✅ Statuses loaded:', response.data); // Debug log
        this.statuses = response.data;
      } catch (error) {
        console.error('❌ Error loading statuses:', error);
      }
    },
    showActions(status, event) {
      event.stopPropagation(); // Prevent click from bubbling up
      this.currentStatus = status;
      this.$router.push({ path: `/statuses/edit/${status._id}` });
    },
    selectStatus(status) {
      // Optional: handle click on a status
    }
  },
  mounted() {
    this.loadStatuses();
  }
};
</script>

<style scoped>
.q-page {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #f0f0f0;
  padding: 0;
  margin: 0;
}

.statuses-page {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  padding: 0;
  margin: 0;
  background-color: #f0f0f0;
}

.statuses-container {
  flex-grow: 1;
  overflow-y: auto;
  background-color: #f0f0f0;
  padding: 20px;
  margin: 0;
}

.add-btn {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1;
}

.status-item {
  margin: 0;
  padding: 20px 0;
  border-bottom: 1px solid #e0e0e0;
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