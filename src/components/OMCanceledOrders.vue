<template>
  <q-page padding>
    <q-table
      title="Canceled Orders"
      :rows="filteredOrders"
      :columns="columns"
      row-key="id"
      :loading="loading"
      :pagination.sync="pagination"
    >
      <template v-slot:top-right>
        <q-input
          outlined
          v-model="search"
          dense
          debounce="300"
          placeholder="Search"
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>
      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <q-btn @click="viewOrder(props.row.id)" label="View" color="primary" />
        </q-td>
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
      search: '',
      pagination: { rowsPerPage: 10 }
    };
  },
  computed: {
    filteredOrders() {
      if (!this.search) {
        return this.orders;
      }
      return this.orders.filter(order =>
        Object.values(order).some(value =>
          value.toString().toLowerCase().includes(this.search.toLowerCase())
        )
      );
    }
  },
  async created() {
    this.loadOrders();
  },
  methods: {
    async loadOrders() {
      try {
        const response = await axios.get('/api/orders/canceled');
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

<style scoped>
/* Add your styles here */
</style>
