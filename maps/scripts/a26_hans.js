// SPDX-License-Identifier: MIT
// SPDX-FileCopyrightText: © 2022 Stanislas Daniel Claude Dolcini

const periclesId = 18521;
let cmpEntPosition = Engine.QueryInterface(periclesId, IID_Position);
let pos = cmpEntPosition.GetPosition();
const gaia = 0;
const priests = [
    18476,18477,18478
]
var ritualAnimations = {
	"healer": ["attack_capture", "promotion", "heal"]
};
for (let ent of priests)
{
    let cmpUnitAI = Engine.QueryInterface(ent, IID_UnitAI);
    if (!cmpUnitAI || cmpUnitAI.GetCurrentState() != "INDIVIDUAL.IDLE")
        continue;

    let cmpIdentity = Engine.QueryInterface(ent, IID_Identity);
    if (!cmpIdentity)
        continue;

    let animations = ritualAnimations[
        cmpIdentity.HasClass("Healer") ? "healer" :
        cmpIdentity.HasClass("Female") ? "female" : "male"];

    let cmpVisual = Engine.QueryInterface(ent, IID_Visual);
    if (!cmpVisual)
        continue;

    if (animations.indexOf(cmpVisual.GetAnimationName()) == -1)
        cmpVisual.SelectAnimation(pickRandom(animations), false, 1, "");
}

Trigger.prototype.RunExperiment = function()
{
    ProcessCommand(gaia, {
        "type": "garrison",
        "entities": [18488, 18487, 18489],
        "target": 9270,
    });

    ProcessCommand(gaia, {
        "type": "garrison",
        "entities": [18525],
        "target": 9270,
    });
};

ProcessCommand(gaia, {
    "type": "walk",
    "entities": [periclesId, 18522, 18523],
    "x": 1400,
    "z": pos.z,
    "queued": true,
    "force": true,
    "formation": "special/formations/battle_line"
});


ProcessCommand(gaia, {
    "type": "walk",
    "entities": [16070],
    "x": 2002,
    "z": 746,
    "queued": true,
    "force": true,
    "formation": "special/formations/battle_line"
});

// Boats

ProcessCommand(gaia, {
    "type": "walk",
    "entities": [16070],
    "x": 1979,
    "z": 1000,
});

ProcessCommand(gaia, {
    "type": "walk",
    "entities": [16077],
    "x": 1935,
    "z": 971,
});

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
cmpTrigger.DoAfterDelay(4000, "RunExperiment", undefined);
