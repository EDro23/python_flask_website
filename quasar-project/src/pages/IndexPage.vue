<template>
  <q-page>
    <div class="row">
      <div class="col-12 col-md-4 col-lg-4">
        <div class="text-h4 text-bold text-blue-7">MainStreet MyClinic</div>
        <div class="column">
          <q-input
            v-model="form.email.value"
            :error="form.email.error"
            :error-message="form.email.msg">
            <template v-slot:append>
              <q-icon name="email"></q-icon>
            </template>
          </q-input>
          <q-input
            v-model="form.password.value"
            :error="form.password.error"
            :error-message="form.password.msg">
            <template v-slot:append>
              <q-icon name="email"></q-icon>
            </template>
          </q-input>
        </div>
        <div class="column">
          <q-btn
            color="indigo"
            @click="submitLogin">
            Login
          </q-btn>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
  const form = ref({
    email:  {
      value: '',
      email: true,
      required: true
    },
    password: {
      value: '',
      required: true
    }
  })
</script>
