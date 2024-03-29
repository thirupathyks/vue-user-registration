import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue/dist/bootstrap-vue.esm';
import App from './App.vue'
import axios from 'axios'
import Vuelidate from 'vuelidate'

// Import the styles directly. (Or you could add them via script tags.)
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

Vue.config.productionTip = false
Vue.use(BootstrapVue);
Vue.prototype.$http = axios
Vue.use(Vuelidate)

new Vue({
  render: h => h(App),
}).$mount('#app')
