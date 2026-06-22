// @ts-check
import { defineConfig, fontProviders } from "astro/config";
import icon from "astro-icon";
import { readFileSync, writeFileSync, readdirSync, statSync } from "node:fs";
import { extname, resolve } from "node:path";

import compress from "astro-compress";

function findHtmlFiles(dir: string): string[] {
    const results: string[] = [];
    for (const entry of readdirSync(dir)) {
        const full = resolve(dir, entry);
        if (statSync(full).isDirectory()) {
            results.push(...findHtmlFiles(full));
        } else if (extname(full) === ".html") {
            results.push(full);
        }
    }
    return results;
}

function stripCheckmarkComments() {
    return {
        name: "strip-checkmark-comments",
        hooks: {
            "astro:build:done": ({ dir }: { dir: URL }) => {
                const files = findHtmlFiles(dir.pathname);
                for (const path of files) {
                    let html = readFileSync(path, "utf-8");
                    const before = html.length;
                    html = html.replace(/<!--[\s\S]*?✅[\s\S]*?-->/g, "");
                    html = html.replace(/\/\/\s*✅.*$/gm, "");
                    html = html.replace(/\/\*[\s\S]*?✅[\s\S]*?\*\//g, "");
                    html = html.replace(/^\s*✅.*$/gm, "");
                    if (html.length !== before) {
                        writeFileSync(path, html, "utf-8");
                    }
                }
            },
        },
    };
}

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
        stripCheckmarkComments(),
        compress({Image: false})],
});