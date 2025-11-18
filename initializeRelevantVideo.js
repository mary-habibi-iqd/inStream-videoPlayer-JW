/**
 * Loads Relevant Yield for MULTIPLE video ad slots (pre, mid, post) and sets up the player.
 * @param {string} playerContainerId - The ID of the HTML element containing the video player (e.g., "player").
 * @param {Array<Object>} adSlotsConfig - Array of slot configurations.
 * Example element: { position: "pre", tile: "169", customKVPairs: { kw: 'my_keywords' } }
 * @param {string} slotPath - The single, common GAM Ad Unit Path for all slots.
 */
function initializeVideoAds(
    playerContainerId,
    slotPath,
    adSlotsConfig
) {
    if (typeof window.loadRelevant !== 'function') {
        console.error("[RY Video] The core 'loadRelevant' function is missing.");
        return;
    }

    // 1. Map the input configuration into the format required by relevantDigital.defineVideoSlots
    const rySlotDefinitions = adSlotsConfig.map(slot => {
        // Combine standard parameters (pos, tile) with custom ones (kw, etc.)
        const slotCustomParams = {
            pos: slot.position,
            tile: slot.tile,
            ...(slot.customKVPairs || {}), // Ensure customKVPairs is used if provided
        };

        return {
            path: slotPath,
            customParams: slotCustomParams,
        };
    });

    window.loadRelevant()
        .then(() => {
            window.relevantDigital.cmd.push(() => {

                // 2. Define ALL video slots at once
                const VIDEO_SLOTS = relevantDigital.defineVideoSlots(rySlotDefinitions);
                const SLOT_IDS = VIDEO_SLOTS.map(s => s.getSlotElementId());

                // 3. Load ALL video ad tag URLs from RY
                relevantDigital.loadVideoUrls(SLOT_IDS, (urls) => {

                    // Create the JW Player schedule object
                    const adSchedule = adSlotsConfig.map((slot, index) => {
                        const adTagUrl = urls[index];

                        if (!adTagUrl) {
                            console.warn(`[RY Video] ⚠️ No ad URL received for ${slot.position} (Tile ${slot.tile}).`);
                        }

                        return {
                            offset: slot.position === 'mid' ? '00:00:30' : slot.position, // Mid-rolls require a specific time/percentage offset in JW Player
                            tag: adTagUrl
                        };
                    }).filter(scheduleItem => scheduleItem.tag); // Remove any schedule items without a valid tag

                    // 4. Setup the video player with the ad tag schedule
                    const player = jwplayer(playerContainerId);

                    player.setup({
                        // ... Publisher's core player settings (playlist, size, etc.) ...
                        // NOTE: For mid-rolls, the publisher needs to adjust the 'offset' logic 
                        // if they are based on time stamps or cue points. This example uses a placeholder.

                        advertising: {
                            client: "googima",
                            schedule: adSchedule
                        }
                    });

                    // ... Player event listeners (adError, etc.) ...
                });
            });
        });
}

// --- IMPLEMENTATION EXAMPLE FOR PUBLISHER X (1 Pre, 3 Mid, 1 Post) ---

// 1. Define the COMMON Ad Unit Path for all slots
const PUBLISHER_AD_PATH = "/183,22337032985/iqdspiegel/videoplayer";

// 2. Define the configuration for ALL slots in an array
const VIDEO_SLOT_CONFIGS = [
    {
        position: "pre",
        tile: "169",
        customKVPairs: { kw: 'iqadtile169,iqdtest' }
    },
    {
        position: "mid",
        tile: "169", // Must use a different tile ID for the first mid-roll
        customKVPairs: { kw: 'iqadtile169,iqlive' }
    },
    {
        position: "mid",
        tile: "169", // Must use a different tile ID for the second mid-roll
        customKVPairs: { kw: 'iqadtile169,iqlive' }
    },
    {
        position: "mid",
        tile: "169", // Must use a different tile ID for the third mid-roll
        customKVPairs: { kw: 'iqadtile169' }
    },
    {
        position: "post",
        tile: "169",
        customKVPairs: { kw: 'iqadtile169' }
    }
];

// 3. Execute the generic helper function
initializeVideoAds(
    "player",                 // The ID of the video player container
    PUBLISHER_AD_PATH,        // The common GAM Ad Unit Path
    VIDEO_SLOT_CONFIGS        // The array of all pre, mid, and post slot configurations
);