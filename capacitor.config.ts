import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.matija.knorkzet",
  appName: "KnorkZET",
  webDir: "dist",
  server: {
    cleartext: true
  }
};

export default config;
