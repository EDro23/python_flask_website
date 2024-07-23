<template>
    <q-page>
      <title>About</title>
      <div class="layout-padding">
        <h5><b>Application Info</b></h5>
        <p>
          Version: 0.0.1<br>
          Support: <a href="https://www.mainstreetclinic.ca/" target="_blank">https://www.mainstreetclinic.ca/</a><br>
          Email: <a href="mailto:reception@mainstreetclinic.ca">reception@mainstreetclinic.ca</a><br>
        </p>
        <div class="dev-info"><h5><b>Developer Info</b></h5>
        <p>
          <a href="https://www.mainstreetclinic.ca/" target="_blank">MainStreet Medical</a><br>
          Email: <a href="mailto:reception@mainstreetclinic.ca">reception@mainstreetclinic.ca</a><br><br>
        </p>
        </div>
        <h5><b>License Info</b></h5>
        <div class="license-info"><p>
          © 2016—2024 MainStreet Medical Clinic.
        </p>
        </div>
        <div class="img-container">
          <img src="/msmc_medical_logo_b.png" height="100" width="500">
        </div>
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
    padding: 40px;
  }
  
  h5 {
    margin-top: 10px;
  }
  
  p {
    margin-bottom: 10px;
  }
  
  .vertical-middle {
    vertical-align: middle;
  }

  .img-container {
    display: flex;
    height: 10%;
    width: 10%;
  }

  .dev-info {
    margin-bottom: -10px;
    margin-top: 10px;
  }

  .license-info {
    display: flex;
    margin-top: 1px;
  }
  </style>
  