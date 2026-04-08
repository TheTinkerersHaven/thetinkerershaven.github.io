<script>
    import Icon from '@iconify/svelte';
    import { onMount } from 'svelte';
    import { fly, blur } from 'svelte/transition';

    let showIntro = $state(false);
    let heroVideoReady = $state(false);
    let showAbout1 = $state(false);
    let showAbout2 = $state(false);
    let showAbout3 = $state(false);
    let showAbout4 = $state(false);

    /** @type {HTMLDivElement | undefined} */
    let panel2El;
    /** @type {HTMLDivElement | undefined} */
    let aboutTileEl1;
    /** @type {HTMLDivElement | undefined} */
    let aboutTileEl2;
    /** @type {HTMLDivElement | undefined} */
    let aboutTileEl3;
    /** @type {HTMLDivElement | undefined} */
    let aboutTileEl4;
    /** @type {HTMLDivElement | undefined} */
    let panel3El;
    /** @type {HTMLDivElement | undefined} */
    let panel4El;
    /** @type {HTMLDivElement | undefined} */
    let panel5El;

    import bgLoopUrl from "$lib/videos/bgloop.mp4";
    import pfpUrl from "$lib/images/pfp.jpg";

    onMount(() => {
        showIntro = true;

        /** @typedef {{ r: number; g: number; b: number }} RgbColor */

        /** @type {IntersectionObserver[]} */
        const observers = [];

        /**
         * @param {HTMLDivElement | undefined} element
         * @param {(visible: boolean) => void} setVisible
         */
        const observeOnce = (element, setVisible) => {
            if (!element) return;

            const observer = new IntersectionObserver(
                (entries) => {
                    if (entries[0]?.isIntersecting) {
                        setVisible(true);
                        observer.disconnect();
                    }
                },
                { threshold: 0.35 }
            );

            observer.observe(element);
            observers.push(observer);
        };

        observeOnce(aboutTileEl1, (visible) => {
            showAbout1 = visible;
        });

        observeOnce(aboutTileEl2, (visible) => {
            showAbout2 = visible;
        });

        observeOnce(aboutTileEl3, (visible) => {
            showAbout3 = visible;
        });

        observeOnce(aboutTileEl4, (visible) => {
            showAbout4 = visible;
        });

        const rootStyle = getComputedStyle(document.documentElement);

        /**
         * @param {string} varName
         * @param {RgbColor} fallback
         * @returns {RgbColor}
         */
        const readColor = (varName, fallback) => {
            const raw = rootStyle.getPropertyValue(varName).trim();
            const [r, g, b] = raw.split(/\s+/).map((value) => Number.parseFloat(value));

            return {
                r: Number.isFinite(r) ? r : fallback.r,
                g: Number.isFinite(g) ? g : fallback.g,
                b: Number.isFinite(b) ? b : fallback.b
            };
        };

        const panel2Color = readColor('--panel-2-rgb', { r: 15, g: 23, b: 42 });
        const panel3Color = readColor('--panel-3-rgb', { r: 100, g: 50, b: 151 });
        const panel4Color = readColor('--panel-4-rgb', { r: 24, g: 138, b: 141 });
        const panel5Color = readColor('--panel-5-rgb', { r: 235, g: 98, b: 63 });

        /** @param {number} a @param {number} b @param {number} t */
        const lerp = (a, b, t) => a + (b - a) * t;
        /** @param {number} value */
        const clamp01 = (value) => Math.max(0, Math.min(1, value));

        /**
         * @param {RgbColor} colorA
         * @param {RgbColor} colorB
         * @param {number} t
         */
        const setBackgroundColor = (colorA, colorB, t) => {
            const ratio = clamp01(t);
            const r = Math.round(lerp(colorA.r, colorB.r, ratio));
            const g = Math.round(lerp(colorA.g, colorB.g, ratio));
            const b = Math.round(lerp(colorA.b, colorB.b, ratio));

            document.documentElement.style.setProperty('--panels-bg-rgb', `${r} ${g} ${b}`);
        };

        const onScroll = () => {
            if (!panel2El || !panel3El || !panel4El || !panel5El) return;

            const scrollY = window.scrollY;
            const y2 = panel2El.offsetTop;
            const y3 = panel3El.offsetTop;
            const y4 = panel4El.offsetTop;
            const y5 = panel5El.offsetTop;

            if (scrollY <= y2) {
                setBackgroundColor(panel2Color, panel2Color, 0);
                return;
            }

            if (scrollY <= y3) {
                const t23 = (scrollY - y2) / Math.max(1, y3 - y2);
                setBackgroundColor(panel2Color, panel3Color, t23);
                return;
            }

            if (scrollY <= y4) {
                const t34 = (scrollY - y3) / Math.max(1, y4 - y3);
                setBackgroundColor(panel3Color, panel4Color, t34);
                return;
            }

            const t45 = (scrollY - y4) / Math.max(1, y5 - y4);
            setBackgroundColor(panel4Color, panel5Color, t45);
        };

        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onScroll);

        return () => {
            observers.forEach((observer) => observer.disconnect());
            window.removeEventListener('scroll', onScroll);
            window.removeEventListener('resize', onScroll);
        };
    });

    function jumpIn() {
        panel2El?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    function backToStart() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function onHeroVideoLoaded() {
        heroVideoReady = true;
    }
</script>

<svelte:head>
    <link rel="preload" as="image" href={pfpUrl} fetchpriority="high">
    <link rel="preload" as="video" href={bgLoopUrl} fetchpriority="high">
    <link rel="preload" as="font" href='https://fonts.googleapis.com/css2?family=Playwrite+IE:wght@100..400&display=swap'>
</svelte:head>

<div class="panel hero">
    {#if showIntro}
        <video class="bg-video" class:video-ready={heroVideoReady} onloadeddata={onHeroVideoLoaded} autoplay muted loop playsinline>
            <source src={bgLoopUrl} type="video/mp4" />
        </video>
    {/if}

    <div class="overlay"></div>

    <div class="center-container">
        <div class="welcome-tile">
            {#if showIntro}
                <h1 in:fly={{ y: 28, duration: 700, delay: 800, opacity: 0 }}>
                    The Tinkerer's Website
                </h1>

                <p in:fly={{ y: 28, duration: 700, delay: 900, opacity: 0 }}>
                    Have a look inside.
                </p>

                <button onclick={jumpIn} in:fly={{ y: 28, duration: 700, delay: 1000, opacity: 0 }}>
                    Jump in
                </button>
            {/if}
        </div>
    </div>
</div>

<div class="panels-23 dots-bg">
    <div class="panel content content-1" bind:this={panel2El}>
        <div class="center-container">
            <div class="content-tile" bind:this={aboutTileEl1}>
                {#if showAbout1}
                    <img in:blur={{ duration: 700, opacity: 0 }} src={pfpUrl}  alt="Profile">
                    <h2 in:fly={{ y: 28, duration: 700, delay: 120, opacity: 0 }}>About myself</h2>
                    <p in:fly={{ y: 28, duration: 700, delay: 240, opacity: 0 }}>
                        Hi! I’m Greg, a CS student with a passion for all things tech. My happy place is a mix of hobbyist electronics and 3D printing—there’s just something satisfying about seeing a project come to life!
                        <br>
                        I’m also a proud furry, a huge fan of Murder Drones, and an amateur photographer. I love exploring the intersection of art and technology, and I'm glad you're here to see what I'm working on.
                    </p>
                {/if}
            </div>
        </div>
    </div>

    <div class="panel content content-2" bind:this={panel3El}>
        <div class="center-container">
            <div class="content-tile" bind:this={aboutTileEl2}>
                {#if showAbout2}
                    <h2 in:fly={{ y: 28, duration: 700, opacity: 0 }}>My projects</h2>
                    <p in:fly={{ y: 28, duration: 700, delay: 120, opacity: 0 }}>
                        The main projects I've made are
                    </p>
                    <ul>
                        <li in:fly={{ y: 28, duration: 700, delay: 240, opacity: 0 }}><a href="https://github.com/TheTinkerersHaven/TerraLevel">TerraLevel</a>, a platformer game made in Godot engine;</li>
                        <li in:fly={{ y: 28, duration: 700, delay: 320, opacity: 0 }}><a href="https://github.com/TheTinkerersHaven/SpinKeys-Hackpad">SpinKeys</a>, a hackpad made for Hack Club Blueprint (WIP);</li>
                        <li in:fly={{ y: 28, duration: 700, delay: 400, opacity: 0 }}><a href="https://github.com/TheTinkerersHaven/CitySim">CitySim</a> (in collaboration with <a href="https://github.com/Fleny113">@Fleny113</a>), a simple TUI-based city simulator;</li>
                        <li in:fly={{ y: 28, duration: 700, delay: 480, opacity: 0 }}><a href="https://github.com/TheTinkerersHaven/RestaurantSimulator26">Restaurant Simulator 26</a> (in collaboration with <a href="https://github.com/Fleny113">@Fleny113</a>), a Java Swing-based GUI restaurant simulator.</li>
                    </ul>
                {/if}
            </div>
        </div>
    </div>

    <div class="panel content content-3" bind:this={panel4El}>
        <div class="center-container">
            <div class="content-tile" bind:this={aboutTileEl3}>
                {#if showAbout3}
                    <h2 in:fly={{ y: 28, duration: 700, opacity: 0 }}>My hobbies</h2>
                    <p in:fly={{ y: 28, duration: 700, delay: 120, opacity: 0 }}>
                        I’m someone who just loves to build things and learn how they work.
                        <br>
                        My hobbies are a mix of photography, gaming, and 3D printing (check out <a href="https://www.youtube.com/watch?v=1wVxR89_HFU">this SpeedBenchy</a> for a taste of what I do!).
                        <br>
                        I'm also big into the DIY electronics scene; I've spent a lot of time with Arduinos and recently leveled up by getting my first custom PCBs made.
                        <br>
                        Music is my other big escape :) I'm an audiophile at heart with a soft spot for <a href="https://music.youtube.com/channel/UC6TsngDAS3kvU5cOyO3-hoA">Drum & Bass</a> and <a href="https://music.youtube.com/channel/UCKWDG-fRUd4QRuJ4wV5Z49A">furry-made</a> tracks (whichever genre they are...).
                    </p>
                {/if}
            </div>
        </div>
    </div>

    <div class="panel content content-4" bind:this={panel5El}>
        <div class="center-container">
            <div class="content-tile" bind:this={aboutTileEl4}>
                {#if showAbout4}
                    <h2 in:fly={{ y: 28, duration: 700, opacity: 0 }}>Find me online</h2>
                    <p in:fly={{ y: 28, duration: 700, delay: 120, opacity: 0 }}>
                        Reach out or follow my work on these platforms.
                    </p>
                    <ul class="social-list">
                        <li in:fly={{ y: 28, duration: 700, delay: 220, opacity: 0 }}>
                            <a class="social-link" href="https://github.com/TheTinkerersHaven" target="_blank" rel="noopener noreferrer">
                                <Icon icon="simple-icons:github" class="social-icon" width="20" height="20" aria-hidden="true" />
                                GitHub
                            </a>
                        </li>
                        <li in:fly={{ y: 28, duration: 700, delay: 300, opacity: 0 }}>
                            <a class="social-link" href="https://www.youtube.com/@tinkerershaven" target="_blank" rel="noopener noreferrer">
                                <Icon icon="simple-icons:youtube" class="social-icon" width="20" height="20" aria-hidden="true" />
                                YouTube
                            </a>
                        </li>
                    </ul>
                {/if}
            </div>
        </div>
    </div>
</div>

<footer class="site-footer">
    <p>
        Made with ♥️ by <a style="color: deepskyblue" href="https://github.com/TheTinkerersHaven">TheTinkerersHaven</a> with <a href="https://svelte.dev/">Svelte</a> and (lots of) help from Copilot. 
    </p>
    <button class="back-to-start" onclick={backToStart}>Back to start</button>
</footer>