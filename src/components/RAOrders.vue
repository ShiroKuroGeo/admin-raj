<template>
  <q-page padding>
    <q-card>
      <q-card-section>
        <div class="text-h6">Orders Statistics</div>
      </q-card-section>

      <q-card-section>
        <q-list>
          <q-item>
            <q-item-section>Total Orders:</q-item-section>
            <q-item-section>{{ statistics.totalOrders }}</q-item-section>
          </q-item>
          <q-item>
            <q-item-section>Monthly Orders:</q-item-section>
            <q-item-section>{{ statistics.monthlyOrders }}</q-item-section>
          </q-item>
          <q-item>
            <q-item-section>Average Order Value:</q-item-section>
            <q-item-section>{{ statistics.avgOrderValue | currency }}</q-item-section>
          </q-item>
        </q-list>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      statistics: {
        totalOrders: 0,
        monthlyOrders: 0,
        avgOrderValue: 0
      }
    }
  },
  methods: {
    fetchStatistics() {
      fetch('http://localhost/backend/orders_statistics.php')
        .then(response => response.json())
        .then(data => {
          this.statistics = data;
        });
    }
  },
  mounted() {
    this.fetchStatistics();
  },
  filters: {
    currency(value) {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
      }).format(value);
    }
  }
};
</script>

<style scoped>
</style>
