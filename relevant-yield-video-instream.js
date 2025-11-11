(() => {
    // 1. Ensure the core Relevant Digital script is loaded first (handles configId, CMP, etc.)
    window
        .loadRelevant()
        .then(() => {
            // The relevantDigital object is now globally available and initialized.
            // The rest of the logic must be wrapped in a relevantDigital.cmd.push()
            // to ensure it executes after the internal RY initialization is complete.

            window.relevantDigital.cmd.push(() => {

                /* NOTE: The logic must be wrapped in window.relevantDigital.cmd.push(() => { ... })Here is the exact reason::
                 * The code inside the .then() block only guarantees that the file itself has been
                 * downloaded and injected into the page. It does not guarantee that the internal
                 * initialization within the Relevant Digital library is complete.
                 *
                 * Wrapping your calls (defineVideoSlots, loadVideoUrls) inside relevantDigital.cmd.push()
                 * ensures they are executed only when the internal library is fully ready to process commands,
                 * thereby preventing "function not defined" or "object not ready" errors.
                 */

                // 2. Define the video slot with its unique path and custom parameters
                const PRE_ROLL_SLOTS = relevantDigital.defineVideoSlots([
                    {
                        path: "/183/iqd_videoplayer/videoplayer", // Unique GAM path
                        customParams: {
                            pos: "pre",
                            tile: "169",
                            // The ONLY mandatory specific part: the custom, mandant-specific KW
                            kw: "iqadtile169,mary_testplayer",
                        },
                    },
                ]);
                console.log("Pre-Roll Slots defined:", PRE_ROLL_SLOTS);

                const PRE_ROLL_IDS = PRE_ROLL_SLOTS.map((s) => s.getSlotElementId());
                console.log("Pre-Roll Slot IDs:", PRE_ROLL_IDS);

                // 3. Load the video ad tag URL
                relevantDigital.loadVideoUrls(PRE_ROLL_IDS, (urls) => {
                    const adTagUrl = urls[0];
                    console.log("Pre-Roll Ad Tag URL received:", adTagUrl);

                    if (!adTagUrl) {
                        console.warn("⚠️ No pre-roll ad URL received. Using fallback.");
                    }

                    // 4. Setup JW Player using the dynamic ad tag URL
                    jwplayer("player").setup({
                        playlist: [
                            {
                                file: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
                                image: "https://via.placeholder.com/640x360",
                            },
                        ],
                        width: "640px",
                        height: "360px",
                        autostart: false,
                        mute: false,
                        advertising: {
                            client: "googima",
                            schedule: [
                                {
                                    offset: "pre",
                                    tag: adTagUrl,
                                },
                            ],
                        },
                    });

                    jwplayer("player").on("adError", (event) => {
                        console.log("Ad Error:", event.message, event.code);
                    });
                });
            }); // End of relevantDigital.cmd.push
        })
        .catch((error) => {
            console.error("[Relevant Video] Initialization failed:", error);
        });
})();
