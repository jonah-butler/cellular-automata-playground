<template>
  <div ref="canvasContainer" class="canvas-container">
  </div>
</template>

<script lang="ts">
import { ref, onMounted } from 'vue';
import { setupDraggableContainer } from "../services/drag";

export default {
  name: "PlaygroundCanvas",
  props: ['canvases'],
  setup(props) {

    const canvasContainer = ref<HTMLDivElement>();

    onMounted(() => {
      setupDraggableContainer(canvasContainer.value!);
    })

    return {
      canvasContainer
    };
  }
}
</script>

<style scoped>
.canvas-container {
  height: 100%;
  width: 100%;
  background: #383838;
  position: relative;
  -ms-overflow-style: none;
  scrollbar-width: none;
  cursor: grab;
  overflow: auto;
}
.canvas-container > #canvas {
  background: #242424;
  /* width: 100% !important;
  height: 100% !important; */
}
</style>