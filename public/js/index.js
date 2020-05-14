function guid() {
	function s4() {
		return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
	}
	return (
		s4() +
		s4() +
		"-" +
		s4() +
		"-" +
		s4() +
		"-" +
		s4() +
		"-" +
		s4() +
		s4() +
		s4()
	);
}
document.addEventListener("DOMContentLoaded", function () {
	M.AutoInit();
});

const firebaseConfig = {
	apiKey: "AIzaSyBG4T4bj_vqp-C8PvT_ylUIS3ulLzc-LCk",
	authDomain: "dobby-budongsan.firebaseapp.com",
	databaseURL: "https://dobby-budongsan.firebaseio.com",
	projectId: "dobby-budongsan",
	storageBucket: "dobby-budongsan.appspot.com",
	messagingSenderId: "1036706299330",
	appId: "1:1036706299330:web:0a9c41a8ee980ebe6eea5b",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var database = firebase.database();

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

var app = new Vue({
	el: "#app",
	data: {
		currentId: null,
		modalData: Object.assign({}, defaultModalData),
		itemList: [],
		optionList: [
			{ id: "parking", name: "주차" },
			{ id: "waterworks", name: "수도" },
			{ id: "electric", name: "전기" },
			{ id: "tv", name: "TV" },
			{ id: "internet", name: "인터넷" },
			{ id: "cleaning", name: "청소" },
			{ id: "elevator", name: "엘리베이터" },
			{ id: "airCondition", name: "에어컨" },
			{ id: "builtIn", name: "붙박이" },
			{ id: "drum", name: "드럼" },
			{ id: "microwave", name: "전자레인지" },
			{ id: "shoeCloset", name: "신발장" },
			{ id: "fullOption", name: "풀옵션" },
		],
		environmentList: [
			{ id: "subway", name: "지하철" },
			{ id: "bus", name: "버스" },
			{ id: "hospital", name: "병원" },
			{ id: "laundry", name: "세탁소" },
			{ id: "supermarket", name: "대형마트" },
			{ id: "convenience", name: "편의점" },
		],
		convenienceList: [
			{ id: "elevator", name: "엘리베이터" },
			{ id: "cctv", name: "CCTV" },
			{ id: "unmannedDeliveryBox", name: "무인택배함" },
		],
		waterChecklist: [
			{ id: "waterCheck1", name: "변기에 휴지 넣고 물 내리기" },
			{ id: "waterCheck2", name: "싱크대, 세면대에 물 가득 받고 내리기" },
		],
		boilerChecklist: [
			{ id: "boilerCheck1", name: "온수 확인하기" },
			{ id: "boilerCheck2", name: "보일러 작동여부 확인하기" },
		],
		warmChecklist: [
			{ id: "warmCheck1", name: "일조량 확인하기" },
			{ id: "warmCheck2", name: "벽 만지기(벽이 차면 보일러 켜도 추움)" },
		],
		cleaningChecklist: [
			{ id: "cleaningCheck1", name: "결로, 누수, 곰팡이 확인" },
			{ id: "cleaningCheck2", name: "바퀴벌레 패치 확인" },
			{ id: "cleaningCheck3", name: "방충망 확인(구멍있으면 수선 요청)" },
		],
		contractChecklist: [
			{ id: "contractCheck1", name: "전 세입자 이사 사유" },
			{ id: "contractCheck2", name: "공실 기간(3개월 이상은 X)" },
			{
				id: "contractCheck3",
				name: "고지서 확인(공과금 확인하여 생활비 계산)",
			},
			{
				id: "contractCheck4",
				name: "등기부등본 확인(근저당 확인 - 집주인 신용도)",
			},
			{
				id: "contractCheck5",
				name: "집주인 건물 내 함께 거주 여부 확인",
			},
		],
	},
	beforeMount: function () {
		this.updateRealtyList();
	},
	methods: {
		updateRealtyList: function () {
			this.itemList = [];
			var target = this.itemList;
			database
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
		onChangeCheckbox: function (group, id) {
			this.modalData[group][id] = this.modalData[group][id]
				? false
				: true;
		},
		onClickSave: function () {
			var updater = this.updateRealtyList;
			if (this.currentId === null) {
				var newRef = database.ref("realty").push();
				newRef.set(this.modalData, function () {
					updater();
				});
			} else {
				database
					.ref("realty/" + this.currentId)
					.set(this.modalData, function () {
						updater();
					});
			}
		},
		onClickRealty: function (id) {
			let result = this.itemList.find((item) => item.id === id);
			this.currentId = result.id;
			this.modalData = Object.assign({}, defaultModalData, result.data);

			var elem = document.querySelector("#modalItem");
			var instance = M.Modal.getInstance(elem);
			instance.open();
		},
		onClickNew: function () {
			this.currentId = null;
			this.modalData = Object.assign({}, defaultModalData);
		},
	},
});
