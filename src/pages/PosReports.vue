<template>
  <div>
    <q-page class="row items-center justify-evenly">
      <q-card class="my-card">
        <q-card-section>
          <div class="text-h6">Earning Report Overview</div>
        </q-card-section>
        <q-card-section>
          <q-input filled v-model="dateRange" mask="####-##-## > ####-##-##" label="Show Data by Date Range"/>
          <q-btn label="Show" color="orange" @click="fetchSalesData" />
        </q-card-section>
        <q-card-section>
          <q-chart :chart-data="salesData" />
        </q-card-section>
      </q-card>
    </q-page>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useQuasar } from 'quasar';
import axios from 'axios';

export default {
  setup() {
    const $q = useQuasar();
    const salesData = ref([]);
    const dateRange = ref('');

    function fetchSalesData() {
      axios.get('http://localhost:3000/api/sales')
        .then(response => {
          salesData.value = response.data.data.map(item => {
            return { name: item.month, value: item.sales }
          });
        })
        .catch(error => {
          console.error('Error fetching sales data:', error);
          $q.notify({ type: 'negative', message: 'Failed to fetch sales data' });
        });
    }

    return { salesData, dateRange, fetchSalesData };
  }
}
</script>

<style>
.my-card {
  width: 90vw;
  max-width: 600px;
}
</style>
