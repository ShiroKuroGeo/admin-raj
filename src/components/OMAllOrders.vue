<template>
  <q-page padding>
    <q-table
      title="All Orders"
      :rows="orders"
      :columns="columns"
      row-key="id"
      :loading="loading"
    >
      <template v-slot:top-right>
        <q-input outlined v-model="search" dense debounce="300" placeholder="Search">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>
    </q-table>
  </q-page>
</template>

<script>
import { ref } from 'vue';
import axios from 'axios';

export default {
  setup() {
    const orders = ref([]);
    const loading = ref(false);
    const search = ref('');

    const columns = ref([
      { name: 'id', required: true, label: 'Order ID', align: 'left', field: 'id', sortable: true },
      { name: 'delivery_date', align: 'left', label: 'Delivery Date', field: 'delivery_date', sortable: true },
      { name: 'customer_info', label: 'Customer Info', field: 'customer_info' },
      { name: 'total_amount', label: 'Total Amount', field: 'total_amount', sortable: true },
      { name: 'order_status', label: 'Order Status', field: 'order_status' },
      { name: 'order_type', label: 'Order Type', field: 'order_type' }
    ]);

    const fetchOrders = async () => {
      loading.value = true;
      try {
        const response = await axios.get('http://localhost/api.php');
        orders.value = response.data;
      } catch (error) {
        console.error('Failed to fetch orders:', error);
      } finally {
        loading.value = false;
      }
    };

    fetchOrders();

    return { orders, columns, loading, search };
  }
};
</script>
