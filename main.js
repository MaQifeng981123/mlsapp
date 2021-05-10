import Vue from 'vue';
import App from './App';
import uView from "uview-ui";
import store from './store';
import language from 'language.js';
//import config from 'config.js';
import config from 'config-app.js';
Vue.config.productionTip = false
Vue.prototype.$language = language;
Vue.prototype.$config = config;
Vue.prototype.$store = store;

Vue.prototype.$backgroundAudioData = {
	playing: false,
	playTime: 0,
	formatedPlayTime: '00:00:00'
}
Vue.prototype.$adpid = "1111111111"

App.mpType = 'app'
Vue.use(uView);
const app = new Vue({
	store,
	...App
})
app.$mount()
