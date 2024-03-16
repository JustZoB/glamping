import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from '@/App.vue';
import router from '@/router';
import '@/assets/scss/tailwind.scss';
import vClickOutside from 'click-outside-vue3';
import VueSelect from 'vue-select';
import axios from '@/plugins/axios';
import Toast from 'vue-toastification';
import i18n from '@/i18n';
import PerfectScrollbar from 'vue3-perfect-scrollbar';

const pinia = createPinia();
const app = createApp(App);

app.use(pinia);
app.use(router);
app.use(vClickOutside);
app.provide('axios', axios(router));
app.use(Toast);
app.use(i18n);
app.use(PerfectScrollbar);

app.component('v-select', VueSelect);

app.mount('#app');
