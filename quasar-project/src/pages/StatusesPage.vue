<template>
  <q-page padding>
    <div class="statuses-page">
      <q-btn fab icon="add" @click="goToNewStatus" class="add-btn" color="primary" />
      
      <div class="statuses-container">
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
        const response = await axios.get('http://localhost:3001/api/statuses');
        this.statuses = response.data;
      } catch (error) {
        console.error('Error loading statuses:', error);
      }
    },
    showActions(status, event) {
      event.stopPropagation(); // Prevent click from bubbling up
      this.currentStatus = status;
      this.$router.push({ path: `/statuses/edit/${status._id}` }); // Navigate to edit page
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
/* Ensure the page fills the viewport height and uses flexbox */
.q-page {
  display: flex;
  flex-direction: column;
  min-height: 100vh; /* Full viewport height */
  background-color: #f0f0f0; /* Light grey background color */
}

.statuses-page {
  display: flex;
  flex-direction: column;
  flex-grow: 1; /* Grow to fill available space */
  padding: 70px;
  background-color: #f0f0f0; /* Light grey background color */
}

.statuses-container {
  flex-grow: 1; /* Ensure it takes up the remaining space */
  overflow-y: auto; /* Add scroll if content overflows */
  background-color: #f0f0f0; /* Ensure the background color is consistent */
  margin-top: 20px; /* Adjust if needed to fit content */
}

.add-btn {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1; /* Ensure the button is above other elements */
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
