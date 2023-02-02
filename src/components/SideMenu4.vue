<template>
  <el-menu class="el-menu-vertical-demo">
    <el-menu-item index="1">
      <el-icon><brush /></el-icon>
      <span>Canvas Colors</span>
      <div class="controls">
        <el-color-picker
          v-model="options.deadColor"
          show-alpha
          @change="emitUpdate"
        />
        <el-color-picker
          v-model="options.livingColor"
          show-alpha
          @change="emitUpdate"
        />
      </div>
    </el-menu-item>
    <el-menu-item index="2">
      <el-icon><tools /></el-icon>
      <span>DW Parameters</span>
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
        <div class="controls__item">
          <label>Num of Drunkards</label>
          <el-input-number
            v-model="options.drunkards"
            :min="1"
            :max="200"
            :step="1"
            controls-position="right"
            size="small"
            @change="emitUpdate"
          />
        </div>
        <div class="controls__item">
          <label>Drunkard Steps</label>
          <el-input-number
            v-model="options.steps"
            :min="1"
            :max="10000"
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
          <el-button
            @click="clearCanvas"
            :disabled="!isCanvasActive"
            type="warning"
            plain
            >Clear Canvas</el-button
          >
        </div>
      </div>
    </el-menu-item>
  </el-menu>
</template>

<script lang="ts">
import { reactive, SetupContext, defineComponent, ref, watch } from "vue";
import DWOptions from "../interfaces/dw-options";
import { Brush, Operation, Tools } from "@element-plus/icons-vue";

export default defineComponent({
  name: "PlaygroundSideMenu",
  props: {
    dwOptions: {
      type: Object as () => DWOptions,
    },
    isActive: {
      type: Boolean,
    },
  },
  components: {
    Brush,
    Operation,
    Tools,
  },
  setup(props, context: SetupContext) {
    const isCanvasActive = ref(props.isActive);

    const options = reactive({
      deadColor: props.dwOptions!.deadColor,
      livingColor: props.dwOptions!.livingColor,
      generations: props.dwOptions!.generations,
      cellSize: props.dwOptions!.cellSize,
      width: props.dwOptions!.width,
      steps: props.dwOptions!.steps,
      drunkards: props.dwOptions!.drunkards,
    });

    watch(
      () => props.isActive,
      (n, o) => {
        isCanvasActive.value = n;
      }
    );

    const clearCanvas = () => {
      context.emit("clearCanvas");
    };

    const emitUpdate = () => {
      context.emit("updateDWOptions", options);
    };

    const draw = () => {
      context.emit("draw", "dw");
    };

    return {
      draw,
      options,
      emitUpdate,
      clearCanvas,
      isCanvasActive,
    };
  },
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
.el-menu-item [class^="el-icon"] {
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
