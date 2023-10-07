<template>
  <el-menu
    class="el-menu-vertical-demo"
  >
    <el-menu-item index="1">
      <span>
        <el-icon><brush /></el-icon>
        <span>Canvas Colors</span>
      </span>
      <div class="controls">
        <el-color-picker
          v-model="options.zeroColor"
          show-alpha
          @change="emitUpdate"
        />
        <el-color-picker
          v-model="options.oneColor"
          show-alpha
          @change="emitUpdate"
        />
      </div>
    </el-menu-item>
    <el-menu-item index="2">
      <span>
        <el-icon><tools /></el-icon>
        <span>CA Parameters</span>
      </span>
      <div class="controls">
        <div class="controls__item">
          <label>Cell Size</label>
          <el-input-number
            v-model="options.cellSize"
            :min="1"
            :max="10"
            :step="1"
            controls-position="right"
            size="small"
            @change="emitUpdate"
          />
        </div>
        <div class="controls__item">
          <label>Life Cycles</label>
          <el-input-number
            v-model="options.lifeCycles"
            :min="1"
            :max="5000"
            :step="1"
            controls-position="right"
            size="small"
            @change="emitUpdate"
          />
        </div>
        <div class="controls__item">
          <label>Generations</label>
          <el-input-number
            v-model="options.generations"
            :step="1"
            :min="1"
            :max="1000"
            controls-position="right"
            size="small"
            @change="emitUpdate"
          />
        </div>
        <div class="controls__item">
          <label>Generation Width</label>
          <el-input-number
            v-model="options.width"
            :step="1"
            :min="1"
            :max="1000"
            controls-position="right"
            size="small"
            @change="emitUpdate"
          />
        </div>
      </div>
    </el-menu-item>
    <el-menu-item index="4">
      <span>
        <el-icon><operation /></el-icon>
        <span>Controls</span>
      </span>
      <div class="controls flex-dir-col">
        <div class="controls__item">
          <el-button @click="draw" type="primary" plain>Generate</el-button>
        </div>
        <div class="controls__item">
          <el-button @click="clearCanvas" :disabled="!isCanvasActive" type="warning" plain>Clear Canvas</el-button>
        </div>
      </div>
    </el-menu-item>
  </el-menu>
</template>

<script lang="ts">
import { reactive, SetupContext, defineComponent, ref, watch } from 'vue';
import CAOptions from '../interfaces/ca-options';
import { Brush, Operation, Tools } from "@element-plus/icons-vue";

export default defineComponent({
  name: "PlaygroundSideMenu",
  props: {
    caOptions: {
      type: Object as () => CAOptions
    },
    isActive: {
      type: Boolean
    },
  },
  components: {
    Brush,
    Operation,
    Tools
  },
  setup(props, context: SetupContext) {

    const isCanvasActive = ref(props.isActive);

    const options = reactive({
      zeroColor: props.caOptions?.zeroColor,
      oneColor: props.caOptions?.oneColor,
      generations: props.caOptions?.generations,
      cellSize: props.caOptions?.cellSize,
      width: props.caOptions?.width,
      lifeCycles: props.caOptions?.lifeCycles
    });

    watch(() => props.isActive, (n, o) => {
      isCanvasActive.value = n;
    });

    const clearCanvas = () => {
      context.emit('clearCanvas');
    };

    const emitUpdate = () => {
      context.emit('updateCAOptions', options);
    };

    const draw = () => {
      context.emit('draw', 'ca');
    }


    return {
      draw,
      options,
      emitUpdate,
      clearCanvas,
      isCanvasActive
    };
  }
});
</script>

<style>
.el-menu {
  height: 100%;
}
.el-menu-item {
  height: fit-content !important;
  flex-direction: column;
  align-items: flex-start;
  line-height: 40px;
}
.el-menu-item [class^=el-icon] {
  margin-right: 0px;
}
.el-menu-item * {
  vertical-align: top;
}
.el-menu-item > span {
  font-size: 1.3em;
}
.el-icon.el-color-picker__icon {
  color: transparent;
}
.el-color-picker {
  padding: 0 5px;
}
.controls__item {
  display: flex;
  flex-direction: column;
  margin-bottom: 5px;
}
.controls__item label {
  color: white;
  text-decoration: underline;
}
.controls__item .el-input-number {
  position: relative;
  top: -7px;
}
</style>