import Vue from 'vue';
import App from './components/App.vue'
new Vue({
  render: objRender => objRender(App)
}).$mount('#app');