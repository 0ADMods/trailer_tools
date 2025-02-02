// SPDX-License-Identifier: MIT
// SPDX-FileCopyrightText: © 2022 Stanislas Daniel Claude Dolcini

class MapScript {
    constructor() {
        this.cinemaManagerScript = new CinemaManagerScript("SweepingCutscene");
    }

    Start() {
        const cmpTrigger = Engine.QueryInterface(SYSTEM_ENTITY, IID_Trigger);
        if (!cmpTrigger)
            return;
        var self = this;
        Trigger.prototype.StartCutscene = (data) => self.cinemaManagerScript.Cutscene(SweepingCutscene);
        cmpTrigger.DoAfterDelay(1200, "StartCutscene", undefined);
    }
}

if (!g_MapScript) {
    var g_MapScript = new MapScript();
    g_MapScript.Start();
}


/**
binaries/system/pyrogenesis \
    -conf=videorendering.path:"/Users/stan/Trailer/" \
    -mod=mod \
    -mod=public \
    -mod=trailer_tools \
    -autostart-aiseed=0 \
    -autostart-civ=1:pers \
    -autostart-civ=2:sele \
    -autostart=skirmishes/zagros_mountains_2p \
    -autostart-disable-replay \
    -autostart-revealed=true \
    -conf=fog:false
    OUTPUT="zagros_mountains_2p.mp4" ../concat.sh  
 */


