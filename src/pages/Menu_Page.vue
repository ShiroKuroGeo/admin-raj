<template>
  <q-layout view="lHh Lpr lFf">
    <!-- Page Container -->
    <q-page-container>
    <!-- Page Content -->
    <q-page>
      <div class="q-pa-md">
        <!-- Profile Card -->
        <q-card class="my-card q-pa-lg q-mb-md">
          <div class="profile-container">
            <q-avatar size="56px" color="red" icon="person" />
            <div class="profile-info q-ml-md">
              <div class="profile-name">{{ profile.fullName || 'Loading...' }}</div>
              <div class="profile-email">{{ profile.email || 'Loading...' }}</div>
            </div>
            <!-- Dark Mode Toggle -->
            <q-btn flat round @click="toggleDarkMode">
              <q-icon :name="darkMode ? 'brightness_4' : 'brightness_7'" />
            </q-btn>
          </div>
        </q-card>
        <br><br>
        <p>More</p>

        <!-- Profile Options List -->
        <q-card class="q-pa-none q-mb-md">
          <q-list bordered>
            <q-item clickable v-ripple @click="goToProfile">
              <q-item-section avatar>
                <q-icon name="person" />
              </q-item-section>
              <q-item-section>Profile</q-item-section>
            </q-item>

            <q-item clickable v-ripple @click="goToOrder">
              <q-item-section avatar>
                <q-icon name="shopping_bag" />
              </q-item-section>
              <q-item-section>My Order</q-item-section>
            </q-item>

            <q-item clickable v-ripple @click="goToOrderDetails">
              <q-item-section avatar>
                <q-icon name="receipt_long" />
              </q-item-section>
              <q-item-section>Order Details</q-item-section>
            </q-item>

            <q-item clickable v-ripple @click="goToNotifications">
              <q-item-section avatar>
                <q-icon name="notifications" />
              </q-item-section>
              <q-item-section>Notification</q-item-section>
            </q-item>

            <q-item clickable v-ripple @click="goToAddress">
              <q-item-section avatar>
                <q-icon name="place" />
              </q-item-section>
              <q-item-section>Address</q-item-section>
            </q-item>

            <q-item clickable v-ripple @click="goToMessages">
              <q-item-section avatar>
                <q-icon name="message" />
              </q-item-section>
              <q-item-section>Message</q-item-section>
            </q-item>

            <q-item clickable v-ripple @click="deleteAccount">
              <q-item-section avatar>
                <q-icon name="delete" />
              </q-item-section>
              <q-item-section>Delete Account</q-item-section>
            </q-item>

            <q-item clickable v-ripple @click="logout">
              <q-item-section avatar>
                <q-icon name="logout" />
              </q-item-section>
              <q-item-section>Log out</q-item-section>
            </q-item>
          </q-list>
        </q-card>
      </div>
    </q-page>
  </q-page-container>

  </q-layout>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar';
import { store } from '../stores/userStore'; // Adjust this import path as needed
import axios from 'axios'; // Make sure axios is installed

export default {
  setup() {
    const $q = useQuasar();
    const router = useRouter();
    const darkMode = ref($q.dark.isActive);
    const profile = ref({
      fullName: '',
      email: ''
    });

    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (!token) {
          throw new Error('No auth token found');
        }

        const response = await axios.get('http://localhost/admin-raj/database/api/user/update-profile.php', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        const data = response.data;
        if (data.success) {
          profile.value = {
            fullName: `${data.first_name} ${data.last_name}`,
            email: data.email
          };

          // Update store
          store.actions.setProfile({
            userFirstName: data.first_name,
            userLastName: data.last_name,
            email: data.email
          });
        } else {
          throw new Error(data.error || 'Failed to fetch user data');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        $q.notify({
          color: 'negative',
          message: 'Failed to load profile data. Please try again.',
          icon: 'report_problem'
        });
      }
    };

    onMounted(() => {
      fetchUserData();
    });

    const toggleDarkMode = () => {
      $q.dark.toggle();
      darkMode.value = $q.dark.isActive;
    };

    const goToProfile = () => router.push('/profile');
    const goToOrder = () => router.push('/orders');
    const goToOrderDetails = () => router.push('/order-details');
    const goToNotifications = () => router.push('/notifications');
    const goToAddress = () => router.push('/address');
    const goToMessages = () => router.push('/messages');

    const deleteAccount = () => {
      $q.dialog({
        title: 'Confirm',
        message: 'Are you sure you want to delete your account? This action cannot be undone.',
        cancel: true,
        persistent: true
      }).onOk(async () => {
        try {
          const token = localStorage.getItem('authToken');
          await axios.delete('http://localhost/admin-raj/database/api/user/delete_account.php', {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          store.actions.logout();
          router.push('/');
          $q.notify({
            color: 'positive',
            message: 'Your account has been deleted successfully.',
            icon: 'check_circle'
          });
        } catch (error) {
          console.error('Error deleting account:', error);
          $q.notify({
            color: 'negative',
            message: 'Failed to delete account. Please try again.',
            icon: 'report_problem'
          });
        }
      });
    };

    const logout = () => {
      store.actions.logout();
      localStorage.removeItem('authToken');
      router.push('/');
      $q.notify({
        color: 'positive',
        message: 'You have been logged out successfully.',
        icon: 'check_circle'
      });
    };

    return {
      darkMode,
      profile,
      toggleDarkMode,
      goToProfile,
      goToOrder,
      goToOrderDetails,
      goToNotifications,
      goToAddress,
      goToMessages,
      deleteAccount,
      logout
    };
  }
};
</script>

<style scoped>
.my-card {
  max-width: 400px;
  margin: auto;
}

.profile-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.profile-info {
  display: flex;
  flex-direction: column;
}

.profile-name {
  font-weight: bold;
  font-size: 16px;
}

.profile-email {
  font-size: 14px;
  color: grey;
}



.bg-orange {
  background-color: #ffa500 !important;
}

.text-orange {
  color: #ffa500 !important;
}

.q-footer {
  box-shadow: 0px -2px 5px rgba(0, 0, 0, 0.1);
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
