<template>
	<div id="modalItem" class="modal">
		<div class="modal-content">
			<h4>부동산</h4>
			<div class="row">
				<form class="col s12">
					<div class="row">
						<div class="input-field col s12">
							<input
								placeholder="서울특별시"
								v-model="$attrs.data.address"
								type="text"
								class="validate"
							/>
							<label for="form_address">주소</label>
						</div>
					</div>
					<div class="row">
						<div class="input-field col s6">
							<input
								placeholder="강남역"
								v-model="$attrs.data.subway"
								type="text"
								class="validate"
							/>
							<label for="form_subway_station">지하철</label>
						</div>
						<div class="input-field col s6">
							<input
								placeholder="3"
								v-model="$attrs.data.height"
								type="number"
								class="validate"
							/>
							<label for="form_height">층수</label>
						</div>
					</div>
					<div class="row">
						<div class="input-field col s6">
							<span>
								<label>
									<input
										type="checkbox"
										v-model="$attrs.data.charterType"
									/>
									<span>전세</span>
								</label>
							</span>
							<span>
								<label>
									<input
										type="checkbox"
										v-model="$attrs.data.monthlyType"
									/>
									<span>월세</span>
								</label>
							</span>
						</div>
						<div class="input-field col s6">
							<input
								placeholder="5"
								v-model="$attrs.data.maintainFee"
								type="number"
								class="validate"
							/>
							<label for="form_maintainFee">관리비(만원)</label>
						</div>
					</div>
					<div class="row">
						<div class="input-field col s6">
							<input
								placeholder="1000"
								v-model="$attrs.data.deposit"
								type="number"
								class="validate"
							/>
							<label for="form_deposit">전세/보증금(만원)</label>
						</div>
						<div class="input-field col s6">
							<input
								placeholder="30"
								id="form_monthly_fee"
								v-model="$attrs.data.monthlyFee"
								type="number"
								class="validate"
							/>
							<label for="form_monthly_fee">월세(만원)</label>
						</div>
					</div>
					<div class="row">
						<div class="input-field col s12">
							<h5>옵션</h5>
							<span v-for="item in optionList" :key="item.id">
								<label>
									<input
										type="checkbox"
										v-on:change="
											onChangeCheckbox('options', item.id)
										"
										v-bind="{
											checked:
												$attrs.data.options[item.id],
										}"
									/>
									<span>{{ item.name }}</span>
								</label>
							</span>
						</div>
					</div>
					<div class="row">
						<div class="input-field col s12">
							<h5>주거환경</h5>
							<span
								v-for="item in environmentList"
								:key="item.id"
							>
								<label>
									<input
										type="checkbox"
										v-on:change="
											onChangeCheckbox(
												'environment',
												item.id
											)
										"
										v-bind="{
											checked:
												$attrs.data.environment[
													item.id
												],
										}"
									/>
									<span>{{ item.name }}</span>
								</label>
							</span>
						</div>
					</div>
					<div class="row">
						<div class="input-field col s12">
							<h5>생활편의</h5>
							<span
								v-for="item in convenienceList"
								:key="item.id"
							>
								<label>
									<input
										type="checkbox"
										v-on:change="
											onChangeCheckbox(
												'conveniences',
												item.id
											)
										"
										v-bind="{
											checked:
												$attrs.data.conveniences[
													item.id
												],
										}"
									/>
									<span>{{ item.name }}</span>
								</label>
							</span>
						</div>
					</div>
					<div class="row">
						<div class="input-field col s12">
							<h5>수압</h5>
							<p v-for="item in waterChecklist" :key="item.id">
								<label>
									<input
										type="checkbox"
										v-on:change="
											onChangeCheckbox(
												'waterChecklist',
												item.id
											)
										"
										v-bind="{
											checked:
												$attrs.data.waterChecklist[
													item.id
												],
										}"
									/>
									<span>{{ item.name }}</span>
								</label>
							</p>
						</div>
					</div>
					<div class="row">
						<div class="input-field col s12">
							<h5>보일러</h5>
							<p v-for="item in boilerChecklist" :key="item.id">
								<label>
									<input
										type="checkbox"
										v-on:change="
											onChangeCheckbox(
												'boilerChecklist',
												item.id
											)
										"
										v-bind="{
											checked:
												$attrs.data.boilerChecklist[
													item.id
												],
										}"
									/>
									<span>{{ item.name }}</span>
								</label>
							</p>
						</div>
					</div>
					<div class="row">
						<div class="input-field col s12">
							<h5>난방</h5>
							<p v-for="item in warmChecklist" :key="item.id">
								<label>
									<input
										type="checkbox"
										v-on:change="
											onChangeCheckbox(
												'boilerChecklist',
												item.id
											)
										"
										v-bind="{
											checked:
												$attrs.data.boilerChecklist[
													item.id
												],
										}"
									/>
									<span>{{ item.name }}</span>
								</label>
							</p>
						</div>
					</div>
					<div class="row">
						<div class="input-field col s12">
							<h5>청결</h5>
							<p v-for="item in cleaningChecklist" :key="item.id">
								<label>
									<input
										type="checkbox"
										v-on:change="
											onChangeCheckbox(
												'cleaningChecklist',
												item.id
											)
										"
										v-bind="{
											checked:
												$attrs.data.cleaningChecklist[
													item.id
												],
										}"
									/>
									<span>{{ item.name }}</span>
								</label>
							</p>
						</div>
					</div>
					<div class="row">
						<div class="input-field col s12">
							<h5>계약</h5>
							<p v-for="item in contractChecklist" :key="item.id">
								<label>
									<input
										type="checkbox"
										v-on:change="
											onChangeCheckbox(
												'contractChecklist',
												item.id
											)
										"
										v-bind="{
											checked:
												$attrs.data.contractChecklist[
													item.id
												],
										}"
									/>
									<span>{{ item.name }}</span>
								</label>
							</p>
						</div>
					</div>
					<div class="row">
						<div class="input-field col s12">
							<textarea
								id="form_memo"
								v-model="$attrs.data.memo"
								class="materialize-textarea"
								data-length="120"
							></textarea>
							<label for="form_memo">메모</label>
						</div>
					</div>
				</form>
			</div>
		</div>
		<div class="modal-footer">
			<a href="#!" class="modal-close waves-effect waves-red btn-flat"
				>닫기</a
			>
			<button
				class="btn waves-effect waves-light modal-close red darken-1"
				type="submit"
				name="action"
				v-on:click="onClickDelete()"
				v-if="this.$attrs.currentId"
			>
				삭제
			</button>
			<button
				class="btn waves-effect waves-light modal-close"
				type="submit"
				name="action"
				v-on:click="onClickSave()"
			>
				저장
			</button>
		</div>
	</div>
