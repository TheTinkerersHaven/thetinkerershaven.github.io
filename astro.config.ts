import { defineConfig, fontProviders } from "astro/config";
import compress from "astro-compress";
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
    integrations: [
        icon(),
        compress({
            // Leave the image optimization to astro
            Image: false,
            // Leave the CSS optimization to vite
            CSS: false,
        }),
    ],
    build: {
        // Allow CSS inlining even after the vite default 4KB limit
        inlineStylesheets: "always",
    },
});
