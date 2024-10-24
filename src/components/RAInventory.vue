<template>
  <q-page padding>
    <q-card>
      <q-card-section>
        <div class="text-h6">Inventory Management</div>
        <q-btn label="Add Item" color="primary" @click="showDialog = true" />
      </q-card-section>

      <q-table
        :rows="items"
        :columns="columns"
        row-key="id"
        :rows-per-page-options="[5, 10, 25]"
      >
        <template v-slot:body-cell-actions="props">
          <q-td>
            <q-btn flat icon="edit" color="primary" @click="editItem(props.row)" />
            <q-btn flat icon="delete" color="negative" @click="deleteItem(props.row.id)" />
          </q-td>
        </template>
      </q-table>
    </q-card>

    <q-dialog v-model="showDialog">
      <q-card>
        <q-card-section>
          <div class="text-h6">{{ editing ? 'Edit Item' : 'Add New Item' }}</div>
        </q-card-section>
        <q-card-section>
          <q-input v-model="form.name" label="Item Name" />
          <q-input v-model="form.quantity" type="number" label="Quantity" />
          <q-input v-model="form.price" type="number" label="Price" />
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="negative" @click="showDialog = false" />
          <q-btn flat label="Save" color="primary" @click="saveItem" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      items: [],
      columns: [
        { name: 'name', label: 'Item Name', align: 'left', field: 'name' },
        { name: 'quantity', label: 'Quantity', align: 'left', field: 'quantity' },
        { name: 'price', label: 'Price', align: 'left', field: 'price' },
        { name: 'actions', label: 'Actions', align: 'center', field: 'actions' }
      ],
      showDialog: false,
      editing: false,
      form: {
        id: null,
        name: '',
        quantity: '',
        price: ''
      }
    }
  },
  methods: {
    fetchItems() {
      // Fetch data from backend
      fetch('http://localhost/backend/inventory.php?action=fetch')
        .then(response => response.json())
        .then(data => {
          this.items = data;
        });
    },
    saveItem() {
      let action = this.editing ? 'update' : 'create';
      fetch(`http://localhost/backend/inventory.php?action=${action}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(this.form)
      })
        .then(() => {
          this.fetchItems();
          this.showDialog = false;
        });
    },
    editItem(item) {
      this.editing = true;
      this.form = { ...item };
      this.showDialog = true;
    },
    deleteItem(id) {
      fetch(`http://localhost/backend/inventory.php?action=delete`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
      }).then(() => {
        this.fetchItems();
      });
    }
  },
  mounted() {
    this.fetchItems();
  }
};
</script>

<style scoped>
</style>
