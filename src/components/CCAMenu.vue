<template>
  <el-menu>
    <el-menu-item index="1">
      <span>
        <el-icon><brush /></el-icon>
        <span>States</span>
      </span>
      <div class="controls">

        <div class="cca-menu_color-container" v-for="(_color, i) in ccaOptions.colors">
        <el-color-picker 
          v-model="ccaOptions.colors[i]"
          show-alpha
        />
        <el-icon @click="deleteState(i)" class="cca-menu__delete-icon" :size="11"><delete /></el-icon>

        </div>
        <!-- add another color -->
        <el-icon @click="addColorState" class="cca_menu__add-state-btn"><plus /></el-icon>    
      </div>
    </el-menu-item>
    <el-menu-item index="2">
      <span>
        <el-icon><tools /></el-icon>
        <span>CCA Parameters</span>
      </span>
      <div class="controls">
        <div class="controls__item">
          <label>Range</label>
          <el-input-number size="small" v-model="ccaOptions.range" :min="1" :max="1" />
        </div>
        <div class="controls__item">
          <label>Threshold</label>
          <el-input-number size="small" v-model="ccaOptions.threshold" :min="1" :max="computedThresholdMax" />
        </div>
        <div class="controls__item">
          <label>Cell Size</label>
          <el-input-number
            size="small"
            v-model="ccaOptions.cellSize"
            :min="1"
            :max="10"
            :step="1"
            @change="emitUpdate"
          />
        </div>
        <div class="controls__item">
          <label>Width</label>
          <el-input-number
            size="small"
            v-model="ccaOptions.width"
            :min="1"
            :max="10000"
            :step="1"
            @change="emitUpdate"
          />
        </div>
        <div class="controls__item">
          <label>Generations</label>
          <el-input-number
            size="small"
            v-model="ccaOptions.generations"
            :min="1"
            :max="10000"
            :step="1"
            @change="emitUpdate"
          />
        </div>
        <div class="controls__item">
          <label>LifeCycles</label>
          <el-input-number
            size="small"
            v-model="ccaOptions.lifeCycles"
            :min="1"
            :max="10000"
            :step="1"
            @change="emitUpdate"
          />
        </div>
        <div class="controls__item">
          <label>Start with Noise</label>
          <el-checkbox
            size="small"
            v-model="ccaOptions.useNoise"
            label="Noise"
            border
            @change="emitUpdate"
          />
        </div>
        <div class="controls__item">
          <label>Animate LifeCycles</label>
          <el-checkbox
            size="small"
            v-model="ccaOptions.animate"
            label="Animate"
            border
            @change="emitUpdate"
          />
        </div>
      </div>
    </el-menu-item>
    <el-menu-item index="3">
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
import { defineComponent, reactive, computed, ref, SetupContext, watch } from "vue"
import CCAOptions from "../interfaces/cca-options"
import { Brush, Plus, Delete, Tools, Operation } from "@element-plus/icons-vue";

export default defineComponent({
  name: "CyclicCASideMenu",
  components: {
    Brush,
    Plus,
    Delete,
    Tools,
    Operation,
  },
  props: {
    options: {
      required: true,
      type: Object as () => CCAOptions,
    },
    isActive: {
      type: Boolean,
    },
  },
  setup (props, context: SetupContext) {

    const rgbCeil = 255;
    const maxThreshold = 8;
    const isCanvasActive = ref(props.isActive);

    const computedThresholdMax = computed((): number => {
      return ccaOptions.range * maxThreshold;
    })
    
    const ccaOptions = reactive({
      colors: props.options.colors,
      range: props.options.range,
      threshold: props.options.threshold,
      width: props.options.width,
      generations: props.options.generations,
      cellSize: props.options.cellSize,
      lifeCycles: props.options.lifeCycles,
      useNoise: props.options.useNoise,
      animate: props.options.animate,
    });


    const setupStartingColors = (): void => {
      for(let i = 0; i < 3; i++) {
        addColorState();
      }
    };

    const deleteState = (i: number): void => {
      ccaOptions.colors.splice(i, 1);
    }

    const addColorState = (): void => {
      const r = generateRandomRGBColor(rgbCeil);
      const g = generateRandomRGBColor(rgbCeil);
      const b = generateRandomRGBColor(rgbCeil);
      ccaOptions.colors.push(`rgba(${r}, ${g}, ${b}, 1)`);
    };

    const generateRandomRGBColor = (ceil: number): number => {
      return Math.floor(Math.random() * (ceil + 1));
    };

    const emitUpdate = (): void => {
      context.emit("updateCcaOptions", ccaOptions);
    };

    const draw = (): void => {
      context.emit('draw', 'cca');
    };

    const clearCanvas = (): void => {
      context.emit('clearCanvas');
    };

    watch(ccaOptions, () => {
      emitUpdate();
    });

    watch(() => props.isActive, (n, o) => {
      isCanvasActive.value = n;
    });

    setupStartingColors();

    return {ccaOptions, draw, emitUpdate, clearCanvas, addColorState, deleteState, isCanvasActive, computedThresholdMax}
  }
})
</script>

<style scoped>
.cca_menu__add-state-btn {
  margin-top: 7px;
  margin-left: 9px;
  transition: color .3s ease;
  color: white;
}
.cca_menu__add-state-btn:hover {
  color: #71caca;
  cursor: pointer;
}

.cca-menu__delete-icon {
  position: absolute;
  right: -14px;
}

.cca-menu_color-container {
  position: relative;
  margin-right: 5px;
}

</style>