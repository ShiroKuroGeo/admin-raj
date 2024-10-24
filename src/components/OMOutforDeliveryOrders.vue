<template>
  <q-page padding>
    <q-table
      title="Out For Delivery Orders"
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
import axios from 'axios';

export default {
  data() {
    return {
      orders: [],
      columns: [
        { name: 'id', label: 'ID', align: 'left', field: 'id' },
        { name: 'customer', label: 'Customer', align: 'left', field: 'customer' },
        { name: 'date', label: 'Date', align: 'left', field: 'date' },
        { name: 'status', label: 'Status', align: 'left', field: 'status' },
        { name: 'actions', label: 'Actions', align: 'center' }
      ],
      loading: true,
      filter: '',
      pagination: { rowsPerPage: 10 }
    };
  },
  async created() {
    this.loadOrders();
  },
  methods: {
    async loadOrders() {
      try {
        const response = await axios.get('/api/orders/out-for-delivery');
        this.orders = response.data;
      } catch (error) {
        console.error('Failed to load orders:', error);
      } finally {
        this.loading = false;
      }
    },
    viewOrder(id) {
      // Handle view order logic here
      console.log('View order', id);
    }
  }
};
</script>