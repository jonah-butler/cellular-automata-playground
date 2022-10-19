<script lang="ts">
import { reactive, ref } from 'vue';
import ECAOptionsInterface from './interfaces/eca-options';
import Header from './components/Header.vue';
import Canvas from './components/Canvas.vue';
import Menu from './components/SideMenu.vue';

export default {
  components: {
    Header,
    Menu,
    Canvas
  },
  setup() {

    let ecaOptions: ECAOptionsInterface = reactive({
      zeroColor: '#000',
      oneColor: '#fff',
      rule: 90,
      generations: 1000,
      cellSize: 1,
      width: 2000,
      randomize: false,
    });

    let canvases = ref<Array<HTMLCanvasElement>>([]);
    const loading = ref(false);
    const ctx = ref<CanvasRenderingContext2D>();

    const updateECAOptions = (updatedOptions: ECAOptionsInterface): void => {
      ecaOptions = updatedOptions;
    };

    const draw = () => {

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
      const options = JSON.stringify(ecaOptions);
      worker.postMessage(
        {
        canvas: offScreen,
        options: options
        },
        [offScreen]
      );

      worker.onmessage = (e: MessageEvent) => {
        if(e.data.status === "completed") {

          loading.value = false;
        }
      };

    }



    // const worker = new Worker(new URL('./ecaworker.ts', import.meta.url));
    // worker.postMessage('hello');
    // worker.onmessage = (e: Event) => {
    //   console.log(e);
    //   console.log('back in app.vue');
    // }

    return {
      ctx,
      draw,
      canvases,
      loading,
      ecaOptions,
      updateECAOptions
    }
  }
}

</script>

<template>
  <Header />
  <el-row class="editor">
    <el-col :span="4">

      <Menu
        @draw="draw"
        :ecaOptions="ecaOptions"
        @updateECAOptions="updateECAOptions"
      />

    </el-col>
    <el-col :span="20" id="viewPort">

      <Canvas :canvases="canvases" ref="canvas" v-loading="loading"/>

    </el-col>
  </el-row>
</template>

<style scoped>
.editor {
  height: calc(100vh - 145px);
}
#viewPort {
  height: 100%;
}
</style>
