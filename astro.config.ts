import { defineConfig, fontProviders } from "astro/config";
import icon from "astro-icon";

// https://astro.build/config
export default defineConfig({
    fonts: [
        {
            provider: fontProviders.fontsource(),
            name: "Silkscreen",
            cssVariable: "--font-title",
        },
        {
            provider: fontProviders.fontsource(),
            name: "Roboto Mono",
            cssVariable: "--font-paragraph",
        },
        {
            provider: fontProviders.fontsource(),
            name: "Playwrite IE",
            cssVariable: "--font-heading",
        },
    ],
    server: {
        host: true,
        allowedHosts: ["prodesk"],
    },
    integrations: [icon()],
    build: {
        // Allow CSS inlining even after the vite default 4KB limit
        inlineStylesheets: "always",
    },
});
