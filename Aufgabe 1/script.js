jwplayer("player").setup({
    playlist: [{
        file: "https://storage.googleapis.com/interactive-media-ads/media/android.mp4", // لینک ویدئو
        image: "https://via.placeholder.com/640x360" // عکس پوستر (اختیاری)
    }],
    width: "100%", // عرض پلیر
    height: "360px", // ارتفاع پلیر
    autostart: false, // خودکار پخش نشه
    mute: true, // اول بی‌صدا باشه
    advertising: {
        client: "vast",
        tag: "https://pubads.g.doubleclick.net/gampad/ads?sz=640x480&iu=/124319096/external/single_ad_samples&ciu_szs=300x250&impl=s&gdfp_req=1&env=vp&output=vast&unviewed_position_start=1&cust_params=deployment%3Ddevsite%26sample_ct%3Dlinear&correlator="
    }
});