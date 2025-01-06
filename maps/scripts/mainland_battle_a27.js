// SPDX-License-Identifier: MIT
// SPDX-FileCopyrightText: © 2022 Stanislas Daniel Claude Dolcini
// SPDX-FileCopyrightText: © 2010 Philip J. Taylor

class CombatDemoHugeScript {
    constructor() {
        this.cinemaManagerScript = new CinemaManagerScript("Mainland A27");
        this.waypoints = [];
    }

    /**
     * Creates a block of units at the given location.
     * @param {string} template - The template name.
     * @param {number} owner - The player id.
     * @param {number} angle
     * @param {number} x0
     * @param {number} z0
     * @param {number} cols
     * @param {number} rows
     * @param {number} colspacing
     * @param {number} rowspacing
     * @return {number[]} - The entities of the block.
     */
    CreateBlock(template, owner, angle, x0, z0, cols, rows, colspacing, rowspacing) {
        const rdx = rowspacing * -Math.sin(angle);
        const rdz = rowspacing * -Math.cos(angle);
        const cdx = colspacing * Math.cos(angle);
        const cdz = colspacing * -Math.sin(angle);
        const ents = [];
        for (let r = 0; r < rows; ++r) {
            for (let c = 0; c < cols; ++c) {
                const x = x0 + (c - (cols - 1) / 2) * cdx + r * rdx;
                const z = z0 + (c - (cols - 1) / 2) * cdz + r * rdz;
                const ent = Engine.AddEntity(template);
                const cmpPosition = Engine.QueryInterface(ent, IID_Position);
                if (cmpPosition) {
                    cmpPosition.MoveTo(x, z);
                    cmpPosition.SetYRotation(angle);
                }

                const cmpOwnership = Engine.QueryInterface(ent, IID_Ownership);
                if (cmpOwnership)
                    cmpOwnership.SetOwner(owner);
                ents.push(ent)
            }
        }
        return ents;
    }

    /**
     *
     * @param {object} data
     * @param {boolean} data.queued
     * @param {Vector2D} data.waypoint
     * @param {number[]} data.entities
     * @param {number} data.owner
     * @param {number} data.formation
     * @param {boolean} data.debug
     * @param {boolean} data.debugIndex
     */
    SendMoveCommand(data) {
        if (data.debug) {
            const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K'];
            const ent = Engine.AddEntity("trigger/trigger_point_" + letters[data.debugIndex]);
            const cmpPosition = Engine.QueryInterface(ent, IID_Position);
            if (cmpPosition)
                cmpPosition.MoveTo(data.waypoint.x, data.waypoint.y);

            this.waypoints.push(ent);
        }

        ProcessCommand(data.owner, {
            "type": "walk",
            "entities": data.entities,
            "x": data.waypoint.x,
            "z": data.waypoint.y,
            "queued": data.queued,
            "force": false,
            "formation": data.formation
        });
    }

    /**
     *
     * @param {object} data
     * @param {number} data.owner - Ignored
     * @param {string} data.stance
     * @param {number[]} data.entities
     */
    SetStance(data) {
        ProcessCommand(data.owner, { "type": "stance", "name": data.stance, "entities": data.entities });
    }

