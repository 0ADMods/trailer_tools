// SPDX-License-Identifier: MIT
// SPDX-FileCopyrightText: © 2022 Stanislas Daniel Claude Dolcini

class MigrationScript {
    constructor() {
        this.cinemaManagerScript = new CinemaManagerScript("Migration");
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

if (!g_MigrationScript) {
    var g_MigrationScript = new MigrationScript();
    g_MigrationScript.Start();
}

/**
binaries/system/pyrogenesis \
    -conf=videorendering.path:"/Users/stan/Trailer/" \
    -mod=mod \
    -mod=public \
    -mod=trailer_tools \
    -autostart-aiseed=0 \
    -autostart=random/foothills \
    -autostart-disable-replay \
    -autostart-size=256 \
    -autostart-team=1:1 \
    -autostart-team=2:1 \
    -autostart-team=3:1 \
    -autostart-team=4:2 \
    -autostart-team=5:2 \
    -autostart-team=6:2 \
    -autostart-players=6 \
    -autostart-placement=river \
    -autostart-revealed=true \
    -conf=fog:false \
    -autostart-biome='generic/sahara' \
    -autostart-seed=0

    OUTPUT="foothills-river.mp4" ../concat.sh  

binaries/system/pyrogenesis \
    -conf=videorendering.path:"/Users/stan/Trailer/" \
    -mod=mod \
    -mod=public \
    -mod=trailer_tools \
    -autostart-aiseed=0 \
    -autostart=random/foothills \
    -autostart-disable-replay \
    -autostart-size=256 \
    -autostart-team=1:1 \
    -autostart-team=2:1 \
    -autostart-team=3:1 \
    -autostart-team=4:2 \
    -autostart-team=5:2 \
    -autostart-team=6:2 \
    -autostart-players=6 \
    -autostart-placement=stronghold \
    -autostart-revealed=true \
    -conf=fog:false \
    -autostart-biome='generic/aegean' \
    -autostart-seed=0

    OUTPUT="foothills-river.mp4" ../concat.sh  

binaries/system/pyrogenesis \
    -conf=videorendering.path:"/Users/stan/Trailer/" \
    -mod=mod \
    -mod=public \
    -mod=trailer_tools \
    -autostart-aiseed=0 \
    -autostart=random/foothills \
    -autostart-disable-replay \
    -autostart-size=256 \
    -autostart-team=1:1 \
    -autostart-team=2:1 \
    -autostart-team=3:1 \
    -autostart-team=4:2 \
    -autostart-team=5:2 \
    -autostart-team=6:2 \
    -autostart-players=6 \
    -autostart-placement=circle \
    -autostart-revealed=true \
    -conf=fog:false \
    -autostart-biome='generic/savanna' \
    -autostart-seed=0

        OUTPUT="foothills-circle.mp4" ../concat.sh  

binaries/system/pyrogenesis \
    -conf=videorendering.path:"/Users/stan/Trailer/" \
    -mod=mod \
    -mod=public \
    -mod=trailer_tools \
    -autostart-aiseed=0 \
    -autostart=random/foothills \
    -autostart-disable-replay \
    -autostart-size=256 \
    -autostart-team=1:1 \
    -autostart-team=2:1 \
    -autostart-team=3:1 \
    -autostart-team=4:2 \
    -autostart-team=5:2 \
    -autostart-team=6:2 \
    -autostart-players=6 \
    -autostart-placement=randomGroup \
    -autostart-revealed=true \
    -conf=fog:false \
    -autostart-biome='generic/autumn' \
    -autostart-seed=0

    
 */
