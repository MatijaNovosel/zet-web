<template>
  <div
    class="line_chip"
    :style="style"
  >
    {{ props.text }}
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";

const props = defineProps<{
  active: boolean;
  color: string;
  text: string;
}>();

const style = computed(() => ({
  backgroundColor: props.active ? props.color : "#e3d8d8",
  color: props.active ? "white" : "#8f8181"
}));
</script>

<style lang="scss" scoped>
.line_chip {
  min-width: 30px;
  font-size: 12px;
  border-radius: 8px;
  display: flex;
  padding: 0px 4px;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
</style>
