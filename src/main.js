import { createApp } from 'vue';
import { Quasar } from 'quasar';
import quasarUserOptions from './quasar-user-options';
import 'quasar/src/css/index.sass';
import App from './App.vue';
import './assets/print.css';
// import { store } from './stores/auth';
import router from './router';

import store from './stores'; // Import the Vuex store
import { Quasar } from 'quasar';
const app = createApp(App);

app.use(store);
app.use(router);
app.use(Quasar, quasarUserOptions);


app.mount('#app');
