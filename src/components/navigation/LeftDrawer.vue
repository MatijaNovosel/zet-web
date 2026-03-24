<template>
  <v-btn
    v-if="mobile && !drawer"
    icon="mdi-menu"
    :size="40"
    class="drawer_btn"
    color="#1d232a"
    @click="drawer = !drawer"
  />
  <v-navigation-drawer
    :order="1"
    v-model="drawer"
    mobile
    class="left_drawer"
  >
    <template #prepend>
      <v-list-item
        title="ZET Uživo"
        subtitle="ZET tramvaji i autobusi uživo – interaktivna karta Zagreba u stvarnom vremenu"
        class="text-subtitle-2 py-3"
      >
        <template #prepend>
          <v-progress-circular
            color="blue"
            bg-color="black"
            :model-value="appStore.progress"
            class="mr-5"
          />
        </template>
        <template #append>
          <v-btn
            icon="mdi-close"
            variant="text"
            color="white"
            :size="35"
            @click="drawer = !drawer"
          />
        </template>
      </v-list-item>
    </template>
    <v-divider />
    <filters />
  </v-navigation-drawer>
</template>

<script lang="ts" setup>
import { useAppStore } from "@/store/app";
import { ref } from "vue";
import { useDisplay } from "vuetify";
import Filters from "../filters/Filters.vue";

const appStore = useAppStore();
const { mobile } = useDisplay();

const drawer = ref(false);
</script>

<style lang="scss" scoped>
.drawer_btn {
  position: absolute;
  z-index: 9999;
  top: 12px;
  left: 12px;
}

.left_drawer {
  background-color: #1d232a;
  color: white;
}
</style>
