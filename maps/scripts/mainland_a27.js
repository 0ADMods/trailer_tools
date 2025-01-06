// SPDX-License-Identifier: MIT
// SPDX-FileCopyrightText: © 2022 Stanislas Daniel Claude Dolcini

class MapScript {
    constructor() {
        this.cinemaManagerScript = new CinemaManagerScript("Mainland A27");
    }

    Start() {
        const cmpTrigger = Engine.QueryInterface(SYSTEM_ENTITY, IID_Trigger);
        if (!cmpTrigger)
            return;
        var self = this;
        const civCenterEnt = TriggerHelper.GetPlayerEntitiesByClass(1, "CivilCentre")[0];
        Trigger.prototype.StartCutscene = (data) => {
            self.cinemaManagerScript.Cutscene(Watch(civCenterEnt, 1.0));
        };
        cmpTrigger.DoAfterDelay(10 * 60 * 1000, "StartCutscene", undefined);
    }
}

if (!g_MapScript) {
    var g_MapScript = new MapScript();
    g_MapScript.Start();
}

/**

binaries/system/pyrogenesis \
    -conf=videorendering.path:"/Users/stan/Trailer/" \
    -conf=videorendering.enabled:false \
    -mod=mod \
    -mod=public \
    -mod=trailer_tools \
    -autostart-aiseed=0 \
    -autostart-ai=1:petra \
    -autostart-aidiff=1:3 \
    -autostart=random/mainland_a27 \
    -autostart-disable-replay \
    -autostart-player=-1 \
    -autostart-size=256 \
    -autostart-civ=1:gaul \
    -autostart-revealed=true \
    -autostart-victory=endless \
    -autostart-speed=20 \
    -conf=fog:false \
    -conf=renderer.scale:2.0 \
    -conf=sharpening:disabled \
    -autostart-players=1 \
    -autostart-biome='generic/autumn' \
    -autostart-seed=0
    OUTPUT="construction-mainland.mp4" ../concat.sh  
 */