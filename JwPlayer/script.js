jwplayer("player").setup({
    playlist: [{
        file: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        image: "https://via.placeholder.com/640x360"
    }],
    width: "100%",
    height: "360px",
    autostart: false,
    advertising: {
        client: "googima",
        schedule: [
            {
                offset: "pre",
                tag: "https://pubads.g.doubleclick.net/gampad/ads?sz=16x9%7C480x360%7C640x360%7C640x480&iu=/183/iqd_videoplayer/videoplayer&cust_params=pos%3Dpre%26tile%3D1692%26kw%3Diqadtile1692%2Cmary_testplayer%26&pmnd=0&pmxd=32000&pmad=2&pod=2&vpos=preroll&plcmt=1&impl=s&gdfp_req=1&env=vp&output=vast&unviewed_position_start=1&url=__referrer__&description_url=__page-url__&correlator=" + Date.now()
            },
            {
                offset: 5,
                tag: "https://pubads.g.doubleclick.net/gampad/ads?sz=16x9%7C480x360%7C640x360%7C640x480&iu=/183/iqd_videoplayer/videoplayer&cust_params=pos%3Dmid%26tile%3D1692%26kw%3Diqadtile1692%2Cmary_testplayer%26&pmnd=0&pmxd=32000&pmad=2&pod=2&vpos=midroll&plcmt=1&impl=s&gdfp_req=1&env=vp&output=vast&unviewed_position_start=1&url=__referrer__&description_url=__page-url__&correlator=" + Date.now()
            },
            {
                offset: 8,
                tag: "https://pubads.g.doubleclick.net/gampad/ads?sz=16x9%7C480x360%7C640x360%7C640x480&iu=/183/iqd_videoplayer/videoplayer&cust_params=pos%3Dmid%26tile%3D1692%26kw%3Diqadtile1692%2Cmary_testplayer%26&pmnd=0&pmxd=32000&pmad=2&pod=2&vpos=midroll&plcmt=1&impl=s&gdfp_req=1&env=vp&output=vast&unviewed_position_start=1&url=__referrer__&description_url=__page-url__&correlator=" + Date.now()
            }
        ]
    }
});
// Debug für Ad Errors
jwplayer().on('adError', function (event) {
    console.log('Ad Error:', event.message, event.code);
});


//preroll --->.  https://pubads.g.doubleclick.net/gampad/ads?sz=16x9%7C480x360%7C640x360%7C640x480&iu=/183/iqd_videoplayer/videoplayer&cust_params=pos%3Dpre%26tile%3D1692%26kw%3Diqadtile1692%2Cmary_testplayer%26&pmnd=0&pmxd=32000&pmad=2&pod=2&vpos=preroll&plcmt=1&impl=s&gdfp_req=1&env=vp&output=vast&unviewed_position_start=1&url=__referrer__&description_url=__page-url__&correlator=__timestamp__"
//midroll --->.  https://pubads.g.doubleclick.net/gampad/ads?sz=16x9%7C480x360%7C640x360%7C640x480&iu=/183/iqd_videoplayer/videoplayer&cust_params=pos%3Dmid%26tile%3D1692%26kw%3Diqadtile1692%2Cmary_testplayer%26&pmnd=0&pmxd=32000&pmad=2&pod=2&vpos=midroll&plcmt=1&impl=s&gdfp_req=1&env=vp&output=vast&unviewed_position_start=1&url=__referrer__&description_url=__page-url__&correlator=__timestamp__"
//postroll --->.  https://pubads.g.doubleclick.net/gampad/ads?sz=16x9%7C480x360%7C640x360%7C640x480&iu=/183/iqd_videoplayer/videoplayer&cust_params=pos%3Dpost%26tile%3D1692%26kw%3Diqadtile1692%2Cmary_testplayer%26&pmnd=0&pmxd=32000&pmad=2&pod=2&vpos=postroll&plcmt=1&impl=s&gdfp_req=1&env=vp&output=vast&unviewed_position_start=1&url=__referrer__&description_url=__page-url__&correlator=__timestamp__"