<template>
	<div id="app">
		<nav>
			<div class="nav-wrapper">
				<a href="#" class="brand-logo center">DoB</a>
			</div>
		</nav>
		<div class="container">
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
	</div>
</template>

<script>
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
		};
	},
	beforeMount: function() {
		this.updateRealtyList();
		this.modalData = Object.assign({}, defaultModalData);
	},
	methods: {
		updateRealtyList: function() {
			this.itemList = [];
			var target = this.itemList;
			this.$parent.database
				.ref("realty")
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
		},
		onClickNew: function() {
			this.currentId = null;
			this.modalData = Object.assign({}, defaultModalData);

			var elem = document.querySelector("#modalItem");
			var instance = M.Modal.getInstance(elem);
			instance.open();
		},
	},
};
</script>

<style lang="scss">
@import "./styles.scss";
</style>
