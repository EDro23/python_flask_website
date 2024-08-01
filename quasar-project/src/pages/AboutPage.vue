<template>
  <q-page>
    <title>About</title>
    <div class="layout-padding">
      <h5 class="section-header"><b>Application Info</b></h5>
      <p>
        Version: 0.0.1<br>
        Support: <a href="https://www.mainstreetclinic.ca/" target="_blank">https://www.mainstreetclinic.ca/</a><br>
        Email: <a href="mailto:reception@mainstreetclinic.ca">reception@mainstreetclinic.ca</a><br>
      </p>
      <div class="dev-info">
        <h5 class="section-header"><b>Developer Info</b></h5>
        <p>
          <a href="https://www.mainstreetclinic.ca/" target="_blank">MainStreet Medical</a><br>
          Email: <a href="mailto:reception@mainstreetclinic.ca">reception@mainstreetclinic.ca</a><br><br>
        </p>
      </div>
      <h5 class="section-header"><b>License Info</b></h5>
      <div class="license-info">
        <p>
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

h5.section-header {
  margin-top: 20px; /* Space above each header */
  margin-bottom: 10px; /* Space below each header */
}

p {
  margin-bottom: 10px; /* Space below each paragraph */
}

.img-container {
  display: flex;
  justify-content: left; /* Center the image horizontally */
  margin-top: 20px; /* Space above the image */
}

.dev-info {
  margin-top: 20px; /* Space above the developer info section */
}

.license-info {
  margin-top: 20px;
  font-family:'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif; /* Space above the license info section */
}
</style>
