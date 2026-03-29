{
	const spawnPointAId = 11223;
	const offset = 2.0;
	const delay = 2000;
	const spawnPointPosition = Engine.QueryInterface(spawnPointAId, IID_Position)?.GetPosition();
	const cmpTrigger = Engine.QueryInterface(SYSTEM_ENTITY, IID_Trigger);

	Trigger.prototype.DeleteEntities = (data) =>
	{
		Engine.DestroyEntity(data.entity);
	};

	Trigger.prototype.SpawnEntities = (data) =>
	{
		const template = data.template;
		let ent = INVALID_ENTITY;
		if (template.includes("citizen_male"))
		{
			ent = Engine.AddEntity(template);
			const cmpPosition = Engine.QueryInterface(ent, IID_Position);
			if (!cmpPosition)
			{
				warn("Failed to get position for " + template);
				Engine.DestroyEntity(ent);
				return;
			}

			cmpPosition.JumpTo(spawnPointPosition.x - offset, spawnPointPosition.z);
			cmpPosition.SetYRotation(Math.PI * 3 / 4);
		}

		else if (template.includes("citizen_female"))
		{
			ent = Engine.AddEntity(template);
			const cmpPosition = Engine.QueryInterface(ent, IID_Position);
			if (!cmpPosition)
			{
				warn("Failed to get position for " + template);
				Engine.DestroyEntity(ent);
				return;
			}

			cmpPosition.JumpTo(spawnPointPosition.x + offset, spawnPointPosition.z);
			cmpPosition.SetYRotation(Math.PI);
		}

		cmpTrigger.DoAfterDelay(delay * 2, "DeleteEntities", {
			"entity": ent,
		});
	};
	if (spawnPointPosition)
	{
		const cmpTemplateManager = Engine.QueryInterface(SYSTEM_ENTITY, IID_TemplateManager);
		const allTemplates = cmpTemplateManager.FindAllTemplates(true);
		var templates = allTemplates.filter(template => template.includes("citizen_male") || template.includes("citizen_female"));
		let index = 1;
		for (const template of templates)
		{
			cmpTrigger.DoAfterDelay(delay * (index % 2 === 0 ? index - 1 : index), "SpawnEntities", {
				"template": template,
			});

			++index;
		}

		const scriptManager = new CinemaManagerScript("Germans R28");
		const cam = new CameraHelper(spawnPointPosition);

		cam.moveRight(3);
		cam.zoom(0.8);
		cam.moveForward(5);

		const pos = cam.getPosition();

		const points = [
			[0, pos, { "z": 0.8205, "y": -0.5585, "x": -0.1212 }],
			[10000, pos, { "z": 0.8205, "y": -0.5585, "x": -0.1212 }],
		];

		scriptManager.Cutscene(points);
	}
}
