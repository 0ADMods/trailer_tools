// SPDX-License-Identifier: MIT
// SPDX-FileCopyrightText: © 2023 Stanislas Daniel Claude Dolcini

if(!global.SpawnInitialized)
{
    function SetupUnit(startPos, entityId, playerId)
    {
        const cmpOwnership = Engine.QueryInterface(entityId, IID_Ownership);
        if (cmpOwnership)
            cmpOwnership.SetOwner(playerId);
        const cmpPosition = Engine.QueryInterface(entityId, IID_Position);
        if (cmpPosition)
            cmpPosition.JumpTo(startPos.x, startPos.y)
    }


    Trigger.prototype.DelayedUnitSpawn = function () {
        const startPos = new Vector2D(512, 512);
        const civCenterId = Engine.AddEntity("structures/mace/civil_centre");
        SetupUnit(startPos, civCenterId, 1)
        const template = "units/mace/infantry_archer_b"
        TriggerHelper.SetUnitFormation(1, TriggerHelper.SpawnUnits(civCenterId, template, 5), "special/formations/box");
        TriggerHelper.SpawnGarrisonedUnits(civCenterId, template, 5)
        const startPosGate = new Vector2D(512, 550);
        const gate_id = Engine.AddEntity("structures/mace/wall_long");
        SetupUnit(startPosGate, gate_id, 1)
        TriggerHelper.SpawnTurretedUnits(gate_id, template, 5)
        const tower_1 = Engine.AddEntity("structures/mace/wall_tower");
        SetupUnit(new Vector2D(492, 550), tower_1, 1)
        const tower_2 = Engine.AddEntity("structures/mace/wall_tower");
        SetupUnit(new Vector2D(530, 550), tower_2, 1)
    };

    const cmpTrigger = Engine.QueryInterface(SYSTEM_ENTITY, IID_Trigger)
    cmpTrigger.DoAfterDelay(2000, "DelayedUnitSpawn", {});
    Engine.RegisterGlobal("SpawnInitialized", true)
}
