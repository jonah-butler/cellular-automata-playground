<template>
  <el-menu
    class="el-menu-vertical-demo"
  >
    <el-menu-item index="1">
      <el-icon><brush /></el-icon>
      <span>Canvas Colors</span>
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
      <el-icon><tools /></el-icon>
      <span>CA Parameters</span>
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
            :max="500"
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
            controls-position="right"
            size="small"
            @change="emitUpdate"
          />
        </div>
      </div>
    </el-menu-item>
    <el-menu-item index="4">
      <el-icon><operation /></el-icon>
      <span>Controls</span>
      <div class="controls">
        <div class="controls__item">
          <el-button @click="draw" type="primary" plain>Generate</el-button>
        </div>
        <div class="controls__item">
          <el-button @click="stopGenerating" type="warning" plain>Stop Generating</el-button>
        </div>
      </div>
    </el-menu-item>
  </el-menu>
</template>

<script lang="ts">
import { reactive, SetupContext, defineComponent } from 'vue';
import CAOptions from '../interfaces/ca-options';
import { Brush, Operation, Tools } from "@element-plus/icons-vue";

export default defineComponent({
  name: "PlaygroundSideMenu",
  props: {
    caOptions: {
      type: Object as () => CAOptions
    }
  },
  components: {
    Brush,
    Operation,
    Tools
  },
  setup(props, context: SetupContext) {

    const options = reactive({
      zeroColor: props.caOptions?.zeroColor,
      oneColor: props.caOptions?.oneColor,
      generations: props.caOptions?.generations,
      cellSize: props.caOptions?.cellSize,
      width: props.caOptions?.width,
      lifeCycles: props.caOptions?.lifeCycles
    });

    const emitUpdate = () => {
      context.emit('updateCAOptions', options);
    };

    const draw = () => {
      context.emit('draw', 'ca');
    }

    const stopGenerating = () => {
      context.emit('stopGeneration');
    }

    return {
      draw,
      options,
      emitUpdate,
      stopGenerating
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
.el-menu-item > .el-icon {
  position: absolute;
  left: -5px;
  top: 10px;
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