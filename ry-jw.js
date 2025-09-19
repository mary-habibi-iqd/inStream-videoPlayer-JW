(() => {
    window.relevantDigital = window.relevantDigital || {};
    relevantDigital.cmd = relevantDigital.cmd || [];
    relevantDigital.cmd.push(() => {
        relevantDigital.addPrebidConfig({ consentManagement: { cmpApi: 'none' } });

        const PRE_ROLL_ID = relevantDigital.defineVideoSlots([
            {

                path: "/183/iqd_videoplayer/videoplayer"
            }
        ]).map((s) => s.getSlotElementId())[0];

        relevantDigital.loadPrebid({
            configId: '68cc167017459f1b09dec4da',
            manageAdserver: true,
            collapseEmptyDivs: true,
            collapseBeforeAdFetch: false,
            // allowedDivIds: [PRE_ROLL_ID, ...MID_ROLL_IDS], 
            noSlotReload: false
        });

        relevantDigital.loadVideoUrls([PRE_ROLL_ID], (urls) => {
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
