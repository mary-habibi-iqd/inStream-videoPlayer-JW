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

        const SLOT_IDS = VIDEO_SLOTS.map(s => s.getSlotElementId());

        relevantDigital.loadPrebid({
            configId: '68cc167017459f1b09dec4da',
            manageAdserver: true,
            collapseEmptyDivs: true
        });

        relevantDigital.loadVideoUrls(SLOT_IDS, (urls) => {
            const prebidAdTag = urls[0];
            console.log("Prebid Ad Tag:", prebidAdTag);

            const directGamTag = `https://pubads.g.doubleclick.net/gampad/ads?` +
                `sz=640x360|480x360|640x480|400x300|300x250` +
                `&iu=/183/iqd_videoplayer/videoplayer` +
                `&impl=s&gdfp_req=1&env=vp&output=vast&unviewed_position_start=1` +
                `&cust_params=pos%3Dpre%26tile%3D169%26kw%3Diqadtile169%2Cmary_testplayer` +
                `&url=${encodeURIComponent(window.location.href)}` +
                `&description_url=${encodeURIComponent(window.location.href)}` +
                `&correlator=${Date.now()}`;

            const finalAdTag = prebidAdTag || directGamTag;
            console.log("Final Ad Tag Used:", finalAdTag);

            videojs('brightcove-player').ready(function () {
                this.src("https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4");
            });
        });
    });
})();