// JW Player + Relevant Digital Integration for TechNews Today
(() => {
    console.log('🎬 Initializing JW Player with Relevant Digital integration...');

    // Function to wait for libraries to load
    const waitForLibraries = (callback, maxAttempts = 50) => {
        let attempts = 0;

        const checkLibraries = () => {
            attempts++;

            const jwReady = typeof jwplayer !== 'undefined';
            const relevantReady = typeof relevantDigital !== 'undefined' &&
                typeof relevantDigital.defineVideoSlots !== 'undefined';

            console.log(`📚 Library check attempt ${attempts}/50:`, {
                jwPlayer: jwReady ? '✅' : '❌',
                relevantDigital: relevantReady ? '✅' : '❌'
            });

            if (jwReady && relevantReady) {
                console.log('🎉 Both libraries loaded successfully!');
                callback();
                return;
            }

            if (attempts < maxAttempts) {
                setTimeout(checkLibraries, 200); // Check every 200ms
            } else {
                console.error('❌ Libraries failed to load after maximum attempts');
                console.log('Available objects:', {
                    jwplayer: typeof jwplayer,
                    relevantDigital: typeof relevantDigital,
                    window_relevantDigital: typeof window.relevantDigital
                });
            }
        };

        checkLibraries();
    };

    // Wait for DOM to be ready and both libraries to load
    const initializePlayer = () => {

        const initializePlayer = () => {
            waitForLibraries(() => {
                console.log('🚀 Starting player initialization...');

                // Initialize Relevant Digital namespace
                window.relevantDigital = window.relevantDigital || {};
                relevantDigital.cmd = relevantDigital.cmd || [];

                relevantDigital.cmd.push(() => {
                    console.log('📡 Setting up Relevant Digital configuration...');

                    try {
                        // Configure Prebid with consent management
                        relevantDigital.addPrebidConfig({
                            consentManagement: { cmpApi: 'none' }
                        });

                        // Define video ad slots for pre-roll
                        const PRE_ROLL_SLOTS = relevantDigital.defineVideoSlots([
                            {
                                path: '/183/iqd_videoplayer/videoplayer',
                                customParams: {
                                    pos: 'pre',
                                    tile: '169',
                                    kw: 'iqadtile169,mary_testplayer'
                                }
                            }
                        ]);

                        console.log("✅ Pre-Roll Slots defined:", PRE_ROLL_SLOTS);

                        // Extract slot IDs
                        const PRE_ROLL_IDS = PRE_ROLL_SLOTS.map(s => s.getSlotElementId());
                        console.log("🎯 Pre-Roll Slot IDs:", PRE_ROLL_IDS);

                        // Load Prebid configuration - using the config ID from your script tag
                        relevantDigital.loadPrebid({
                            configId: '68cc167017459f1b09dec4da', // Updated to match your script tag
                            manageAdserver: true,
                            collapseEmptyDivs: true,
                            collapseBeforeAdFetch: false,
                            noSlotReload: false
                        });

                        // Load video URLs and setup JW Player
                        relevantDigital.loadVideoUrls(PRE_ROLL_IDS, (urls) => {
                            console.log("🎥 Pre-Roll Ad Tag URL received:", urls[0]);

                            // Check if we have a valid ad URL
                            if (!urls[0]) {
                                console.warn("⚠️ No pre-roll ad URL received - player will load without ads");
                            }

                            // Setup JW Player with responsive sizing
                            const playerInstance = jwplayer("player").setup({
                                playlist: [{
                                    file: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
                                    image: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg",
                                    title: "Tech Innovation Showcase",
                                    description: "Sample video content for TechNews Today"
                                }],
                                width: "100%",
                                aspectratio: "16:9",
                                autostart: false,
                                mute: false,
                                controls: true,
                                displaytitle: true,
                                displaydescription: true,
                                skin: {
                                    name: "glow"
                                },
                                advertising: {
                                    client: "googima",
                                    vpaidmode: "insecure", // Helps with ad compatibility
                                    schedule: urls[0] ? [
                                        {
                                            offset: "pre",
                                            tag: urls[0]
                                        }
                                    ] : [] // Only add advertising if URL exists
                                }
                            });

                            // Enhanced error handling
                            playerInstance.on('adError', (event) => {
                                console.error('❌ Ad Error:', {
                                    message: event.message,
                                    code: event.code,
                                    type: event.type,
                                    tag: event.tag
                                });

                                // Continue to content if ad fails
                                playerInstance.play();
                            });

                            // Ad lifecycle events
                            playerInstance.on('adRequest', (event) => {
                                console.log('📤 Ad Request sent:', event);
                            });

                            playerInstance.on('adLoaded', (event) => {
                                console.log('✅ Ad Loaded successfully:', event);
                            });

                            playerInstance.on('adStarted', (event) => {
                                console.log('▶️ Ad Started:', event);
                            });

                            playerInstance.on('adComplete', (event) => {
                                console.log('✅ Ad Complete:', event);
                            });

                            playerInstance.on('adSkipped', (event) => {
                                console.log('⏭️ Ad Skipped:', event);
                            });

                            // Video content events
                            playerInstance.on('ready', () => {
                                console.log('🎬 JW Player is ready for TechNews Today');

                                // Add some styling to the player container
                                const playerContainer = document.getElementById('player-container');
                                if (playerContainer) {
                                    playerContainer.style.borderRadius = '8px';
                                    playerContainer.style.overflow = 'hidden';
                                    playerContainer.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
                                }
                            });

                            playerInstance.on('play', (event) => {
                                console.log('▶️ Video playback started');
                            });

                            playerInstance.on('pause', (event) => {
                                console.log('⏸️ Video playback paused');
                            });

                            playerInstance.on('complete', (event) => {
                                console.log('✅ Video playback completed');
                            });

                            playerInstance.on('error', (event) => {
                                console.error('❌ Player Error:', event);
                            });

                            // Store player instance globally for debugging
                            window.techNewsPlayer = playerInstance;
                            console.log('🔧 Player instance stored as window.techNewsPlayer for debugging');
                        });
                    } catch (error) {
                        console.error('❌ Error during Relevant Digital setup:', error);

                        // Fallback: Setup JW Player without ads
                        console.log('🔄 Setting up JW Player without ads as fallback...');
                        setupPlayerWithoutAds();
                    }
                });
            });
        };

        // Fallback function to setup player without ads
        const setupPlayerWithoutAds = () => {
            try {
                const playerInstance = jwplayer("player").setup({
                    playlist: [{
                        file: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
                        image: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg",
                        title: "Tech Innovation Showcase",
                        description: "Sample video content for TechNews Today"
                    }],
                    width: "100%",
                    aspectratio: "16:9",
                    autostart: false,
                    mute: false,
                    controls: true,
                    displaytitle: true,
                    displaydescription: true,
                    skin: {
                        name: "glow"
                    }
                });

                playerInstance.on('ready', () => {
                    console.log('🎬 JW Player (no ads) is ready for TechNews Today');
                });

                window.techNewsPlayer = playerInstance;
            } catch (error) {
                console.error('❌ Error setting up fallback player:', error);
            }
        };
    };

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializePlayer);
    } else {
        // DOM is already ready
        setTimeout(initializePlayer, 100); // Small delay to ensure scripts are loaded
    }
})();