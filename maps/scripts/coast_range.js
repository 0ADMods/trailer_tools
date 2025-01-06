// SPDX-License-Identifier: MIT
// SPDX-FileCopyrightText: © 2022 Stanislas Daniel Claude Dolcini

class CoastRangeScript {
    constructor() {
        this.cinemaManagerScript = new CinemaManagerScript("CoastRange");
    }

    Start() {
        const cmpTrigger = Engine.QueryInterface(SYSTEM_ENTITY, IID_Trigger);
        if (!cmpTrigger)
            return;
        var self = this;
        Trigger.prototype.StartCutscene = (data) => self.cinemaManagerScript.Cutscene(CircleAndZoomOut);
        cmpTrigger.DoAfterDelay(1200, "StartCutscene", undefined);
    }
}

if (!g_CoastRangeScript) {
    var g_CoastRangeScript = new CoastRangeScript();
    g_CoastRangeScript.Start();
}

/**
binaries/system/pyrogenesis \
    -conf=videorendering.path:"/Users/stan/Trailer/" \
    -mod=mod \
    -mod=public \
    -mod=trailer_tools \
    -autostart-aiseed=0 \
    -autostart=random/coast_range \
    -autostart-disable-replay \
    -autostart-size=256 \
    -autostart-team=1:1 \
    -autostart-team=2:1 \
    -autostart-team=3:1 \
    -autostart-team=4:2 \
    -autostart-team=5:2 \
    -autostart-team=6:2 \
    -autostart-placement=river \
    -autostart-revealed=true \
    -conf=fog:false \
    -autostart-players=6 \
    -autostart-biome='generic/aegean' \
    -autostart-seed=0
    OUTPUT="coast_range-river.mp4" ../concat.sh  
    
binaries/system/pyrogenesis \
    -conf=videorendering.path:"/Users/stan/Trailer/" \
    -mod=mod \
    -mod=public \
    -mod=trailer_tools \
    -autostart-aiseed=0 \
    -autostart=random/coast_range \
    -autostart-disable-replay \
    -autostart-size=256 \
    -autostart-team=1:1 \
    -autostart-team=2:1 \
    -autostart-team=3:1 \
    -autostart-team=4:2 \
    -autostart-team=5:2 \
    -autostart-team=6:2 \
    -autostart-placement=stronghold \
    -autostart-revealed=true \
    -conf=fog:false \
    -autostart-players=4 \
    -autostart-biome='generic/india' \
    -autostart-seed=0
    OUTPUT="coast_range-stronghold.mp4" ../concat.sh  
    

binaries/system/pyrogenesis \
    -conf=videorendering.path:"/Users/stan/Trailer/" \
    -conf=xres:1920" \
    -conf=yres:1080" \
    -conf=borderless.fullscreen:false \
    -mod=mod \
    -mod=public \
    -mod=trailer_tools \
    -autostart-aiseed=0 \
    -autostart=random/coast_range \
    -autostart-disable-replay \
    -autostart-size=256 \
    -autostart-team=1:1 \
    -autostart-team=2:1 \
    -autostart-team=3:1 \
    -autostart-team=4:2 \
    -autostart-team=5:2 \
    -autostart-team=6:2 \
    -autostart-placement=circle \
    -autostart-revealed=true \
    -conf=fog:false \
    -autostart-players=6 \
    -autostart-biome='generic/arctic' \
    -autostart-seed=0
   
    
 */
