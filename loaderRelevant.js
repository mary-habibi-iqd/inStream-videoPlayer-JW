(() => {
    window.relevantDigital = window.relevantDigital || {};
    relevantDigital.cmd = relevantDigital.cmd || [];

    relevantDigital.cmd.push(() => {
        relevantDigital.addPrebidConfig({ consentManagement: { cmpApi: 'none' } });

        const PRE_ROLL_SLOTS = relevantDigital.defineVideoSlots([
            {
                path: '/183/iqd_videoplayer/videoplayer',
                customParams: { pos: 'pre', tile: '169', kw: 'iqadtile169,mary_testplayer' }
            }
        ]);
        console.log("Pre-Roll Slots defined:", PRE_ROLL_SLOTS);

        const PRE_ROLL_IDS = PRE_ROLL_SLOTS.map(s => s.getSlotElementId());
        console.log("Pre-Roll Slot IDs:", PRE_ROLL_IDS);

        relevantDigital.loadPrebid({
            configId: '68cc167017459f1b09dec4da',
            manageAdserver: true,
            collapseEmptyDivs: true,
            collapseBeforeAdFetch: false,
            noSlotReload: false
        });

        relevantDigital.loadVideoUrls(PRE_ROLL_IDS, (urls) => {
            console.log("Pre-Roll Ad Tag URL received:", urls[0]);

            // Check if we have a valid ad URL
            if (!urls[0]) {
                console.warn("⚠️ No pre-roll ad URL received");
            }
            const directGamTag = `https://pubads.g.doubleclick.net/gampad/ads?` +
                `sz=640x360|480x360|640x480|400x300|300x250` +
                `&iu=/183/iqd_videoplayer/videoplayer` +
                `&impl=s` +
                `&gdfp_req=1` +
                `&env=vp` +
                `&output=vast` +
                `&unviewed_position_start=1` +
                `&cust_params=pos%3Dpre%26tile%3D169%26kw%3Diqadtile169%2Cmary_testplayer` +
                `&url=${encodeURIComponent(window.location.href)}` +
                `&description_url=${encodeURIComponent(window.location.href)}` +
                `&correlator=${Date.now()}`;
            console.log("Direct GAM Tag:", directGamTag);

            jwplayer("player").setup({
                playlist: [{
                    file: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
                    image: "https://loremflickr.com/640/360"
                }],
                width: "640px",
                height: "360px",
                autostart: false,
                mute: false,
                advertising: {
                    client: "googima",
                    schedule: [
                        {
                            offset: "pre",
                            tag: urls[0]
                        }
                    ]
                }
            });

            jwplayer("player").on('adError', (event) => {
                console.log('Ad Error:', event.message, event.code);
            });
        });
    });
})();
