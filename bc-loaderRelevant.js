(() => {
    window.relevantDigital = window.relevantDigital || {};
    relevantDigital.cmd = relevantDigital.cmd || [];

    relevantDigital.cmd.push(() => {
        relevantDigital.addPrebidConfig({ consentManagement: { cmpApi: 'none' } });

        const VIDEO_SLOTS = relevantDigital.defineVideoSlots([
            {
                path: '/183/iqd_videoplayer/videoplayer',
                customParams: { pos: 'pre', tile: '169', kw: 'iqadtile169,mary_testplayer' }
            }
        ]);
        console.log("VIDEO_SLOTS defined:", VIDEO_SLOTS);

        const SLOT_IDS = VIDEO_SLOTS.map(s => s.getSlotElementId());
        console.log("SLOT_IDS defined:", SLOT_IDS);

        relevantDigital.loadPrebid({
            configId: '68cc167017459f1b09dec4da',
            manageAdserver: true,
            collapseEmptyDivs: true,
            collapseBeforeAdFetch: false,
            noSlotReload: false
        });

        relevantDigital.loadVideoUrls(SLOT_IDS, (urls) => {
            const prebidAdTag = urls[0];
            console.log("RY Ad Tag:", prebidAdTag);
            // Check if we have a valid ad URL

            if (!prebidAdTag) {
                console.warn("No pre-roll ad URL received");
            }
            const directGamTag = `https://pubads.g.doubleclick.net/gampad/ads?` +
                `sz=640x360|480x360|640x480|400x300|300x250` +
                `&iu=/183/iqd_videoplayer/videoplayer` +
                `&impl=s&gdfp_req=1&env=vp&output=vast&unviewed_position_start=1` +
                `&cust_params=pos%3Dpre%26tile%3D169%26kw%3Diqadtile169%2Cmary_testplayer` +
                `&url=${encodeURIComponent(window.location.href)}` +
                `&description_url=${encodeURIComponent(window.location.href)}` +
                `&correlator=${Date.now()}`;
            console.log("Direct GAM Tag:", directGamTag);

            const finalAdTag = prebidAdTag || directGamTag;
            console.log("Final Ad Tag Used:", finalAdTag);
            const myPlayer = videojs.getPlayer("brightcove-player");
            myPlayer.ready(function () {
                this.src("https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4");
                myPlayer.ima3({
                    debug: true,
                    requestMode: "onplay",

                    serverUrl: directGamTag
                })
            });
        });
    });
})();