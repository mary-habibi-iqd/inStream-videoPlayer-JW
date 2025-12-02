(() => {
    window.relevantDigital = window.relevantDigital || {};
    relevantDigital.cmd = relevantDigital.cmd || [];

    relevantDigital.cmd.push(() => {

        relevantDigital.addPrebidConfig({
            consentManagement: {
                cmpApi: 'iab',  // ← Ändere auf 'iab' statt 'static'
                timeout: 5000,   // ← Gib CMP mehr Zeit
                allowAuctionWithoutConsent: false  // ← Warte auf Consent
            },
            debug: true,
            bidderTimeout: 3000  // ← Timeout für Bidder
        });

        const VIDEO_SLOTS = relevantDigital.defineVideoSlots([{
            path: '/183/iqd_videoplayer/videoplayer',
            customParams: { pos: 'pre', tile: '169', kw: 'iqadtile169,mary_testplayer' }
        }]);

        const SLOT_IDS = VIDEO_SLOTS.map(slot => slot.getSlotElementId());

        relevantDigital.loadPrebid({
            configId: '68cc167017459f1b09dec4da',
            manageAdserver: true,
            collapseEmptyDivs: true
        });

        relevantDigital.loadVideoUrls(SLOT_IDS, (urls) => {
            const rawTag = urls?.[0]?.trim() || '';
            console.log("%c Raw tag from Relevant Digital:", "color: #ff9800; font-weight: bold", rawTag || "(empty)");

            let finalTag = rawTag;
            const isNoBid = rawTag.includes('hb_uuid%3Dundefined') && rawTag.includes('hb_cache_id%3Dundefined');

            // if (!rawTag || isNoBid) {
            //     console.log("%cNo Prebid bid detected → Using direct GAM fallback", "color: #f44336; font-weight: bold");
            //     finalTag = `https://pubads.g.doubleclick.net/gampad/ads?iu=/183/iqd_videoplayer/videoplayer&sz=640x360|640x480&gdfp_req=1&output=vast&env=vp&impl=s&unviewed_position_start=1&cust_params=pos%3Dpre%26tile%3D169%26kw%3Diqadtile169%2Cmary_testplayer&url=${encodeURIComponent(location.href)}&description_url=${encodeURIComponent(location.href)}&correlator=${Date.now()}`;
            // } else {
            //     console.log("%cReal Prebid bid won → Using header bidding winner", "color: #4caf50; font-weight: bold");
            // }

            console.log("%cFinal VAST tag sent to JWPlayer:", "color: #00e676; font-weight: bold", finalTag);

            jwplayer("player").setup({
                playlist: [{
                    file: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
                    image: "https://loremflickr.com/640/360"
                }],
                width: "640px",
                height: "360px",
                mute: false,
                advertising: {
                    client: "googima",
                    vpaidMode: "enabled",
                    schedule: {
                        pre: { offset: "pre", tag: finalTag }
                    }
                }
            });

            jwplayer("player")
                .on('adImpression', () => console.log("%cAd Impression → Ad served successfully", "color:  #3d5afe; font-weight: bold"))
                .on('adError', (e) => {
                    console.warn("%cAd Error (code: " + e.code + ")", "color: #ff1744; font-weight: bold", e.message);
                    if ([303, 900, 403, 102].includes(e.code)) {
                        console.log("No ad fill → Starting video playback");
                        jwplayer("player").play();
                    }
                })
                .on('ready', () => console.log("%cJWPlayer ready and loaded", "color: #3d5afe; font-weight: bold"));
        });
    });
})();