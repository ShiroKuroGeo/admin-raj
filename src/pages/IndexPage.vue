<template>
  <div class="q-pa-md">
    <!-- Order Statistics -->
    <q-card flat bordered class="q-mb-md">
      <q-card-section>
        <div class="row items-center">
          <div class="col">
            <q-icon name="assessment" color="green" />
            <span class="text-h6 q-ml-sm">Order Statistics</span>
          </div>
          <div class="col-auto">
            <q-btn-toggle
              v-model="orderTab"
              dense
              unelevated
              color="red"
              toggle-color="red"
              no-caps
              outline
            >
              <q-btn label="This Year" value="year" />
              <q-btn label="This Month" value="month" />
              <q-btn label="This Week" value="week" />
            </q-btn-toggle>
          </div>
        </div>
      </q-card-section>
      <q-card-section>
        <OrderStatisticsChart :tab="orderTab" />
      </q-card-section>
    </q-card>

    <!-- Earning Statistics -->
    <q-card flat bordered>
      <q-card-section>
        <div class="row items-center">
          <div class="col">
            <q-icon name="monetization_on" color="green" />
            <span class="text-h6 q-ml-sm">Earning Statistics</span>
          </div>
          <div class="col-auto">
            <q-btn-toggle
              v-model="earningTab"
              dense
              unelevated
              color="red"
              toggle-color="red"
              no-caps
              outline
            >
              <q-btn label="This Year" value="year" />
              <q-btn label="This Month" value="month" />
              <q-btn label="This Week" value="week" />
            </q-btn-toggle>
          </div>
        </div>
      </q-card-section>
      <q-card-section>
        <EarningStatisticsChart :tab="earningTab" />
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import OrderStatisticsChart from 'components/charts/OrderStatisticsChart.vue';
import EarningStatisticsChart from 'components/charts/EarningStatisticsChart.vue';

export default {
  components: {
    OrderStatisticsChart,
    EarningStatisticsChart,
  },
  data() {
    return {
      orderTab: 'year',
      earningTab: 'year',
    };
  },
};
</script>

<style scoped>
.q-card {
  border-radius: 12px;
}
</style>
