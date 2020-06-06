<template>
	<div id="app">
		<nav>
			<div class="nav-wrapper">
				<a href="#" class="brand-logo center">DoB</a>
				<a href="#" data-target="mobile-demo" class="sidenav-trigger"
					><i class="material-icons">menu</i></a
				>
				<ul id="nav-mobile" class="right hide-on-med-and-down">
					<li v-if="signedIn">
						<a href="#" v-on:click="logout">Logout</a>
					</li>
				</ul>
			</div>
		</nav>
		<ul class="sidenav" id="mobile-demo">
			<li v-if="signedIn"><a href="#" v-on:click="logout">Logout</a></li>
		</ul>
		<div class="container intro" v-if="signedIn === false">
			<p>
				부동산 체크 리스트 서비스
			</p>
			<h3>
				Dobby's Budongsan
			</h3>
			<button
				class="waves-effect waves-light btn-large"
				v-on:click="onClickSignIn"
			>
				<i class="material-icons left">home</i>시작하기
			</button>
		</div>
		<div class="container" v-if="signedIn === true">
			<div class="fixed-action-btn" v-on:click="onClickNew">
				<a
					class="btn-floating btn-large red modal-trigger"
					href="#modalItem"
				>
					<i class="large material-icons">add</i>
				</a>
			</div>
			<h3>부동산</h3>
			<RealtyTable
				v-bind:items="itemList"
				v-bind:onClick="onClickRealty"
			></RealtyTable>
			<RealtyModal
				v-bind:currentId="currentId"
				v-bind:data="modalData"
				v-bind:database="$parent.database"
				v-bind:refresh="updateRealtyList"
			></RealtyModal>
		</div>
		<div class="footer">
			Antonio Min<a href="https://github.com/AntonioMIN"
				><i class="material-icons">code</i></a
			>
		</div>
	</div>
</template>

<script>
import * as firebase from "firebase/app";
import "firebase/auth";
import RealtyTable from "./components/RealtyTable.vue";
import RealtyModal from "./components/RealtyModal.vue";

const defaultModalData = {
	address: "",
	subway: "",
	height: null,
	maintainFee: null,
	deposit: null,
	monthlyFee: null,
	charterType: false,
	monthlyType: false,
	options: {},
	environment: {},
	conveniences: {},
	waterChecklist: {},
	boilerChecklist: {},
	warmChecklist: {},
	cleaningChecklist: {},
	contractChecklist: {},
	memo: "",
};

export default {
	components: {
		RealtyTable,
		RealtyModal,
	},
	data: function() {
		return {
			itemList: [],
			currentId: null,
			modalData: null,
			signedIn: null,
		};
	},
	beforeMount: function() {
		firebase.auth().onAuthStateChanged((user) => {
			if (user) {
				console.log("Singed in");
				this.signedIn = true;
				this.updateRealtyList();
			} else {
				this.signedIn = false;
				console.log("None");
			}
		});
		this.modalData = Object.assign({}, defaultModalData);
	},
	mounted: function() {
		var elems = document.querySelectorAll(".sidenav");
		var instances = M.Sidenav.init(elems);
	},
	methods: {
		updateRealtyList: function() {
			this.itemList = [];
			var target = this.itemList;
			this.$parent.database
				.ref("users/" + firebase.auth().currentUser.uid + "/realty")
				.once("value")
				.then((dataSnapshot) => {
					dataSnapshot.forEach((item) => {
						target.push({
							id: item.key,
							data: item.val(),
						});
					});
				});
		},
		onClickRealty: function(id) {
			let result = this.itemList.find((item) => item.id === id);
			if (result === undefined) {
				return;
			}
			this.currentId = result.id;
			this.modalData = Object.assign({}, defaultModalData, result.data);

			var elem = document.querySelector("#modalItem");
			var instance = M.Modal.getInstance(elem);
			instance.open();
			elem.scroll(0, 0);
		},
		onClickNew: function() {
			this.currentId = null;
			this.modalData = Object.assign({}, defaultModalData);

			var elem = document.querySelector("#modalItem");
			var instance = M.Modal.getInstance(elem);
			instance.open();
			elem.scroll(0, 0);
		},
		onClickSignIn: function() {
			var provider = new firebase.auth.GoogleAuthProvider();
			firebase
				.auth()
				.signInWithPopup(provider)
				.then((result) => {
					this.signedIn = true;
					this.updateRealtyList();
				})
				.catch(function(error) {
					console.log(error);
					M.toast({ html: "로그인에 실패했습니다." });
				});
		},
		logout: function() {
			firebase
				.auth()
				.signOut()
				.then(() => {
					this.signedIn = false;
					this.itemList = [];
				});
		},
	},
};
</script>

<style lang="scss">
@import "./styles.scss";
</style>