</template>

<script>
import * as firebase from "firebase/app";
import "firebase/auth";

export default {
	data: function() {
		return {
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
				{
					id: "waterCheck2",
					name: "싱크대, 세면대에 물 가득 받고 내리기",
				},
			],
			boilerChecklist: [
				{ id: "boilerCheck1", name: "온수 확인하기" },
				{ id: "boilerCheck2", name: "보일러 작동여부 확인하기" },
			],
			warmChecklist: [
				{ id: "warmCheck1", name: "일조량 확인하기" },
				{
					id: "warmCheck2",
					name: "벽 만지기(벽이 차면 보일러 켜도 추움)",
				},
			],
			cleaningChecklist: [
				{ id: "cleaningCheck1", name: "결로, 누수, 곰팡이 확인" },
				{ id: "cleaningCheck2", name: "바퀴벌레 패치 확인" },
				{
					id: "cleaningCheck3",
					name: "방충망 확인(구멍있으면 수선 요청)",
				},
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
		};
	},
	mounted: function() {
		var elems = document.querySelectorAll(".modal");
		var instances = M.Modal.init(elems);
		M.updateTextFields();
	},
	methods: {
		onChangeCheckbox: function(group, id) {
			this.$attrs.data[group][id] = this.$attrs.data[group][id]
				? false
				: true;
		},
		onClickSave: function() {
			var updater = this.$attrs.refresh;
			if (this.$attrs.currentId === null) {
				var newRef = this.$attrs.database
					.ref("users/" + firebase.auth().currentUser.uid + "/realty")
					.push();
				newRef.set(this.$attrs.data, function() {
					updater();
				});
			} else {
				this.$attrs.database
					.ref(
						"users/" +
							firebase.auth().currentUser.uid +
							"/realty/" +
							this.$attrs.currentId
					)
					.set(this.$attrs.data, function() {
						updater();
					});
			}
		},
		onClickDelete: function() {
			var updater = this.$attrs.refresh;
			this.$attrs.database
				.ref(
					"users/" +
						firebase.auth().currentUser.uid +
						"/realty/" +
						this.$attrs.currentId
				)
				.remove(function() {
					updater();
				});
		},
	},
};
</script>
