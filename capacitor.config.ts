import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.matija.knorkzet",
  appName: "KnorkZET",
  webDir: "dist",
  server:
    process.env.ENV === "development"
      ? {
          cleartext: true
        }
      : {}
};

export default config;
