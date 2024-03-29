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
          v-for="t in types"
          :key="t"
          :label="t.name"
          :value="t.name"
        />
      </el-select>
    </div>
    <div class="button-wrapper">
      <el-button @click="openDrawer" class="expand" type="success" :icon="Expand"></el-button>
    </div>
    <el-button @click="saveCanvas" class="download" :disabled="!isCanvasActive" type="success" :icon="Download"></el-button>
  </div>
</template>

<script lang="ts">
import { ref, SetupContext, defineComponent, watch } from 'vue';
import { Download, Expand } from '@element-plus/icons-vue';

export default defineComponent({
  name: "PlaygroundHeader",
  components: {
    Download,
    Expand
  },
  props: {
    types: {
      type: Array as () => Array<Record<string, string>>,
      required: true,
    },
    selectedType: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean
    }
  },
  emits: ["updateCAType", "saveCanvas", "openDrawer"],
  setup(props, { emit }) {
    const caType = ref(props.selectedType);
    const isCanvasActive = ref(props.isActive);

    watch(() => props.isActive, (n, o) => {
      isCanvasActive.value = n;
    });

    const saveCanvas = (): void => {
      emit('saveCanvas');
    };

    const emitCAType = (caType: string): void => {
      emit("updateCAType", caType);
    };

    const openDrawer = () => {
      emit('openDrawer');
    }

    return {
      caType,
      emitCAType,
      Download,
      Expand,
      saveCanvas,
      openDrawer,
      isCanvasActive
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
  z-index: -1;
}
.cell1, .cell2 {
  max-width: 40px;
}
.header__inner {
  margin-left: 10px;
}
.download {
  position: absolute;
  top: 52px;
  right: 1px;
}
.button-wrapper {
  position: absolute;
  top: 52px;
  right: 51px;
}

@media screen and (min-width: 992px){
  .button-wrapper {
    display: none !important;
  }
}
</style>