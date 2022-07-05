// SPDX-License-Identifier: MIT
// SPDX-FileCopyrightText: © 2022 Stanislas Daniel Claude Dolcini
// SPDX-FileCopyrightText: © 2022 Lancelot de Ferrière le Vayer

class FormationBannerScript {
    constructor() {
        this.ROMAN_OWNER_PLAYER_ID = 1;
        this.ROMAN_UNIT_COUNT = 120;
        this.ROMAN_UNIT_START_ENTITY = 0;
        this.ROMAN_UNIT_FORMATION_NAME = "special/formations/testudo";
        this.ROMAN_UNIT_WAYPOINTS = [
            new Vector2D(692, 687),
            new Vector2D(793, 760),
            new Vector2D(848, 792),
            new Vector2D(886, 797),
            new Vector2D(945, 786),
            new Vector2D(1021, 782),
            new Vector2D(1069, 782),
            new Vector2D(1090, 760),
        ];

        this.cinemaManagerScript = new CinemaManagerScript("Testudo");
        this.nodes = this.ROMAN_UNIT_WAYPOINTS.map(function (_, i, a) {
            const height = 125;
            const pos = a[0];
            const dir = a[i];
            return [
                i === 0 ? 20 : 5,
                { "x": pos.x, "y": height, "z": pos.y },
                { "x": dir.x + (dir.x * 0.20), "y": -height, "z": dir.y + (dir.y * 0.15) },
            ]
        });

        this.nodes = this.cinemaManagerScript.ConvertFromXML(this.nodes);
    }

    /**
     *
     * @param {object} data
     * @param {boolean} data.queued
     * @param {Vector2D} data.waypoint
     */
    SendMoveCommand(data) {
        ProcessCommand(this.ROMAN_OWNER_PLAYER_ID, {
            "type": "walk",
            "entities": Array.from({ length: this.ROMAN_UNIT_COUNT }, (_, i) => i + this.ROMAN_UNIT_START_ENTITY),
            "x": data.waypoint.x,
            "z": data.waypoint.y,
            "queued": data.queued,
            "force": false,
            "formation": this.ROMAN_UNIT_FORMATION_NAME
        });
    }

    Start() {
        for (let i = -10; i <= 10; i += 2) {
            for (let j = -10; j <= 10; j += 2) {
                const ent = Engine.AddEntity("units/rome/infantry_spearman_e");
                if (i === -10 && j === -10)
                    this.ROMAN_UNIT_START_ENTITY = ent;
                const cmpEntOwnership = Engine.QueryInterface(ent, IID_Ownership);
                if (cmpEntOwnership)
                    cmpEntOwnership.SetOwner(this.ROMAN_OWNER_PLAYER_ID);
                const cmpEntPosition = Engine.QueryInterface(ent, IID_Position);
                if (cmpEntPosition) {
                    const point = this.ROMAN_UNIT_WAYPOINTS[0];
                    cmpEntPosition.JumpTo(point.x + i, point.y + j);
                }
            }
        }

        const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K'];
        let index = 0;
        for (const elem of this.ROMAN_UNIT_WAYPOINTS) {
            const ent = Engine.AddEntity("trigger/trigger_point_" + letters[index]);
            const cmpEntOwnership = Engine.QueryInterface(ent, IID_Ownership);
            if (cmpEntOwnership)
                cmpEntOwnership.SetOwner(this.ROMAN_OWNER_PLAYER_ID);
            const cmpEntPosition = Engine.QueryInterface(ent, IID_Position);
            if (cmpEntPosition)
                cmpEntPosition.JumpTo(elem.x, elem.y);
            ++index;
        }


        const cmpTrigger = Engine.QueryInterface(SYSTEM_ENTITY, IID_Trigger);
        if (!cmpTrigger)
            return;
        let queued = false;
        for (const waypointIndex in this.ROMAN_UNIT_WAYPOINTS) {
            const waypoint = this.ROMAN_UNIT_WAYPOINTS[waypointIndex == 0 ? 1 : waypointIndex]
            cmpTrigger.DoAfterDelay(7000 * waypointIndex, "SendMoveCommand", {
                "queued": queued,
                "waypoint": waypoint
            });
            queued = true;
        }
        var self = this;
        Trigger.prototype.StartCutscene = (data) => self.cinemaManagerScript.Cutscene(self.nodes);
        cmpTrigger.DoAfterDelay(5000, "StartCutscene", undefined);
    }
}

if (!g_FormationBannerScript) {
    var g_FormationBannerScript = new FormationBannerScript();
    Trigger.prototype.SendMoveCommand = (data) => g_FormationBannerScript.SendMoveCommand(data);
    g_FormationBannerScript.Start();
}
