<template>
  <q-page padding>
    <div class="layout-padding">
      <div class="status-top">
        <h4>Status</h4>
      </div>
      <div>
        <form @submit.prevent="createStatus">
          <q-input v-model="name" label="Name" dense class="q-mb-md custom-input" />
          <q-input v-model="text" label="Text" dense class="q-mb-md custom-input" />
          <q-input v-model="color" label="Color" dense class="q-mb-md custom-input" />

          <div class="vc-compact q-mb-md">
            <ul class="vc-compact-colors">
              <li
                v-for="colorOption in colorOptions"
                :key="colorOption"
                :style="{ background: colorOption }"
                class="vc-compact-color-item"
                @click="selectColor(colorOption)"
              />
            </ul>
          </div>

          <p class="caption"><b>Preview:</b></p>
          <div class="q-card inline-block mc-room no-margin" :style="{ width: '300px'}">
            <div class="q-card-primary q-card-container row no-wrap text-white" :style="{ backgroundColor: nameColor }">
              <div class="col column">
                <div class="q-card-title">
                  <big class="text-bold">Room #</big>
                </div>
              </div>
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
import axios from 'axios';

export default {
  data() {
    return {
      name: '',
      text: '',
      color: '#001F3F',
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
    async createStatus() {
      try {
        const newStatus = {
          name: this.name,
          text: this.text,
          color: this.color
        };

        // ✅ Use your full deployed API URL
        await axios.post('https://quasar-status-app.onrender.com/api/statuses/add', newStatus);

        this.$router.push('/statuses');
      } catch (error) {
        console.error('❌ Error creating status:', error.message);
        if (error.response) {
          console.error('🔴 Server responded with:', error.response.data);
        } else if (error.request) {
          console.error('🛑 No response received:', error.request);
        }
      }
    },
    cancel() {
      this.name = '';
      this.text = '';
      this.color = '#001F3F';
      this.$router.push('/statuses');
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
  border: 2px solid white;
  box-shadow: 0 0 5px rgba(15, 15, 15, 0.5);
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
  margin-bottom: -10px;
}
.create-status-btn .q-btn__content {
  color: white !important;
}
.cancel-btn .q-btn__content {
  color: black !important;
}
</style>
