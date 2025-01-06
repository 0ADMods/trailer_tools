// SPDX-License-Identifier: MIT
// SPDX-FileCopyrightText: © 2022 Stanislas Daniel Claude Dolcini
// SPDX-FileCopyrightText: © 2022 Lancelot de Ferrière le Vayer

Trigger.prototype.ProcessCommand = function (cmd) {
    ProcessCommand(1, cmd);
}

const commands = [
    {
        time: 51 * 200,
        data: { "type": "construct", "template": "structures/athen/field", "x": 582.4905583969505, "z": 221.93121100277102, "angle": 2.356201171875, "actorSeed": 38369, "entities": [11076, 11077, 11078, 11079], "autorepair": true, "autocontinue": true, "queued": false, "pushFront": false, "formation": "special/formations/null" }
    },
    {
        time: 62 * 200,
        data: { "type": "construct", "template": "structures/athen/storehouse", "x": 529.35302734375, "z": 276.39569091796875, "angle": 2.356194490192345, "actorSeed": 35427, "entities": [11068, 11069, 11070, 11071], "autorepair": true, "autocontinue": true, "queued": false, "pushFront": false, "formation": "special/formations/null" }
    },
    {
        time: 73 * 200,
        data: { "type": "walk", "entities": [11067], "x": 760.6304321289062, "z": 865.3043823242188, "queued": false, "pushFront": false }
    }
]

for (const command of commands) {
    cmpTrigger.DoAfterDelay(command.time, "ProcessCommand", command.data);
}
