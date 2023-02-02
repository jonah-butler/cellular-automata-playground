<script lang="ts">
import { reactive, ref } from "vue";
import ECAOptionsInterface from "./interfaces/eca-options";
import CAOptionsInterface from "./interfaces/ca-options";
import MNOptionsInterface from "./interfaces/mn-options";
import DWOptions from "./interfaces/dw-options";
import Header from "./components/Header.vue";
import Canvas from "./components/Canvas.vue";
import Menu1 from "./components/SideMenu1.vue";
import Menu2 from "./components/SideMenu2.vue";
import Menu3 from "./components/SideMenu3.vue";
import Menu4 from "./components/SideMenu4.vue";

export default {
  components: {
    Header,
    Menu1,
    Menu2,
    Menu3,
    Menu4,
    Canvas,
  },
  setup() {
    const isMobile = ref(false);

    if (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      )
    ) {
      isMobile.value = true;
    }

    const interval = ref(0);
    const drawer = ref(false);
    const isActive = ref<boolean>(false);

    let ecaOptions: ECAOptionsInterface = reactive({
      zeroColor: "#000",
      oneColor: "#fff",
      rule: 90,
      generations: 1000,
      cellSize: 1,
      width: 2000,
      randomize: false,
    });

    let caOptions: CAOptionsInterface = reactive({
      zeroColor: "#f38443",
      oneColor: "#000",
      generations: 500,
      cellSize: 2,
      width: 500,
      lifeCycles: 100,
    });

    let mnOptions: MNOptionsInterface = reactive({
      zeroColor: "#000",
      oneColor: "#fff",
      generations: 500,
      cellSize: 1,
      width: 750,
      lifeCylces: 10,
    });

    let dwOptions: DWOptions = {
      cellSize: 3,
      deadColor: "#181818",
      livingColor: "#fff",
      width: 500,
      generations: 500,
      drunkards: 10,
      steps: 1000,
    };

    const caType = ref("Elementary Cellular Automata");
    const caTypes = [
      {
        name: "Elementary Cellular Automata",
      },
      {
        name: "Cellular Automata",
      },
      {
        name: "Moore's Neighborhood",
      },
      {
        name: "Drunkard's Walk",
      },
    ];

    let canvases = ref<Array<HTMLCanvasElement>>([]);
    const loading = ref(false);
    const ctx = ref<CanvasRenderingContext2D>();

    const updateECAOptions = (updatedOptions: ECAOptionsInterface): void => {
      ecaOptions = updatedOptions;
    };

    const updateCAOptions = (updatedOptions: CAOptionsInterface): void => {
      caOptions = updatedOptions;
    };

    const updateMNOptions = (updatedOptions: MNOptionsInterface): void => {
      mnOptions = updatedOptions;
    };

    const updateDWOptions = (updatedOptions: DWOptions): void => {
      dwOptions = updatedOptions;
    };

    const updateCA = (updatedType: string): void => {
      caType.value = updatedType;
    };

    const clearCanvas = (): void => {
      canvases.value.pop();
      document.querySelector(".canvas-container")?.firstElementChild!.remove();
      isActive.value = false;
    };

    const saveCanvas = (): void => {
      const canvas = canvases.value[0];
      const link = document.createElement("a");
      link.download = `canvas_${new Date().getTime()}.png`;
      link.href = canvas.toDataURL();
      link.click();
    };

    const openDrawer = () => {
      console.log("hit open drawer");
      drawer.value = true;
    };

    const draw = (emittedType: string): void => {
      if (isActive.value) {
        isActive.value = false;
      }

      let options;

      if (emittedType === "eca") {
        options = ecaOptions;
      } else if (emittedType === "ca") {
        options = caOptions;
      } else if (emittedType === "mn") {
        options = mnOptions;
      } else {
        options = dwOptions;
      }

      // const options = dwOptions;
      // caType.value = "Drunkard's Walk";

      loading.value = true;

      if (canvases.value.length) {
        canvases.value.pop();
        document
          .querySelector(".canvas-container")
          ?.firstElementChild!.remove();
      }
      canvases.value.push(document.createElement("canvas"));
      canvases.value[0].id = "canvas";
      document
        .querySelector(".canvas-container")!
        .appendChild(canvases.value[0]);
      const offScreen = (canvases.value[0] as any).transferControlToOffscreen();

      const worker = new Worker(
        new URL("./workers/ecaworker.ts", import.meta.url)
      );
      const stringifiedOptions = JSON.stringify(options);
      console.log(stringifiedOptions);
      worker.postMessage(
        {
          canvas: offScreen,
          options: stringifiedOptions,
          type: caType.value,
        },
        [offScreen]
      );

      worker.onmessage = (e: MessageEvent) => {
        if (e.data.status === "completed") {
          isActive.value = true;
          loading.value = false;
        }
        if (e.data.interval) {
          interval.value = e.data.interval;
        }
      };
    };

    return {
      ctx,
      draw,
      drawer,
      caType,
      caTypes,
      canvases,
      loading,
      updateCA,
      ecaOptions,
      caOptions,
      mnOptions,
      dwOptions,
      isActive,
      isMobile,
      openDrawer,
      saveCanvas,
      clearCanvas,
      updateECAOptions,
      updateCAOptions,
      updateMNOptions,
      updateDWOptions,
    };
  },
};
</script>

