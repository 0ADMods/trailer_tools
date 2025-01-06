// SPDX-License-Identifier: MIT
// SPDX-FileCopyrightText: © 2022 Stanislas Daniel Claude Dolcini
class MapScript {
    constructor() {
        this.cinemaManagerScript = new CinemaManagerScript("SweepingCutscene");
    }

    CreateEntity(template, owner, x, z, angle) {
        const ent = Engine.AddEntity(template);
        const cmpPosition = Engine.QueryInterface(ent, IID_Position);
        if (cmpPosition) {
            cmpPosition.MoveTo(x, z);
            cmpPosition.SetYRotation(angle);
        }

        const cmpOwnership = Engine.QueryInterface(ent, IID_Ownership);
        if (cmpOwnership)
            cmpOwnership.SetOwner(owner);

        return ent;
    }


    Start() {
        const cmpTrigger = Engine.QueryInterface(SYSTEM_ENTITY, IID_Trigger);
        if (!cmpTrigger)
            return;
        const self = this;



        // Cutscene I
        // Trigger.prototype.StartCutscene = (data) => {
        //     const ship = this.CreateEntity("units/cart/ship_siege", 1, 270, 500, 0);
        //     const dock = this.CreateEntity("structures/athen/dock", 2, 270, 580, 0);
        //     const cmpHealth = Engine.QueryInterface(dock, IID_Health);
        //     if (cmpHealth)
        //         cmpHealth.SetHitpoints(10);
        //     self.cinemaManagerScript.Cutscene(Watch(ship, 1.0, 1));
        // };
        // cmpTrigger.DoAfterDelay(1200, "StartCutscene", undefined);

        // Cutscene II
        // let smoke = INVALID_ENTITY;
        // const enemyPos = new Vector2D(300, 300);
        // Trigger.prototype.CreateBoom = () => {
        //     smoke = this.CreateEntity("actor|particle/destruction_dust_small", 2, enemyPos.x, enemyPos.y, 0);
        // };

        // Trigger.prototype.StartCutscene = () => {
        //     var ship1 = this.CreateEntity("units/cart/ship_ram", 1, enemyPos.x - 120, enemyPos.y, 0);
        //     var ship = this.CreateEntity("units/athen/ship_scout", 2, enemyPos.x, enemyPos.y, 0);
        //     this.CreateEntity("units/athen/infantry_spearman_e", 1, enemyPos.x, enemyPos.y + 20, 0);
        //     const cmpHealth = Engine.QueryInterface(ship, IID_Health);
        //     if (cmpHealth)
        //         cmpHealth.SetHitpoints(45);
        //     ProcessCommand(1, {
        //         "type": "walk",
        //         "entities": [ship1],
        //         "x": enemyPos.x,
        //         "z": enemyPos.y,
        //         "queued": false,
        //         "force": false,
        //     });
        //     self.cinemaManagerScript.Cutscene(Watch(ship, 1.0, 1));

        // };
        
        // Trigger.prototype.DeleteBoom = () => {
        //     Engine.DestroyEntity(smoke);
        // };

        // cmpTrigger.DoAfterDelay(1200, "StartCutscene", undefined);
        // cmpTrigger.DoAfterDelay(8000, "CreateBoom", undefined);
        // cmpTrigger.DoAfterDelay(10000, "DeleteBoom", undefined);


        // Cutscene III
        Trigger.prototype.StartCutscene = (data) => {
            const ship1 = this.CreateEntity("units/cart/ship_merchant", 1, 300, 450, 0);
            const ship4 = this.CreateEntity("units/cart/ship_merchant", 1, 300, 400, 0);

            ProcessCommand(1, {
                "type": "walk",
                "entities": [ship1, ship4],
                "x": 500,
                "z": 790,
                "queued": false,
                "force": false,
            });


            ProcessCommand(1, {
                "type": "walk",
                "entities": [ship1, ship4],
                "x": 500,
                "z": 1000,
                "queued": true,
                "force": false,
            });

            const ent = this.CreateEntity("trigger/trigger_point_A", 2, 480, 790, 180);
            const ship7 = this.CreateEntity("units/athen/ship_arrow", 2, 520, 790, 180);
            const ship8 = this.CreateEntity("units/athen/ship_arrow", 2, 450, 790, 180);



            self.cinemaManagerScript.Cutscene(Watch(ship1, 1.0, 2.0));
        };
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
    -conf=videorendering.enabled:false \
    -mod=mod \
    -mod=public \
    -mod=trailer_tools \
    -autostart=random/migration_naval_a27 \
    -autostart-disable-replay \
    -autostart-player=-1 \
    -autostart-size=384 \
    -autostart-civ=1:gaul \
    -autostart-revealed=true \
    -autostart-victory=endless \
    -autostart-speed=1 \
    -conf=fog:false \
    -conf=renderer.scale:2.0 \
    -conf=sharpening:disabled \
    -autostart-players=2 \
    -autostart-placement=river \
    -autostart-biome='generic/aegean' \
    -autostart-seed=1

    OUTPUT="siege_ship.mp4" ../concat.sh  
 */