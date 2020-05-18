<template>
  <div id="app">
    <nav>
      <div class="nav-wrapper">
        <a href="#" class="brand-logo center">DoB</a>
      </div>
    </nav>
    <div class="container">
      <div class="fixed-action-btn" v-on:click="onClickNew">
        <a class="btn-floating btn-large red modal-trigger" href="#modalItem">
          <i class="large material-icons">add</i>
        </a>
      </div>
      <h3>부동산</h3>
      <RealtyTable></RealtyTable>
    </div>
  </div>
</template>

<script>
import RealtyTable from "./components/RealtyTable.vue";
import RealtyModal from "./components/RealtyModal.vue";

export default {
  components: {
    RealtyTable,
    RealtyModal
  },
  mounted: function() {
    console.log("mounted");
  }
};
</script>

<style lang="scss">
@import "./styles.scss";
</style>