<script lang="ts">
import { reactive, ref } from 'vue';
import ECAOptionsInterface from './interfaces/eca-options';
import CAOptionsInterface from './interfaces/ca-options';
import MNOptionsInterface from './interfaces/mn-options';
import Header from './components/Header.vue';
import Canvas from './components/Canvas.vue';
import Menu1 from './components/SideMenu1.vue';
import Menu2 from './components/SideMenu2.vue';
import Menu3 from './components/SideMenu3.vue';

export default {
  components: {
    Header,
    Menu1,
    Menu2,
    Menu3,
    Canvas
  },
  setup() {

    const interval = ref(0);
    const drawer = ref(false);
    const isActive = ref<boolean>(false);

    let ecaOptions: ECAOptionsInterface = reactive({
      zeroColor: '#000',
      oneColor: '#fff',
      rule: 90,
      generations: 1000,
      cellSize: 1,
      width: 2000,
      randomize: false,
    });

    let caOptions: CAOptionsInterface = reactive({
      zeroColor: '#f38443',
      oneColor: '#000',
      generations: 500,
      cellSize: 2,
      width: 500,
      lifeCycles: 100,
    });

    let mnOptions: MNOptionsInterface = reactive({
      zeroColor: '#000',
      oneColor: '#fff',
      generations: 500,
      cellSize: 1,
      width: 750,
      lifeCylces: 10,
    });

    const caType = ref('Elementary Cellular Automata');
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

    const updateCA = (updatedType: string): void => {
      caType.value = updatedType;
    };

    const clearCanvas = (): void => {
      canvases.value.pop();
      document.querySelector('.canvas-container')?.firstElementChild!.remove();
      isActive.value = false;
    };
    
    const saveCanvas = (): void => {
      const canvas = canvases.value[0];
      const link = document.createElement('a');
      link.download = `canvas_${new Date().getTime()}.png`;
      link.href = canvas.toDataURL();
      link.click();
    };

    const openDrawer = () => {
      console.log('hit open drawer');
      drawer.value = true;
    }

    const draw = (emittedType: string): void => {

      if(isActive.value) {
        isActive.value = false;
      }

      let options;

      if(emittedType === 'eca') {
        options = ecaOptions;
      } else if(emittedType === 'ca') {
        options = caOptions;
      } else {
        options = mnOptions;
      }

      loading.value = true;

      if(canvases.value.length) {
        canvases.value.pop();
        document.querySelector('.canvas-container')?.firstElementChild!.remove();
      }
      canvases.value.push(document.createElement('canvas'));
      canvases.value[0].id = 'canvas';
      document.querySelector('.canvas-container')!.appendChild(canvases.value[0]);
      const offScreen = (canvases.value[0] as any).transferControlToOffscreen();
      
      const worker = new Worker(new URL('./workers/ecaworker.ts', import.meta.url));
      const stringifiedOptions = JSON.stringify(options);
      worker.postMessage(
        {
        canvas: offScreen,
        options: stringifiedOptions,
        type: caType.value
        },
        [offScreen]
      );

      worker.onmessage = (e: MessageEvent) => {
        if(e.data.status === "completed") {
          isActive.value = true;
          loading.value = false;
        }
        if(e.data.interval) {
          interval.value = e.data.interval;
        }
      };

    }

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
      isActive,
      openDrawer,
      saveCanvas,
      clearCanvas,
      updateECAOptions,
      updateCAOptions,
      updateMNOptions,
    }
  }
}

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
        v-else
        @draw="draw"
        :mnOptions="mnOptions"
        @clearCanvas="clearCanvas"
        @updateMNOptions="updateMNOptions"
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
          v-else
          @draw="draw"
          :mnOptions="mnOptions"
          @clearCanvas="clearCanvas"
          @updateMNOptions="updateMNOptions"
          :isActive="isActive"
        />
      </el-drawer>

      <Canvas :canvases="canvases" ref="canvas" v-loading="loading"/>

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
