<template>
  <div id="modalItem" class="modal">
    <div class="modal-content">
      <h4>부동산</h4>
      <div class="row">
        <form class="col s12">
          <div class="row">
            <div class="input-field col s12">
              <input placeholder="서울특별시" v-model="modalData.address" type="text" class="validate" />
              <label for="form_address">주소</label>
            </div>
          </div>
          <div class="row">
            <div class="input-field col s6">
              <input placeholder="강남역" v-model="modalData.subway" type="text" class="validate" />
              <label for="form_subway_station">지하철</label>
            </div>
            <div class="input-field col s6">
              <input placeholder="3" v-model="modalData.height" type="number" class="validate" />
              <label for="form_height">층수</label>
            </div>
          </div>
          <div class="row">
            <div class="input-field col s6">
              <span>
                <label>
                  <input type="checkbox" v-model="modalData.charterType" />
                  <span>전세</span>
                </label>
              </span>
              <span>
                <label>
                  <input type="checkbox" v-model="modalData.monthlyType" />
                  <span>월세</span>
                </label>
              </span>
            </div>
            <div class="input-field col s6">
              <input placeholder="5" v-model="modalData.maintainFee" type="number" class="validate" />
              <label for="form_maintainFee">관리비(만원)</label>
            </div>
          </div>
          <div class="row">
            <div class="input-field col s6">
              <input placeholder="1000" v-model="modalData.deposit" type="number" class="validate" />
              <label for="form_deposit">전세/보증금(만원)</label>
            </div>
            <div class="input-field col s6">
              <input
                placeholder="30"
                id="form_monthly_fee"
                v-model="modalData.monthlyFee"
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
                    v-on:change="onChangeCheckbox('options', item.id)"
                    v-bind="{ checked: modalData.options[item.id]}"
                  />
                  <span>{{ item.name }}</span>
                </label>
              </span>
            </div>
          </div>
          <div class="row">
            <div class="input-field col s12">
              <h5>주거환경</h5>
              <span v-for="item in environmentList" :key="item.id">
                <label>
                  <input
                    type="checkbox"
                    v-on:change="onChangeCheckbox('environment', item.id)"
                    v-bind="{ checked: modalData.environment[item.id]}"
                  />
                  <span>{{ item.name }}</span>
                </label>
              </span>
            </div>
          </div>
          <div class="row">
            <div class="input-field col s12">
              <h5>생활편의</h5>
              <span v-for="item in convenienceList" :key="item.id">
                <label>
                  <input
                    type="checkbox"
                    v-on:change="onChangeCheckbox('conveniences', item.id)"
                    v-bind="{ checked: modalData.conveniences[item.id]}"
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
                    v-on:change="onChangeCheckbox('waterChecklist', item.id)"
                    v-bind="{ checked: modalData.waterChecklist[item.id]}"
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
                    v-on:change="onChangeCheckbox('boilerChecklist', item.id)"
                    v-bind="{ checked: modalData.boilerChecklist[item.id]}"
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
                    v-on:change="onChangeCheckbox('boilerChecklist', item.id)"
                    v-bind="{ checked: modalData.boilerChecklist[item.id]}"
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
                    v-on:change="onChangeCheckbox('cleaningChecklist', item.id)"
                    v-bind="{ checked: modalData.cleaningChecklist[item.id]}"
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
                    v-on:change="onChangeCheckbox('contractChecklist', item.id)"
                    v-bind="{ checked: modalData.contractChecklist[item.id]}"
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
                v-model="modalData.memo"
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
      <a href="#!" class="modal-close waves-effect waves-red btn-flat">취소</a>
      <button
        class="btn waves-effect waves-light modal-close"
        type="submit"
        name="action"
        v-on:click="onClickSave()"
      >저장</button>
    </div>
  </div>
</template>

<script>
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
  memo: ""
};
export default {};
</script>