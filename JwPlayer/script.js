jwplayer("player").setup({
    playlist: [{
        file: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        image: "https://via.placeholder.com/640x360"
    }],
    width: "100%",
    height: "360px",
    autostart: false,
    mute: true,
    advertising: {
        client: "vast",
        tag: "https://pubads.g.doubleclick.net/gampad/ads?iu=/183/iqd_videoplayer/videoplayer&description_url=" + encodeURIComponent(window.location.href) + "&cust_params=pos%3Dpre%26tile%3D169%26kw%3Dmary_testplayer&npa=0&sz=16x9%7C480x360%7C640x360%7C640x480&pmnd=0&pmxd=32000&pmad=2&pod=1&vpos=preroll&plcmt=1&gdfp_req=1&output=vast&env=vp&unviewed_position_start=1&impl=s&correlator=" + Date.now()

        // `https://pubads.g.doubleclick.net/gampad/ads?sz=16x9%7C480x360%7C640x360%7C640x480&iu=/183,22337032985/iqdspiegel/videoplayer&cust_params=pos%3Dpre%26tile%3D169%26kw%3Diqadtile169%2C{customparam}%26player%3D{name}&pmnd=0&pmxd=32000&pmad=2&pod=1&vpos=preroll&plcmt=1&impl=s&gdfp_req=1&env=vp&output=vast&unviewed_position_start=1&url=__referrer__&description_url=__page-url__&correlator=__timestamp__`

    }
});
// Debug für Ad Errors
jwplayer().on('adError', function (event) {
    console.log('Ad Error:', event.message, event.code);
});