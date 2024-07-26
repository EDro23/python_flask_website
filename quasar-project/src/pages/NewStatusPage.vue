<template>
  <q-page padding>
    <div class="layout-padding">
      <div class="status-top">
        <h4>Status</h4>
      </div>
      <div>
        <form @submit.prevent="createStatus">
          <!-- Your form inputs -->
          <q-input
            v-model="name"
            label="Name"
            dense
            class="q-mb-md custom-input"
          />
          <q-input
            v-model="text"
            label="Text"
            dense
            class="q-mb-md custom-input"
          />
          <q-input
            v-model="color"
            label="Color"
            dense
            class="q-mb-md custom-input"
          />
          
          <!-- Color options -->
          <div class="vc-compact q-mb-md">
            <ul class="vc-compact-colors">
              <li
                v-for="colorOption in colorOptions"
                :key="colorOption"
                :style="{ background: colorOption }"
                class="vc-compact-color-item"
                @click="selectColor(colorOption)"
              >
                <!-- Ensure no dot element is present -->
              </li>
            </ul>
          </div>

          <p class="caption"><b>Preview:</b></p>
          <div class="q-card inline-block mc-room no-margin" :style="{ width: '300px'}">
            <div class="q-card-primary q-card-container row no-wrap text-white" :style="{ backgroundColor: nameColor }">
              <div class="col column">
                <div class="q-card-title">
                  <big class="text-bold">Room #</big>
                </div>
                <div class="q-card-subtitle"></div>
              </div>
              <div class="col-auto self-center q-card-title-extra"></div>
            </div>
            <div class="q-card-main q-card-container mc-room-status" :style="{ backgroundColor: color }">
              <big class="text-bold">{{ text }}</big>
            </div>
          </div>

          <div class="row mt-4 q-pt-md">
            <q-btn label="Create Status" type="submit" color="primary" class="q-mr-md create-status-btn" />
            <q-btn label="Cancel" color="grey" @click="cancel" class="cancel-btn" />
          </div>
        </form>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      name: '',
      text: '',
      color: '#001F3F', // Initialize with the first color as dark blue
      colorOptions: [
        '#001F3F', '#0074D9', '#39CCCC', '#3D9970', '#2ECC40',
        '#FFDC00', '#FF851B', '#C2571A', '#FD0010', '#9A2617',
        '#85194B', '#CC44CC', '#F012BE', '#B10DC9', '#553DCB',
        '#BCA136', '#829356', '#AAAAAA', '#444444'
      ]
    };
  },
  computed: {
    nameColor() {
      return this.name ? '#001932' : '#ccc';
    }
  },
  methods: {
    selectColor(color) {
      this.color = color;
    },
    createStatus() {
      const newStatus = {
        id: Date.now(), // Generate a unique ID
        name: this.name,
        text: this.text,
        color: this.color
      };
      // Save the new status to local storage
      const statuses = JSON.parse(localStorage.getItem('statuses')) || [];
      statuses.push(newStatus);
      localStorage.setItem('statuses', JSON.stringify(statuses));
      this.$router.push('/statuses'); // Redirect to the statuses page
    },
    cancel() {
      this.name = '';
      this.text = '';
      this.color = '#001F3F'; // Reset to dark blue on cancel
      this.$router.push('/statuses'); // Redirect to /statuses page
    }
  }
};
</script>

<style scoped>
.custom-input .q-field__control {
  background-color: transparent !important;
  border: none !important;
  box-shadow: none !important;
}

.custom-input .q-field__label {
  color: #000 !important;
}

.vc-compact-colors {
  display: flex;
  flex-wrap: wrap;
  margin-left: -40px;
}

.vc-compact-color-item {
  width: 30px;
  height: 30px;
  margin: 2px;
  cursor: pointer;
  position: relative;
  border: 2px solid white;
  box-shadow: 0 0 5px rgba(15, 15, 15, 0.5);
}

.vc-compact-color-item::before,
.vc-compact-color-item::after {
  content: none !important;
}

.vc-compact-color-item:focus,
.vc-compact-color-item:active {
  outline: none !important;
}

.q-mb-md {
  margin-bottom: 16px;
}

.q-pt-md {
  padding-top: 16px;
}

.text-bold {
  color: white;
}

.status-top {
  font-family: Arial, Helvetica, sans-serif;
  display: flex;
  margin-bottom: -10px;
}

.vc-compact-colors li::marker {
  content: none !important;
}

.create-status-btn .q-btn__content {
  color: white !important; /* White text for "Create Status" button */
}

.cancel-btn .q-btn__content {
  color: black !important; /* Black text for "Cancel" button */
}
</style>