<template>
  <Header
    @updateCAType="updateCA"
    @saveCanvas="saveCanvas"
    @openDrawer="openDrawer"
    :types="caTypes"
    :selectedType="caType"
    :isActive="isActive"
  />

  <el-row class="editor">
    <el-col :span="4" class="hidden-sm-and-down">
      <Menu1
        v-if="caType === 'Elementary Cellular Automata'"
        @draw="draw"
        :ecaOptions="ecaOptions"
        @updateECAOptions="updateECAOptions"
        @clearCanvas="clearCanvas"
        :isActive="isActive"
      />

      <Menu2
        v-else-if="caType === 'Cellular Automata'"
        @draw="draw"
        :caOptions="caOptions"
        @updateCAOptions="updateCAOptions"
        @clearCanvas="clearCanvas"
        :isActive="isActive"
      />

      <Menu3
        v-else-if="caType === 'Moore\'s Neighborhood'"
        @draw="draw"
        :mnOptions="mnOptions"
        @clearCanvas="clearCanvas"
        @updateMNOptions="updateMNOptions"
        :isActive="isActive"
      />
      <Menu4
        v-else
        @draw="draw"
        :dwOptions="dwOptions"
        @clearCanvas="clearCanvas"
        @updateDWOptions="updateDWOptions"
        :isActive="isActive"
      />
    </el-col>
    <el-col :sm="24" :md="20" :lg="20" :xl="20" id="viewPort">
      <el-drawer
        v-model="drawer"
        title="Cellular Automata Options"
        direction="rtl"
      >
        <Menu1
          v-if="caType === 'Elementary Cellular Automata'"
          @draw="draw"
          :ecaOptions="ecaOptions"
          @updateECAOptions="updateECAOptions"
          @clearCanvas="clearCanvas"
          :isActive="isActive"
        />

        <Menu2
          v-else-if="caType === 'Cellular Automata'"
          @draw="draw"
          :caOptions="caOptions"
          @updateCAOptions="updateCAOptions"
          @clearCanvas="clearCanvas"
          :isActive="isActive"
        />

        <Menu3
          v-else-if="caType === 'Moore\'s Neighborhood'"
          @draw="draw"
          :mnOptions="mnOptions"
          @clearCanvas="clearCanvas"
          @updateMNOptions="updateMNOptions"
          :isActive="isActive"
        />
        <Menu4
          v-else
          @draw="draw"
          :dwOptions="dwOptions"
          @clearCanvas="clearCanvas"
          @updateDWOptions="updateDWOptions"
          :isActive="isActive"
        />
      </el-drawer>

      <Canvas
        v-if="!isMobile"
        :canvases="canvases"
        ref="canvas"
        v-loading="loading"
      />
      <h2 v-else>
        :( Sorry, this app uses Web Worker technology, and that is not available
        on your current device
      </h2>
    </el-col>
  </el-row>
</template>

<style>
.editor {
  height: calc(100vh - 145px);
}
#viewPort {
  height: 100%;
}
.el-drawer.rtl {
  width: 70% !important;
}
</style>
