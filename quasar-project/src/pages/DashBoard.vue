<template>
    <q-page class="flex flex-center">
      <div class="q-pa-md">
        <q-card>
          <q-card-section>
            <div class="text-h6">Dashboard</div>
          </q-card-section>
          <q-card-section>
            <q-btn label="Click Me" @click="handleClick" />
          </q-card-section>
        </q-card>
      </div>
    </q-page>
  </template>
  
  <script>
  export default {
    name: 'DashBoard',
    methods: {
      handleClick() {
        console.log('Button clicked');
      }
    }
  };
  </script>
  
  <style scoped>
  </style>
  