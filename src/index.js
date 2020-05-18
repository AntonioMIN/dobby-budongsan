import Vue from "vue";
import App from "./App";

// const firebaseConfig = {
// 	apiKey: "AIzaSyBG4T4bj_vqp-C8PvT_ylUIS3ulLzc-LCk",
// 	authDomain: "dobby-budongsan.firebaseapp.com",
// 	databaseURL: "https://dobby-budongsan.firebaseio.com",
// 	projectId: "dobby-budongsan",
// 	storageBucket: "dobby-budongsan.appspot.com",
// 	messagingSenderId: "1036706299330",
// 	appId: "1:1036706299330:web:0a9c41a8ee980ebe6eea5b",
// };

// // Initialize Firebase
// firebase.initializeApp(firebaseConfig);

// var database = firebase.database();

// document.addEventListener("DOMContentLoaded", function () {
// 	M.AutoInit();
// });

Vue.config.productionTip = false;

new Vue({
	el: "#app",
	template: "<App/>",
	components: { App }
});

console.log("asdf");