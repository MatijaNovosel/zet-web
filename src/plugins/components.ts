import { DatePicker } from "vue-3-material-date-picker";
import "vue-3-material-date-picker/dist/style.css";

export default {
  install: (app: any) => {
    app.component("m-date-picker", DatePicker);
  }
};
