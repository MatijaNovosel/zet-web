const config = {
    appId: "com.matija.knorkzet",
    appName: "KnorkZET",
    webDir: "dist",
    server: process.env.ENV === "development"
        ? {
            cleartext: true
        }
        : {}
};
export default config;
