<template>
  <div class="header">
    <img class="cell1" src="../assets/cell1.png" alt="">
    <img class="cell2" src="../assets/cell2.png" alt="">
    <div class="header__inner">
      <h1>{{ caType }}</h1>
      <el-select v-model="caType" class="m-2" placeholder="Select" size="small">
        <el-option
          v-for="type in caTypes"
          :key="type"
          :label="type"
          :value="type"
        />
      </el-select>
    </div>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue';

export default {
  name: "PlaygroundHeader",
  setup() {
    const caType = ref('Elementary Cellular Automata');
    const caTypes = [
      "Elementary Cellular Automata",
      "Cellular Automata",
      "Moore's Neighborhood"
    ];

    return {
      caType,
      caTypes
    };
  }

}
</script>

<style>
.header {
  width: 100%;
  height: 65px;
  position: relative;
  padding: 10px 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  overflow: hidden;
  z-index: 1;
}
.header:after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 300px;
  height: 100%;
  z-index: -1;
  /* border-top: 67px solid transparent;
  border-left: 998px solid #242424; */
  z-index: -1;
}
.cell1, .cell2 {
  max-width: 40px;
}
.header__inner {
  margin-left: 10px;
}
</style>s