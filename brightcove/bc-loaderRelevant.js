(function () {
    window.relevantDigital = window.relevantDigital || {};
    relevantDigital.cmd = relevantDigital.cmd || [];

    relevantDigital.cmd.push(function () {
        relevantDigital.addPrebidConfig({
            consentManagement: { cmpApi: 'none' }
        });

        const VIDEO_SLOTS = relevantDigital.defineVideoSlots([{
            path: '/183/iqd_videoplayer/videoplayer',
            customParams: { pos: 'pre', tile: '169', kw: 'iqadtile169,mary_testplayer' }
        }]);

        const SLOT_IDS = VIDEO_SLOTS.map(s => s.getSlotElementId());

        relevantDigital.loadPrebid({
            configId: '68cc167017459f1b09dec4da',
            manageAdserver: true,
            collapseEmptyDivs: true
        });

        relevantDigital.loadVideoUrls(SLOT_IDS, function (urls) {

            const tagFromRelevant = urls?.[0]?.trim() || '';
            console.log("%c[1] Tag from Relevant Digital:", "color: #ff9800; font-weight: bold", tagFromRelevant || "(empty)");

            let finalTag = tagFromRelevant;
            const isNoBid = tagFromRelevant.includes('hb_uuid%3Dundefined') && tagFromRelevant.includes('hb_cache_id%3Dundefined');

            if (!tagFromRelevant || isNoBid) {
                console.log("%c[2] No bid detected → Using direct GAM fallback", "color: #f44336; font-weight: bold");
                finalTag = `https://pubads.g.doubleclick.net/gampad/ads?iu=/183/iqd_videoplayer/videoplayer&sz=640x360|640x480&gdfp_req=1&output=vast&env=vp&impl=s&unviewed_position_start=1&cust_params=pos%3Dpre%26tile%3D169%26kw%3Diqadtile169%2Cmary_testplayer&url=${encodeURIComponent(location.href)}&description_url=${encodeURIComponent(location.href)}&correlator=${Date.now()}`;
            } else {
                console.log("%c[2] Real Prebid bid won → Using header bidding winner", "color: #4caf50; font-weight: bold");
            }
            console.log("%c[3] Final VAST tag sent to Brightcove:", "color: #2196f3; font-weight: bold", finalTag);


            // ---- WAIT FOR BRIGHTCOVE PLAYER ----
            const checkPlayer = setInterval(() => {
                const players = videojs.getPlayers();
                const player = Object.values(players)[0];
                console.log("Player:", player);
                if (!player) return;

                clearInterval(checkPlayer);

                player.ready(function () {
                    player.src("https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4");

                    player.ima3({
                        requestMode: "onplay",
                        debug: true,
                        serverUrl: finalTag,
                        maxRedirects: 8,
                        timeout: 5000,
                    });
                });
            }, 200);
        });
    });
})();