    Start() {

        const numOfPatches = 7;
        const numOfBlocks = 8;
        const mzOffset = 42.0;
        const middle = 192.0 * numOfPatches / 2.0;
        var mx = middle;
        var mz = middle - ((numOfBlocks - 1) * mzOffset / 2.0);
        var sep = 100;

        const cmpTrigger = Engine.QueryInterface(SYSTEM_ENTITY, IID_Trigger);
        if (!cmpTrigger)
            return;
        var self = this;


        Trigger.prototype.SendMoveCommand = (data) => {
            self.SendMoveCommand(data);
        };

        for (let i = 0; i < numOfBlocks; ++i) {
            // Create ally units.

            const allyblock = this.CreateBlock("units/rome/infantry_spearman_e", 2, Math.PI / 2, mx - sep - 6, mz, 16, 4, 2.1, 3.0);
            cmpTrigger.DoAfterDelay(1000, "SendMoveCommand", {
                "queued": false,
                "waypoint": new Vector2D(mx - 10, mz),
                "entities": allyblock,
                "owner": 2,
                "formation": "special/formations/testudo",
                "debug": true,
                "debugIndex": i
            });

            let allyRanged = this.CreateBlock("units/rome/infantry_javelineer_e", 2, Math.PI / 2, mx - sep, mz, 8, 1, 5.0, 3.0);
            allyRanged = allyRanged.concat(this.CreateBlock("units/rome/infantry_javelineer_e", 2, Math.PI / 2, mx - sep - 2, mz, 7, 1, 5.0, 3.0));
            this.SetStance({
                "stance": "standground",
                "owner": 2,
                "entities": allyRanged
            })

            cmpTrigger.DoAfterDelay(4000, "SendMoveCommand", {
                "queued": false,
                "waypoint": new Vector2D(mx - 12, mz),
                "entities": allyRanged,
                "owner": 2,
                "formation": "special/formations/testudo",
                "debug": true,
                "debugIndex": i
            });

            // Create enemy units.

            const enemyBlock = this.CreateBlock("units/brit/infantry_spearman_e", 1, 3 * Math.PI / 2, mx + sep + 6, mz, 16, 4, 2.1, 3.0);
            cmpTrigger.DoAfterDelay(1000, "SendMoveCommand", {
                "queued": false,
                "waypoint": new Vector2D(mx + 10, mz),
                "entities": enemyBlock,
                "owner": 1,
                "formation": "special/formations/box"
            });

            let enemyRanged = this.CreateBlock("units/brit/infantry_javelineer_e", 1, 3 * Math.PI / 2, mx + sep, mz, 8, 1, 5.0, 3.0);
            enemyRanged = enemyRanged.concat(this.CreateBlock("units/brit/infantry_javelineer_e", 1, 3 * Math.PI / 2, mx + sep + 2, mz, 7, 1, 5.0, 3.0));
            this.SetStance({
                "stance": "standground",
                "owner": 1,
                "entities": enemyRanged
            })


            cmpTrigger.DoAfterDelay(4000, "SendMoveCommand", {
                "queued": false,
                "waypoint": new Vector2D(mx + 12, mz),
                "entities": enemyRanged,
                "owner": 1,
                "formation": "special/formations/box"
            });

            mz += mzOffset;
        }




        Trigger.prototype.StartCutscene = (data) => {
            self.cinemaManagerScript.Cutscene(self.Watch(self.waypoints, 0.1, 20.0));
        };

        cmpTrigger.DoAfterDelay(1000, "StartCutscene", undefined);

    }

    /**
     * 
     * @param {number} entity the name of the entity to focus on.
     * @param {number} speed speed of the cutsene. 
     * @returns 
     */
    Watch(entities, speed = 0.5, gameSpeed = 1) {

        const cameraPoint = [];

        for (let i = 0; i < entities.length; ++i) {

            const cmpPosition = Engine.QueryInterface(entities[i], IID_Position);
            const pos = cmpPosition.GetPosition();
            cameraPoint.push(Vector3D.add(pos, new Vector3D(20, 70, -100)));
        }

        var keyframes = [];

        for (let i = 0; i < cameraPoint.length; ++i) {
            keyframes.push([1 * speed * gameSpeed, cameraPoint[i], { "z": 0.8205944895744324, "y": -0.55849689245224, "x": -0.12126806378364563 }]);
        }

        var middlepoint = cameraPoint[cameraPoint.length - 1];

        return [
            ...keyframes,
            [10 * speed * gameSpeed, Vector3D.add(Vector3D.add(middlepoint, new Vector3D(20, 200, -600)), new Vector3D(-20, -70, +100)), { "z": 0.8205944895744324, "y": -0.55849689245224, "x": -0.12126806378364563 }],
        ];
    }
}



{
    new CombatDemoHugeScript().Start();
}


/**
binaries/system/pyrogenesis \
    -conf=videorendering.path:"/Users/stan/Trailer/" \
    -conf=videorendering.enabled:true \
    -conf=xres:1920 \
    -conf=yres:1080 \
    -conf=windowed:true \
    -mod=mod \
    -mod=public \
    -mod=trailer_tools \
    -autostart=random/mainland_battle_a27 \
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
    -autostart-biome='generic/aegean' \
    -autostart-seed=0
 */
