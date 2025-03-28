import '@/styles/globalStyles.css'
import NaiveUI from 'naive-ui';
import {createApp} from 'vue'
import App from './App.vue'
import router from './router/index.js'
import {store} from './store/index.js'


const app = createApp(App)

app.use(store);
app.use(router);
app.use(NaiveUI);
app.mount('#app')
