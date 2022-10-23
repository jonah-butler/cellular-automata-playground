<template>
  <div class="header">
    <img class="cell1" src="../assets/cell1.png" alt="">
    <img class="cell2" src="../assets/cell2.png" alt="">
    <div class="header__inner">
      <h1>{{ selectedType }}</h1>
      <el-select
        v-model="caType"
        class="m-2"
        placeholder="Select"
        size="small"
        @change="emitCAType"
      >
        <el-option
          v-for="type in types"
          :key="type"
          :label="type.name"
          :value="type.name"
        />
      </el-select>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, SetupContext, defineComponent } from 'vue';

export default defineComponent({
  name: "PlaygroundHeader",
  props: {
    types: {
      type: Array as () => Array<Record<string, string>>,
      required: true,
    },
    selectedType: {
      type: String,
      required: true,
    }
  },
  setup(props, context: SetupContext) {
    const caType = ref(props.selectedType);

    const emitCAType = (caType: string): void => {
      context.emit("updateCAType", caType);
    }

    return {
      caType,
      emitCAType
    };
  }
});
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