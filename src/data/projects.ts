export interface Project {
    link: string;
    name: string;
    madeWith: string;
    madeFor: string;
    madeForLink?: string;
    wide?: boolean;
    description: string;
}

export const techColors: Record<string, string> = {
    Astro: "#ff5d01",
    "Expo (React Native)": "#06d1f2",
    Expo: "#06d1f2",
    Godot: "#5a9fd0",
    KiCad: "#3dd4c0",
    Vial: "#c084fc",
    "C++": "#6aafff",
    Java: "#ff9724",
    Rust: "#f74c00",
    Flutter: "#42a5f5",
};

export const projects: Project[] = [
    {
        link: "https://github.com/TheTinkerersHaven/minichat",
        name: "MiniChat",
        madeWith: "Flutter",
        madeFor: "PoliCollege",
        madeForLink: "https://www.policollege.polimi.it",
        wide: true,
        description:
            "A Flutter chat client for LLMs with OpenAI-compatible APIs, featuring local speech recognition via Whisper.",
    },
    {
        link: "https://github.com/TheTinkerersHaven/thetinkerershaven.github.io",
        name: "thetinkerershaven.github.io",
        madeWith: "Astro",
        madeFor: "Myself",
        wide: true,
        description: "This exact website! First written in Svelte, and then remade into what it is now.",
    },
    {
        link: "https://github.com/PlanckTeam/planckteam.github.io",
        name: "planckteam.github.io",
        madeWith: "Astro",
        madeFor: "Planck Team",
        madeForLink: "https://planckteam.github.io",
        description: "Website for Planck Team (FIRST Lego League &amp; FIRST Tech Challenge)",
    },
    {
        link: "https://github.com/PlanckTeam/Space4Arch",
        name: "Space4Arch",
        madeWith: "Expo (React Native)",
        madeFor: "Planck Team",
        madeForLink: "https://planckteam.github.io",
        description:
            'Archeology app, innovation project for Planck Team (FIRST Lego League 2025-2026) (in collaboration with <span class="tooltip"><a href="https://github.com/Fleny113">@Fleny113</a><span class="tooltiptext">cool guy</span></span>)',
    },
    {
        link: "https://github.com/TheTinkerersHaven/RestaurantSimulator26",
        name: "Restaurant Simulator 26",
        madeWith: "Java",
        madeFor: "School",
        madeForLink: "https://maxplanck.edu.it",
        description:
            'Java Swing-based GUI restaurant simulator (in collaboration with <span class="tooltip"><a href="https://github.com/Fleny113">@Fleny113</a><span class="tooltiptext">did i already tell you he\'s a cool guy?</span></span>)',
    },
    {
        link: "https://github.com/TheTinkerersHaven/SpinKeys-Hackpad",
        name: "SpinKeys",
        madeWith: "KiCad & Vial",
        madeFor: "Hack Club Blueprint",
        madeForLink: "https://hackclub.com",
        description: "5-key hackpad with two dials made for Hack Club Blueprint.",
    },
    {
        link: "https://github.com/TheTinkerersHaven/TerraLevel",
        name: "TerraLevel",
        madeWith: "Godot",
        madeFor: "Hack Club Daydream",
        madeForLink: "https://hackclub.com",
        description: "Platformer tower-climb game made for Hack Club Daydream.",
    },
    {
        link: "https://github.com/TheTinkerersHaven/CitySim",
        name: "CitySim",
        madeWith: "C++",
        madeFor: "School",
        madeForLink: "https://maxplanck.edu.it",
        description:
            'Simple TUI-based city simulator (in collaboration with <span class="tooltip"><a href="https://github.com/Fleny113">@Fleny113</a><span class="tooltiptext">cool guy pt.2</span></span>)',
    },
    {
        link: "https://github.com/TheTinkerersHaven/Encodechet",
        name: "Encodechet",
        madeWith: "Rust",
        madeFor: "Myself",
        description:
            'A useless encoder/decoder for text files in the custom .edch format, now rewritten in Rust! (in collaboration with <span class="tooltip"><a href="https://github.com/Fleny113">@Fleny113</a><span class="tooltiptext">co-wrote the original Python version</span></span>)',
    },
];
