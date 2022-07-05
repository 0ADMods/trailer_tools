// SPDX-License-Identifier: MIT
// SPDX-FileCopyrightText: © 2022 Stanislas Daniel Claude Dolcini

{
    function SetupUnit(entityId)
    {
        const cmpOwnership = Engine.QueryInterface(entityId, IID_Ownership);
        if (cmpOwnership)
            cmpOwnership.SetOwner(playerId);
        const cmpPosition = Engine.QueryInterface(entityId, IID_Position);
        if (cmpPosition)
            cmpPosition.JumpTo(startPos.x, startPos.y)
    }

    const startPos = new Vector2D(512, 512);
    const playerId = 1;
    const testUnitId = Engine.AddEntity("units/rome/infantry_spearman_e");
    SetupUnit(testUnitId);
    const fleeUnitId = Engine.AddEntity("units/rome/infantry_spearman_e");
    SetupUnit(fleeUnitId);


    const cmpUnitAI = Engine.QueryInterface(testUnitId, IID_UnitAI);
    if (cmpUnitAI)
    {
        cmpUnitAI.SetSpeedMultiplier(cmpUnitAI.GetRunMultiplier());
        for(let i = 0; i < 512; ++i)
        ProcessCommand(playerId, {
            // binaries/data/mods/public/simulation/helpers/Commands.js
            "type": "walk",
            "entities": [testUnitId],
            "x": 512 + i,
            "z": 512 + i  + (i % 10 === 0 ? 10 * Math.sin(i) : 0),
            "queued": true
        });
    }
}

Trigger.prototype.StartCutscene = function () {
    const cinemaManagerScript = new CinemaManagerScript("A26 Han");
    let nodes = [
        [0, { "x": 2150, "y": 390, "z": 950 }, { "x": 1900, "y": 350, "z": 950 }],
        [30, { "x": 1480, "y": 390, "z": 950 }, { "x": 1300, "y": 350, "z": 950 }]
    ];
    nodes = cinemaManagerScript.ConvertFromXML(nodes);
    cinemaManagerScript.Cutscene(nodes);
};

const cmpTrigger = Engine.QueryInterface(SYSTEM_ENTITY, IID_Trigger);
cmpTrigger.RegisterTrigger("OnInitGame", "StartCutscene", { "enabled": true });
