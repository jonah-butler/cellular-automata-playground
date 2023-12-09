<template>
  <div>
    <span>
      <el-icon>
        <brush />
      </el-icon>
      <span>States</span>
    </span>
    <div class="controls">

      <div class="cca-menu_color-container" v-for="(_color, i) in colors">
        <el-color-picker v-model="colors[i]" show-alpha />
        <el-icon @click="deleteState(i)" class="cca-menu__delete-icon" :size="11">
          <delete />
        </el-icon>

      </div>
      <!-- add another color -->
      <el-icon @click="addColorState" class="cca_menu__add-state-btn">
        <plus />
      </el-icon>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { Brush, Delete, Plus } from "@element-plus/icons-vue";

const rgbCeil = 255;

const props = defineProps({
  colors: {
    type: Array<string>,
    required: true,
  },
  max: {
    type: Number,
    required: false,
    default: 2,
  },
});

const emit = defineEmits<{
  (e: 'update', value: string[]): void,
}>();

const colors = ref(props.colors);

const deleteState = (i: number): void => {
  colors.value.splice(i, 1);
}

const addColorState = (): void => {
  if (props.colors.length >= props.max) return;
  const r = generateRandomRGBColor(rgbCeil);
  const g = generateRandomRGBColor(rgbCeil);
  const b = generateRandomRGBColor(rgbCeil);
  colors.value.push(`rgba(${r}, ${g}, ${b}, 1)`);
  emit('update', colors.value);
};

const generateRandomRGBColor = (ceil: number): number => {
  return Math.floor(Math.random() * (ceil + 1));
};

</script>

<style scoped></style>