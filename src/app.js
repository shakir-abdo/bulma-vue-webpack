import 'bulma/bulma.sass';
import './css/style.scss';
import 'font-awesome/scss/font-awesome.scss';
import './js/script';
import  Vue from 'vue';
import  App from './App.vue';
new Vue({
    el: '#app',
    render: function(h) {return h(App);}
  });
