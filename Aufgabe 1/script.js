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
        client: "vast", // برای تبلیغات
        tag: "https://pubads.g.doubleclick.net/gampad/ads?iu=/183/iqd_videoplayer/videoplayer&description_url=" + encodeURIComponent(window.location.href) + "&cust_params=kw%3Dtestplayer&ad_rule=1&npa=0&sz=16x9%7C480x360%7C640x360%7C640x480&gdfp_req=1&output=vast&env=vp&unviewed_position_start=1&impl=s&vid_d=115000&allcues=5000,8000,12000&correlator=" + Date.now()
    }
});