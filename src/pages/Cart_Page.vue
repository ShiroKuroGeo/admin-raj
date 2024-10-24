<template>
  <q-layout> <!-- Wrapping everything in QLayout -->
    <q-page-container> <!-- QPage should be inside QPageContainer -->
      <q-page>
        <!-- Cart Section -->
        <div class="text-center text-h6 q-mt-md">My Cart</div>
        <div v-if="cartItems.length === 0" class="text-center">
          <h3 style="padding: 50px;" >Your cart is empty!</h3>
          <p>Please add some items from the menu</p>
          <q-btn
            label="Explore Menu"
            color="red"
            @click="goToMenu"
            style="width: 200px; margin-top: 20px"
          />
        </div>
        <div v-else>
          <!-- Cart Items -->
          <q-list bordered padding>
            <q-item v-for="(item, index) in cartItems" :key="index" clickable>
              <q-item-section>{{ item.name }}</q-item-section>
            </q-item>
          </q-list>
        </div>

        <!-- Bottom Navigation Bar -->
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
          position="fix"
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
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  data() {
    return {
      darkMode: false, // Toggle dark mode here
      cartItems: [] // Cart items will be fetched from the backend
    };
  },
  methods: {
    async fetchCartItems() {
      try {
        const response = await fetch('path-to-backend/fetch_cart.php');
        const data = await response.json();
        this.cartItems = data.cartItems;
      } catch (error) {
        console.error('Error fetching cart items:', error);
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
    this.fetchCartItems();
  }
};
</script>

<style scoped>
.text-center {
  text-align: center;
}

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
