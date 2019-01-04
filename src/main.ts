import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import * as firebase from 'firebase/app'
import VueFire from 'vuefire'
import 'firebase/firestore'

// set up firebase
const config = {
  apiKey: 'AIzaSyAZjipQV4zo27w2wGb4VIBG9o02pte9uD0',
  authDomain: 'todo-vue-app.firebaseapp.com',
  databaseURL: 'https://todo-vue-app.firebaseio.com',
  projectId: 'todo-vue-app',
  storageBucket: 'todo-vue-app.appspot.com',
  messagingSenderId: '749479675889',
}

firebase.initializeApp(config)

// Initialize Cloud Firestore through Firebase
export const db = firebase.firestore()

// Disable deprecated features
db.settings({
  timestampsInSnapshots: true,
})

Vue.use(VueFire)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
