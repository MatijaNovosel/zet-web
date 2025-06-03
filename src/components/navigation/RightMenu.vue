<template>
  <div class="right_menu elevation-2">
    <div class="right_menu_toolbar">
      <div class="right_menu_toolbar_text">
        <div class="right_menu_toolbar_text_title">
          {{ appStore.activeStop?.stopName }}
        </div>
        <div class="right_menu_toolbar_text_subtitle">
          {{ appStore.activeStop?.stopId }}
        </div>
      </div>
      <v-btn
        icon="mdi-close"
        variant="text"
        size="40px"
        color="black"
        @click="closeMenu"
      />
    </div>
    <v-divider />
  </div>
</template>

<script lang="ts" setup>
import { useAppStore } from "@/store/app";

const appStore = useAppStore();

const closeMenu = () => {
  appStore.setActiveStop(null);
};
</script>

<style lang="scss" scoped>
.right_menu {
  position: absolute;
  background-color: white;
  z-index: 999;
  top: 25px;
  right: 25px;
  width: 300px;
  border-radius: 8px;
  max-height: calc(100% - 50px);

  &_toolbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5px 15px 5px 15px;

    &_text {
      &_title {
        font-size: 14px;
        font-weight: bold;
      }

      &_subtitle {
        font-size: 12px;
        color: #3b3838be;
      }
    }
  }
}
</style>
