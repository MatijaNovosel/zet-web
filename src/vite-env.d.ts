import { DatePicker } from "vue-3-material-date-picker";

declare module "*.vue" {
  import type { DefineComponent } from "vue";
  const component: DefineComponent<Record<string, unknown>, Record<string, unknown>, any>;
  export default component;
}

declare module "@vue/runtime-core" {
  export interface GlobalComponents {
    MDatePicker: typeof DatePicker;
  }
}
