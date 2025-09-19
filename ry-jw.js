(() => {
    window.relevantDigital = window.relevantDigital || {};
    relevantDigital.cmd = relevantDigital.cmd || [];
    relevantDigital.cmd.push(() => {
        relevantDigital.addPrebidConfig({ consentManagement: { cmpApi: 'none' } });

        /** Define "video slots", the concept is similar to using <div data-ad-unit-id="??"> or calling
         * googletag.pubads().defineSlot([path], ..) manually - except that they doesn't correspond to any <div>.
         * But the ids (obtained by getSlotElementId()) can be used e.g. as the allowedDivIds parameter to loadPrebid
        */
        const PRE_ROLL_ID = relevantDigital.defineVideoSlots([
            {
                path: "https://pubads.g.doubleclick.net/gampad/ads?sz=16x9%7C480x360%7C640x360%7C640x480&iu=/183/iqd_videoplayer/videoplayer&cust_params=pos%3Dpre%26tile%3D169%26kw%3Diqadtile169%2Cmary_testplayer&pmnd=0&pmxd=32000&pmad=2&pod=2&vpos=preroll&plcmt=1&impl=s&gdfp_req=1&env=vp&output=vast&unviewed_position_start=1&url=__referrer__&description_url=__page-url__&correlator=" + Date.now()
            }
        ]).map((s) => s.getSlotElementId())[0];

        const MID_ROLL_IDS = relevantDigital.defineVideoSlots([
            {
                path: "https://pubads.g.doubleclick.net/gampad/ads?sz=16x9%7C480x360%7C640x360%7C640x480&iu=/183/iqd_videoplayer/videoplayer&cust_params=pos%3Dmid%26tile%3D169%26kw%3Diqadtile169%2Cmary_testplayer&pmnd=0&pmxd=32000&pmad=2&pod=2&vpos=midroll&plcmt=1&impl=s&gdfp_req=1&env=vp&output=vast&unviewed_position_start=1&url=__referrer__&description_url=__page-url__&correlator=" + Date.now()
            },
            {
                path: "https://pubads.g.doubleclick.net/gampad/ads?sz=16x9%7C480x360%7C640x360%7C640x480&iu=/183/iqd_videoplayer/videoplayer&cust_params=pos%3Dmid%26tile%3D169%26kw%3Diqadtile169%2Cmary_testplayer&pmnd=0&pmxd=32000&pmad=2&pod=2&vpos=midroll&plcmt=1&impl=s&gdfp_req=1&env=vp&output=vast&unviewed_position_start=1&url=__referrer__&description_url=__page-url__&correlator=" + Date.now()
            }
        ]).map((s) => s.getSlotElementId());

        // لود Prebid
        relevantDigital.loadPrebid({
            configId: '68cc167017459f1b09dec4da',
            manageAdserver: true,
            collapseEmptyDivs: true,
            collapseBeforeAdFetch: false,
            // allowedDivIds: [PRE_ROLL_ID, ...MID_ROLL_IDS], 
            noSlotReload: false
        });

        relevantDigital.loadVideoUrls([PRE_ROLL_ID, ...MID_ROLL_IDS], (urls) => {
            jwplayer("player").setup({
                playlist: [{
                    file: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
                    image: "https://via.placeholder.com/640x360"
                }],
                width: "640px",
                height: "360px",
                autostart: false,
                advertising: {
                    client: "googima",
                    schedule: [
                        {
                            offset: "pre",
                            tag: urls[0]
                        },
                        {
                            offset: 5,
                            tag: urls[1]
                        },
                        {
                            offset: 8,
                            tag: urls[2]
                        }
                    ]
                }
            });

            jwplayer().on('adError', function (event) {
                console.log('Ad Error:', event.message, event.code);
            });
        });
    });
})();
