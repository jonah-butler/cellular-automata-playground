<template>
  <el-menu class="el-menu-vertical-demo" @keydown="updateRule">
    <el-menu-item index="1">
      <div class="controls">
        <ColorBlocks @update="emitUpdate" :max="maxColorStates" :colors="options.colors!" />
        <div style="word-break: break-all;"></div>
      </div>
    </el-menu-item>
    <el-menu-item index="2">
      <span>
        <el-icon>
          <tools />
        </el-icon>
        <span>ECA Parameters</span>
      </span>
      <div class="controls">
        <div class="controls__item">
          <label>Cell Size</label>
          <el-input-number v-model="options.cellSize" :min="1" :max="10" :step="1" controls-position="right" size="small"
            @change="emitUpdate" />
        </div>
        <div class="controls__item">
          <label>Rule
            <el-tooltip placement="top" effect="light">
              <template #content>Max safe rule: <br> {{ ruleMax }}</template>
              <el-icon>
                <InfoFilled />
              </el-icon>
            </el-tooltip>
            <el-icon>
              <Refresh @click="generateRandomRule" />
            </el-icon>
          </label>
          <el-input v-model="options.rule" :min="0" :max="ruleMax" :step="1" controls-position="right" size="small"
            @change="emitUpdate" />
        </div>
        <div class="controls__item">
          <label>Generations</label>
          <el-input-number v-model="options.generations" :step="1" controls-position="right" size="small"
            @change="emitUpdate" />
        </div>
        <div class="controls__item">
          <label>Generation Width</label>
          <el-input-number v-model="options.width" :step="1" controls-position="right" size="small"
            @change="emitUpdate" />
        </div>
        <div class="controls__item">
          <label>Random Gen 0</label>
          <el-checkbox v-model="options.randomize" label="Randomize" border @change="emitUpdate" />
        </div>
      </div>
    </el-menu-item>
    <el-menu-item index="4">
      <span>
        <el-icon>
          <operation />
        </el-icon>
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
import { reactive, defineComponent, ref, watch, computed } from 'vue';
import ColorBlocks from "./ColorBlocks.vue";
import ECAOptionsInterface from '../interfaces/eca-options';
import { Brush, Operation, Tools, InfoFilled, Refresh } from "@element-plus/icons-vue";
import { ElNotification } from 'element-plus'

export default defineComponent({
  name: "PlaygroundSideMenu",
  props: {
    ecaOptions: {
      type: Object as () => ECAOptionsInterface
    },
    isActive: {
      type: Boolean
    },
  },
  components: {
    Brush,
    Operation,
    Tools,
    ColorBlocks,
    InfoFilled,
    ElNotification,
    Refresh,
  },
  emits: [
    "clearCanvas",
    "updateECAOptions",
    "draw"
  ],
  setup(props, { emit }) {

    const isCanvasActive = ref(props.isActive);

    const maxColorStates = 5;
    const blocks = 3;

    const options = reactive({
      zeroColor: props.ecaOptions?.zeroColor,
      oneColor: props.ecaOptions?.oneColor,
      colors: props.ecaOptions?.colors,
      rule: props.ecaOptions?.rule,
      generations: props.ecaOptions?.generations,
      cellSize: props.ecaOptions?.cellSize,
      width: props.ecaOptions?.width,
      randomize: props.ecaOptions?.randomize
    });

    watch(() => props.isActive, (n, o) => {
      isCanvasActive.value = n;
    });

    const clearCanvas = () => {
      emit('clearCanvas');
    };

    const emitUpdate = () => {
      emit('updateECAOptions', options);
    };

    const draw = () => {
      if (options.rule! > parseInt(ruleMax.value)) {
        ElNotification({
          title: 'Warning',
          message: `Rule input can not exceed: ${ruleMax.value}`,
          type: 'warning',
        });
      } else {
        console.log(options);
        emit('draw', 'eca');
      }
    }

    const ruleMax = computed((): string => {
      const rules = (Math.pow(options.colors!.length, (blocks * Math.pow(options.colors!.length, blocks))) - 1);
      const ruleConversion = rules.toString(options.colors!.length);
      const spaces = ruleConversion.length / blocks;
      const slicedRule = ruleConversion.slice(0, spaces);
      const parsed = parseInt(slicedRule, options.colors!.length);
      if (parsed > Number.MAX_SAFE_INTEGER) {
        return Number.MAX_SAFE_INTEGER.toString();
      } else {
        return parsed.toLocaleString('fullwide', { useGrouping: false });
      }
    });

    const generateRandomRule = (): void => {
      const ceil = ruleMax.value;
      const randomNum = Math.floor(Math.random() * parseInt(ceil) + 1);
      options.rule! = randomNum;
    };

    const updateRule = (e: KeyboardEvent): void => {
      switch (e.code) {
        case "ArrowDown":
          (options.rule! -= 1).toString();
          break;
        case "ArrowUp":
          (options.rule! += 1).toString();
          break;
        case "Enter":
          emitUpdate();
          draw();
          break;
        case "KeyO":
          options.randomize = !options.randomize;
          break;
        case "KeyR":
          generateRandomRule();
          break;
        default:
          break;
      }
    }

    return {
      draw,
      options,
      emitUpdate,
      clearCanvas,
      updateRule,
      ruleMax,
      maxColorStates,
      isCanvasActive,
      generateRandomRule,
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

.el-menu-item>span {
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
  width: 100%;
}

.controls__item label {
  color: white;
  text-decoration: underline;
}

.controls__item .el-input-number {
  position: relative;
  top: -7px;
}

.controls__item .el-checkbox {
  width: fit-content;
}
</style>