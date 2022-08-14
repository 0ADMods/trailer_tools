// SPDX-License-Identifier: MIT
// SPDX-FileCopyrightText: © 2022 Stanislas Daniel Claude Dolcini
// SPDX-FileCopyrightText: © 2010 Philip J. Taylor

class CombatDemoHugeScript {
    constructor() {
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
     */
    SendMoveCommand(data) {
        if (data.debug) {
            const ent = Engine.AddEntity("trigger/trigger_point_A");
            const cmpPosition = Engine.QueryInterface(ent, IID_Position);
            if (cmpPosition)
                cmpPosition.MoveTo(data.waypoint.x, data.waypoint.y);
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
        var mx = 192;
        var mz = 128;
        var sep = 25;

        for (let i = 0; i < 8; ++i) {
            // Create ally units.
            this.SendMoveCommand({
                "queued": false,
                "waypoint": new Vector2D(mx, mz),
                "entities": this.CreateBlock("units/rome/infantry_spearman_e", 1, Math.PI / 2, mx - sep - 6, mz, 16, 4, 2.1, 3.0),
                "owner": 1,
                "formation": "special/formations/testudo",
                "debug": true
            })

            let allyRanged = this.CreateBlock("units/rome/infantry_javelineer_e", 1, Math.PI / 2, mx - sep, mz, 8, 1, 5.0, 3.0);
            allyRanged = allyRanged.concat(this.CreateBlock("units/rome/infantry_javelineer_e", 1, Math.PI / 2, mx - sep - 2, mz, 7, 1, 5.0, 3.0));
            this.SetStance({
                "stance": "standground",
                "owner": 1,
                "entities": allyRanged
            })

            // Create enemy units.
            this.SendMoveCommand({
                "queued": false,
                "waypoint": new Vector2D(mx, mz),
                "entities": this.CreateBlock("units/athen/infantry_spearman_e", 2, 3 * Math.PI / 2, mx + sep + 6, mz, 16, 4, 2.1, 3.0),
                "owner": 2,
                "formation": "special/formations/phalanx"
            })

            let enemyRanged = this.CreateBlock("units/athen/infantry_marine_archer_b", 2, 3 * Math.PI / 2, mx + sep, mz, 8, 1, 5.0, 3.0);
            enemyRanged = enemyRanged.concat(this.CreateBlock("units/athen/infantry_marine_archer_b", 2, 3 * Math.PI / 2, mx + sep + 2, mz, 7, 1, 5.0, 3.0));
            this.SetStance({
                "stance": "standground",
                "owner": 2,
                "entities": enemyRanged
            })
            mz += 42;
        }
    }
}

if (!g_CombatDemoHugeScript) {
    var g_CombatDemoHugeScript = new CombatDemoHugeScript();
    g_CombatDemoHugeScript.Start();
}
