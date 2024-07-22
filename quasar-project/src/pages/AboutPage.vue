<template>
    <q-page>
      <div class="layout-padding">
        <h5>Application Info</h5>
        <p>
          Version: 2.0.9<br>
          Support: <a href="https://www.myclinic.today" target="_blank">https://www.myclinic.today</a><br>
          Email: <a href="mailto:info@myclinic.ca">info@myclinic.ca</a><br>
        </p>
        <h5>Developer Info</h5>
        <p>
          <a href="https://www.sevenview.ca" target="_blank">Sevenview Studios Inc.</a><br>
          Email: <a href="mailto:dev@sevenview.ca">dev@sevenview.ca</a><br><br>
          We are available to do custom mobile and web app development.<br>
          Contact <a href="mailto:sales@sevenview.ca">sales@sevenview.ca</a>
        </p>
        <h5>License Info</h5>
        <p>
          © 2016—2024 Sevenview Studios Inc.
        </p>
        <h5>Libraries & Resources</h5>
        <p>
          Built with
          <a href="http://quasar-framework.org/" target="_blank">
            <img src="statics/quasar-logo.svg" width="140px" class="vertical-middle">
          </a>
        </p>
      </div>
    </q-page>
  </template>
  
  <script>
  export default {
    name: 'AboutPage'
  }
  </script>
  
  <style scoped>
  .layout-padding {
    padding: 16px;
  }
  
  h5 {
    margin-top: 16px;
  }
  
  p {
    margin-bottom: 16px;
  }
  
  .vertical-middle {
    vertical-align: middle;
  }
  </style>
  