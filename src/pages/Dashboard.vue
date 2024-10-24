<template>
  <q-page class="q-pa-md">
    <q-card class="q-mb-sm">
      <q-card-section>
        <h3 class="q-mt-none q-mb-none">Welcome, {{ userFirstName }}.</h3> <br>
        <h6 class="q-mt-none">Hello, here's what's happening with your R.A.J business today.</h6>
      </q-card-section>
    </q-card>

    <div class="row q-col-gutter-md">
      <!-- ORDER STATISTICS -->
      <div class="col-6">
        <q-card>
          <q-card-section>
            <h6>Order Statistics</h6>
            <q-btn-group unelevated>
              <q-btn label="This Month" :color="selectedOrderStats === 'month' ? 'primary' : ''" @click="setOrderStats('month')" flat />
              <q-btn label="This Week" :color="selectedOrderStats === 'week' ? 'primary' : ''" @click="setOrderStats('week')" flat />
              <q-btn label="Today" :color="selectedOrderStats === 'today' ? 'primary' : ''" @click="setOrderStats('today')" flat />
            </q-btn-group>
            <!-- PLACEHOLDER FOR GRAPH -->
            <div class="q-pa-md">
              <q-skeleton width="100%" height="200px" type="rect" />
            </div>
          </q-card-section>
        </q-card>
      </div>

      <!-- EARNING STATISTICS -->
      <div class="col-6">
        <q-card>
          <q-card-section>
            <h6>Earning Statistics</h6>
            <q-btn-group unelevated>
              <q-btn label="This Month" :color="selectedEarningStats === 'month' ? 'primary' : ''" @click="setEarningStats('month')" flat />
              <q-btn label="This Week" :color="selectedEarningStats === 'week' ? 'primary' : ''" @click="setEarningStats('week')" flat />
              <q-btn label="Today" :color="selectedEarningStats === 'today' ? 'primary' : ''" @click="setEarningStats('today')" flat />
            </q-btn-group>
            <!-- PLACEHOLDER FOR GRAPH -->
            <div class="q-pa-md">
              <q-skeleton width="100%" height="200px" type="rect" />
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>

    <div class="row q-col-gutter-md q-mt-md">
      <!-- ADDITIONAL CARDS (Recent Orders, etc.) -->
      <div class="col-3">
        <q-card>
          <q-card-section>
            <h6>Order Status</h6>
            <q-skeleton width="100%" height="100px" type="rect" />
          </q-card-section>
        </q-card>
      </div>

      <div class="col-3">
        <q-card>
          <q-card-section>
            <h6>Recent Orders</h6>
            <q-skeleton width="100%" height="100px" type="rect" />
          </q-card-section>
        </q-card>
      </div>

      <div class="col-3">
        <q-card>
          <q-card-section>
            <h6>Top Customer</h6>
            <q-skeleton width="100%" height="100px" type="rect" />
          </q-card-section>
        </q-card>
      </div>

      <div class="col-3">
        <q-card>
          <q-card-section>
            <h6>Top Selling Product</h6>
            <q-skeleton width="100%" height="100px" type="rect" />
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import { useStore } from 'vuex'; // Assuming you're using Vuex for state management

export default {
  name: "Dashboard",
  setup() {
    const store = useStore();
    const userFirstName = computed(() => store.getters.userFirstName);
    const selectedOrderStats = ref('month');
    const selectedEarningStats = ref('month');
    const orderStats = ref(null);
    const earningStats = ref(null);
    const isLoading = ref(false);
    const error = ref(null);

    const fetchStats = async (type, period) => {
      isLoading.value = true;
      error.value = null;
      try {
        // Replace with actual API call
        const response = await fetch(`/api/${type}Stats?period=${period}`);
        const data = await response.json();
        if (type === 'order') {
          orderStats.value = data;
        } else {
          earningStats.value = data;
        }
      } catch (err) {
        console.error(`Error fetching ${type} stats:`, err);
        error.value = `Failed to fetch ${type} statistics`;
      } finally {
        isLoading.value = false;
      }
    };

    const setOrderStats = (period) => {
      selectedOrderStats.value = period;
      fetchStats('order', period);
    };

    const setEarningStats = (period) => {
      selectedEarningStats.value = period;
      fetchStats('earning', period);
    };

    onMounted(() => {
      setOrderStats('month');
      setEarningStats('month');
    });

    return {
      userFirstName,
      selectedOrderStats,
      selectedEarningStats,
      orderStats,
      earningStats,
      isLoading,
      error,
      setOrderStats,
      setEarningStats,
    };
  },
};
</script>

<style scoped>
/* Add any component-specific styles here */
</style>
