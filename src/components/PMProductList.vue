<template>
  <q-page class="q-pa-md">
    <q-card flat bordered>

      <!-- Header Section -->
      <q-card-section class="row justify-between items-center">
        <h4>Products</h4>
        <q-btn color="orange" icon="add" label="Add" @click="openAddProductDialog" />
      </q-card-section>

      <!-- Products Table -->
      <q-card-section>
        <q-table
          :rows="products"
          :columns="columns"
          row-key="id"
          flat
          bordered
          :pagination="pagination"
          @request="onRequest"
          dense
        >
          <template v-slot:body-cell-index="props">
            <q-td :props="props">
              {{ props.pageIndex + props.rowIndex }}
            </q-td>
          </template>

          <template v-slot:body-cell-actions="props">
            <q-td :props="props" class="text-center">
              <q-btn
                flat
                dense
                icon="edit"
                color="orange"
                @click="openEditProductDialog(props.row)"
              />
              <q-btn
                flat
                dense
                icon="delete"
                color="red"
                @click="deleteProduct(props.row.id)"
              />
            </q-td>
          </template>
        </q-table>
      </q-card-section>

      <!-- Pagination Section -->
      <q-card-section class="text-center">
        <q-pagination
          v-model="pagination.page"
          :max="pagination.pagesNumber"
          color="orange"
          boundary-numbers
        />
      </q-card-section>

    </q-card>

    <!-- Add / Edit Product Dialog -->
    <q-dialog v-model="dialogVisible">
      <q-card>
        <q-card-section>
          <div class="text-h6">{{ isEdit ? 'Edit Product' : 'Add New Product' }}</div>
        </q-card-section>

        <q-card-section>
          <q-input v-model="product.name" label="Product Name" outlined />
          <q-input v-model="product.price" label="Price" type="number" outlined />
          <q-select v-model="product.category" :options="categories" label="Category" outlined />
          <q-select v-model="product.status" :options="['Active', 'In Active']" label="Status" outlined />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="grey" v-close-popup />
          <q-btn flat label="Save" color="orange" @click="saveProduct" />
        </q-card-actions>
      </q-card>
    </q-dialog>

  </q-page>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      products: [], // Products will be fetched from backend
      categories: ['Daily Food', 'Weekly Specialty', 'Drinks'], // Available categories
      columns: [
        { name: 'index', label: 'No.', align: 'left', field: row => row.id, sortable: true },
        { name: 'name', label: 'Product Name', align: 'left', field: 'name', sortable: true },
        { name: 'price', label: 'Price', align: 'left', field: 'price', sortable: true },
        { name: 'category', label: 'Category', align: 'left', field: 'category', sortable: true },
        { name: 'status', label: 'Status', align: 'left', field: 'status', sortable: true },
        { name: 'actions', label: 'Actions', align: 'center', field: 'actions', sortable: false }
      ],
      pagination: {
        page: 1,
        rowsPerPage: 5, // Show 5 items per page
        rowsNumber: 0 // To be dynamically set
      },
      dialogVisible: false,
      isEdit: false,
      product: { id: null, name: '', price: '', category: '', status: 'Active' }
    };
  },
  methods: {
    async fetchProducts() {
      try {
        const response = await axios.get('http://localhost/admin-raj/database/controller/pos_products.php');
        this.products = response.data;
        this.pagination.rowsNumber = this.products.length; // Update pagination
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    },
    openAddProductDialog() {
      this.isEdit = false;
      this.product = { id: null, name: '', price: '', category: '', status: 'Active' };
      this.dialogVisible = true;
    },
    openEditProductDialog(row) {
      this.isEdit = true;
      this.product = { ...row };
      this.dialogVisible = true;
    },
    async saveProduct() {
      try {
        if (this.isEdit) {
          
        } else {
          await axios.post('http://localhost/admin-raj/database/controller/pos_products.php', this.product);
        }
        this.fetchProducts(); // Refresh the products list
        this.dialogVisible = false;
      } catch (error) {
        console.error('Error saving product:', error);
      }
    },
    async deleteProduct(id) {
      try {
        await axios.get(`path-to-backend/delete_product.php?id=${id}`);
        this.fetchProducts();
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    },
    onRequest(props) {
      const { page } = props.pagination;
      this.pagination.page = page;
    }
  },
  mounted() {
    this.fetchProducts();
  }
};
</script>

<style scoped>
.q-table {
  background-color: white;
}

.q-pagination {
  margin-top: 10px;
}

.q-btn[flat] {
  padding: 4px 8px;
}
</style>
