<template>
  <q-page padding>
    <div class="edit-status-page">
      <h4>Edit Status</h4>
      <form @submit.prevent="saveStatus">
        <q-input
          v-model="status.name"
          label="Name"
          dense
          class="q-mb-md custom-input"
        />
        <q-input
          v-model="status.text"
          label="Text"
          dense
          class="q-mb-md custom-input"
        />
        <q-input
          v-model="status.color"
          label="Color"
          dense
          class="q-mb-md custom-input"
        />

        <div class="vc-compact q-mb-md">
          <ul class="vc-compact-colors">
            <li
              v-for="colorOption in colorOptions"
              :key="colorOption"
              :style="{ background: colorOption }"
              class="vc-compact-color-item"
              @click="selectColor(colorOption)"
            ></li>
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
          <div class="q-card-main q-card-container mc-room-status" :style="{ backgroundColor: status.color }">
            <big class="text-bold">{{ status.text }}</big>
          </div>
        </div>

        <div class="row mt-4 q-pt-md">
          <q-btn label="Save" type="submit" color="primary" class="q-mr-md" />
          <q-btn label="Delete" color="negative" @click="confirmDelete" />
          <q-btn label="Cancel" color="grey" @click="cancel" />
        </div>
      </form>
    </div>

    <q-dialog v-model="deleteDialog">
      <q-card>
        <q-card-section class="row items-center">
          <q-icon name="warning" color="red" size="50px" class="q-mr-md" />
          <div class="cf-diolog-edit">
            <h5></h5>
            <h6><b>Are you sure you want to delete this status?</b></h6>
          </div>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="grey" v-close-popup />
          <q-btn flat label="Delete" color="negative" @click="deleteStatus" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      status: {
        _id: '', // Use _id instead of id
        name: '',
        text: '',
        color: '#001F3F' // Default color
      },
      colorOptions: [
        '#001F3F', '#0074D9', '#39CCCC', '#3D9970', '#2ECC40',
        '#FFDC00', '#FF851B', '#C2571A', '#FD0010', '#9A2617',
        '#85194B', '#CC44CC', '#F012BE', '#B10DC9', '#553DCB',
        '#BCA136', '#829356', '#AAAAAA', '#444444'
      ],
      deleteDialog: false // Dialog visibility
    };
  },
  computed: {
    nameColor() {
      return this.status.name ? '#001932' : '#ccc';
    }
  },
  created() {
    this.loadStatus();
  },
  methods: {
    async loadStatus() {
      const id = this.$route.params.id;
      console.log('Attempting to load status with ID:', id); // Debugging line
      try {
        const response = await axios.get(`http://localhost:3001/api/statuses/${id}`);
        console.log('Status loaded successfully:', response.data); // Debugging line
        this.status = response.data;
      } catch (error) {
        console.error('Error loading status:', error);
      }
    },
    selectColor(color) {
      this.status.color = color;
    },
    async saveStatus() {
      try {
        console.log('Saving status:', this.status);
        await axios.put(`http://localhost:3001/api/statuses/${this.status._id}`, this.status);
        console.log('Status saved successfully');

        // Redirect to the statuses page after saving
        this.$router.push('/statuses');
      } catch (error) {
        console.error('Error saving status:', error.response ? error.response.data : error.message);
      }
    },
    confirmDelete() {
      this.deleteDialog = true; // Show confirmation dialog
    },
    async deleteStatus() {
      try {
        console.log('Deleting status:', this.status._id);
        await axios.delete(`http://localhost:3001/api/statuses/${this.status._id}`);
        console.log('Status deleted successfully');

        // Close the dialog
        this.deleteDialog = false;

        // Redirect to the statuses page
        this.$router.push('/statuses');
      } catch (error) {
        console.error('Error deleting status:', error.response ? error.response.data : error.message);
      }
    },
    cancel() {
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

.edit-status-page {
  padding: 5px;
}

.q-card-primary {
  background-color: #001F3F; /* Dark blue background */
}

.q-card-main {
  background-color: #fff; /* Default background color */
}

.vc-compact-color-item::marker {
  content: none !important; /* Remove dots from the color blocks */
}

.row.mt-4.q-pt-md {
  display: flex;
  justify-content: left; /* Adjust alignment of buttons */
}

.q-btn {
  margin-right: 16px; /* Adjust spacing between buttons */
}

.cancel-btn {
  margin-left: 8px; /* Add margin to the left of the Cancel button */
}

.cf-diolog-edit {
  align-content: center;
  margin-left: 50px;
}

.q-mr-md {
  margin-left: 20px;
}
</style>
