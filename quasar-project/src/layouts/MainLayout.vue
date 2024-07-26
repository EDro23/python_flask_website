<template>
  <q-layout view="lHh Lpr lFf">
    <!-- Sidebar -->
    <q-drawer v-model="drawer" show-if-above side="left" bordered>
      <q-list>
        <q-item to="/dashboard" exact @click="closeDrawer">
          <q-item-section>
            <q-icon name="view_module" />
          </q-item-section>
          <q-item-section>
            Dashboard
          </q-item-section>
        </q-item>
        <!-- Add the new Statuses menu item -->
        <q-item to="/statuses" exact @click="closeDrawer">
          <q-item-section>
            <q-icon name="assignment" />
          </q-item-section>
          <q-item-section>
            Statuses
          </q-item-section>
        </q-item>
        <q-item to="/settings" exact @click="closeDrawer">
          <q-item-section>
            <q-icon name="settings" />
          </q-item-section>
          <q-item-section>
            Settings
          </q-item-section>
        </q-item>
        <q-item to="/about" exact @click="closeDrawer">
          <q-item-section>
            <q-icon name="info" />
          </q-item-section>
          <q-item-section>
            About
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <!-- Page Container -->
    <q-page-container>
      <!-- Header -->
      <q-header elevated>
        <q-toolbar>
          <q-btn flat round icon="menu" @click="toggleDrawer" />
          <q-toolbar-title>{{ $route.meta.title || 'My App' }}</q-toolbar-title>
        </q-toolbar>
      </q-header>

      <!-- Main Content -->
      <q-page>
        <router-view />
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  data() {
    return {
      drawer: false
    }
  },
  methods: {
    toggleDrawer() {
      this.drawer = !this.drawer;
    },
    closeDrawer() {
      this.drawer = false;
    }
  },
  watch: {
    $route(to, from) {
      // Close the drawer on route change
      this.closeDrawer();
    }
  },
  mounted() {
    // Ensure drawer is closed when the layout is first mounted
    this.closeDrawer();
  }
}
</script>

<style scoped>
/* Ensure z-index is high enough for the drawer */
.q-drawer {
  z-index: 1000;
}

/* Optionally ensure the drawer does not overlap other content */
.q-page-container {
  position: relative;
  z-index: 1;
}
</style>
