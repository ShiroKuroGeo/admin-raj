<template>
    <q-layout view="lHh Lpr lFf"> <!-- Ensure QLayout is used here -->
      <q-page-container> <!-- Wrap QPage inside QPageContainer -->
        <q-page>

            <div class="text-center text-h6 q-mt-md">My Favorites</div>
          <!-- Favorites Section -->
          <div v-if="favorites.length === 0" class="text-center">
      <!-- Replace image with Quasar Icon -->
      <q-icon name="search_off" size="100px" class="q-mt-md text-red-7" style="padding: 100px;" />
      <div class="text-h6 q-mt-md">Nothing Found</div>
    </div>

    <div v-else>
            <!-- List of favorites -->
            <q-list bordered padding>
              <q-item v-for="(favorite, index) in favorites" :key="index" clickable>
                <q-item-section>{{ favorite.name }}</q-item-section>
              </q-item>
            </q-list>
          </div>
        </q-page>
      </q-page-container>

       <!-- Bottom Navigation Bar (Fixed Footer) -->
       <q-footer class="footer-fixed" :class="darkMode ? 'bg-dark text-light' : 'bg-white text-orange'" >
      <q-tabs
        class="text-orange"
        align="center"
        dense
       :active-color="darkMode ? 'white' : 'orange'"
        :indicator-color="darkMode ? 'white' : 'orange'"
      >
        <q-tab
          icon="home"
          label="Home"
          @click="goToHome"
        />
        <q-tab
          icon="favorite"
          label="Favorites"
          @click="goToFavorites"
        />
        <q-tab
          icon="restaurant"
          label="Cart"
          class="bg-orange text-white q-tab-active"
          @click="goToCart"
        />
        <q-tab
          icon="shopping_cart"
          label="Order"
          @click="goToOrder"
        />
        <q-tab
          icon="menu"
          label="Menu"
          @click="goToMenu"
        />
      </q-tabs>
    </q-footer>
    </q-layout>
  </template>

  <script>
  export default {
    data() {
      return {
        darkMode: false, // Switch this value as needed for dark or light mode
        favorites: []
      };
    },
    methods: {
      async fetchFavorites() {
        try {
          const response = await fetch('path-to-backend/fetch_favorites.php');
          const data = await response.json();
          this.favorites = data.favorites;
        } catch (error) {
          console.error('Error fetching favorites:', error);
        }
      },
        goToHome() {
        this.$router.push('/home');
        },
        goToFavorites() {
        this.$router.push('/favorites');
        },
        goToCart() {
        this.$router.push('/cart');
        },
        goToOrder() {
        this.$router.push('/order');
        },
        goToMenu() {
        this.$router.push('/menu');
        }
    },
    mounted() {
      this.fetchFavorites();
    }
  };
  </script>

  <style>
  /* Add any specific styles you need */
  .footer-fixed {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 60px;
  box-shadow: 0px -2px 5px rgba(0, 0, 0, 0.1);
  z-index: 999; /* Ensure the footer is above other content */

}
.q-tab-active {
  border-radius: 5px;
  padding: 10px;
  transform: translateY(-10px);
}
  </style>
