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
        tag: "https://pubads.g.doubleclick.net/gampad/ads?sz=640x480&iu=/124319096/external/single_ad_samples&ciu_szs=300x250&impl=s&gdfp_req=1&env=vp&output=vast&unviewed_position_start=1&cust_params=deployment%3Ddevsite%26sample_ct%3Dlinear&correlator="
    }
});