// SPDX-License-Identifier: MIT
// SPDX-FileCopyrightText: © 2022 Stanislas Daniel Claude Dolcini
// SPDX-FileCopyrightText: © 2022 Lancelot de Ferrière le Vayer

class CinemaManagerScript {

    /**
     *
     * @param {string} pathName
     */
    constructor(pathName) {
        this.pathName = pathName;
    }

    ConvertFromXML(rawData) {
        for (const data of rawData) {
            let target = new Vector3D(data[2].x, data[2].y, data[2].z)
            let pos = new Vector3D(data[1].x, data[1].y, data[1].z)
            target.sub(pos);
            target.mult(0.01)
            data[2].x = target.x;
            data[2].y = target.y;
            data[2].z = target.z;
        }
        return rawData;
    }

    SetupCinematics() {
        const cmpRangeManager = Engine.QueryInterface(SYSTEM_ENTITY, IID_RangeManager);
        cmpRangeManager.SetLosRevealAll(-1, true);
    };

    SetupNodes(nodes) {
        const targets = [];
        const positions = [];
        for (const node of nodes) {
            const pos = new Vector3D(node[1].x, node[1].y, node[1].z);
            const dir = new Vector3D(node[2].x, node[2].y, node[2].z);
            targets.push({
                "deltaTime": node[0],
                "position": Vector3D.add(pos, Vector3D.mult(dir, 100)),
            });
            positions.push({
                "deltaTime": node[0],
                "position": pos,
            });
        }
        return {
            "targetNodes": targets,
            "positionNodes": positions
        };
    };

    Cutscene(nodes) {
        this.SetupCinematics();
        const cmpCinemaManager = Engine.QueryInterface(SYSTEM_ENTITY, IID_CinemaManager);
        if (!cmpCinemaManager)
            return;

        cmpCinemaManager.AddPath(Object.assign(
            {
                "name": this.pathName,
                "orientation": "target",
                "timescale": 1,
                "mode": "ease_inout",
                "style": "default"
            },
            this.SetupNodes(nodes)
        ));
        cmpCinemaManager.AddCinemaPathToQueue(this.pathName);
        cmpCinemaManager.Play();
    };

}

const KushiteCutscene = (new CinemaManagerScript()).ConvertFromXML([
	[0, { "x": 2150, "y": 390, "z": 950 }, { "x": 1900, "y": 350, "z": 950 }],
	[60, { "x": 1480, "y": 390, "z": 950 }, { "x": 1300, "y": 350, "z": 950 }]
]);

const HelmetDemoCutscene = (new CinemaManagerScript()).ConvertFromXML([
	[0, { "x": 208.2096, "y": 184.65247, "z": 748.13654, }, { "x": 225.03162, "y": 183.90957, "z": 693.49158, },],
	[4.5, { "x": 232.74585, "y": 184.22963, "z": 666.96326, }, { "x": 241.52544, "y": 184.08324, "z": 637.06318, },],
	[3, { "x": 242.05408, "y": 184.19777, "z": 635.9914, }, { "x": 255.11075, "y": 183.0537, "z": 605.27619, },],
	[3, { "x": 252.67441, "y": 183.4719, "z": 610.08991, }, { "x": 273.81406, "y": 183.18842, "z": 575.74592, },],
	[3, { "x": 271.58332, "y": 183.65928, "z": 578.80567, }, { "x": 309.45972, "y": 183.1624, "z": 532.33655, },],
	[4, { "x": 307.13733, "y": 183.33454, "z": 536.01136, }, { "x": 339.28827, "y": 180.7539, "z": 497.83735, },],
]);

const SweepingCutscene =  [
		[0, { "z": 952.2245483398438, "y": 162.2513427734375, "x": 978.9868774414062 }, { "z": -0.6833544969558716, "y": -0.5144144892692566, "x": -0.518077552318573 }],
		[3, { "z": 935.9642333984375, "y": 145.8859405517578, "x": 700.643310546875 }, { "z": -0.820662260055542, "y": -0.5144144892692566, "x": -0.24877941608428955 }],
		[3, { "z": 714.6177978515625, "y": 154.90171813964844, "x": 220.47262573242188 }, { "z": -0.5084906816482544, "y": -0.4847635328769684, "x": 0.7116470336914062 }],
		[3, { "z": 22.481937408447266, "y": 307.2760009765625, "x": 180.7207489013672 }, { "z": 0.636842668056488, "y": -0.6195410490036011, "x": 0.45891207456588745 }],
		[3, { "z": 5.273491382598877, "y": 309.7719421386719, "x": 898.6748046875 }, { "z": 0.5955502986907959, "y": -0.5458177924156189, "x": -0.5894088745117188 }],
];

const CircleAndZoomOut = [
    [0, { "z": 549.6591796875, "y": 292.5040588378906, "x": 1068.151611328125 }, { "z": -0.02293475903570652, "y": -0.5735764503479004, "x": -0.8188309073448181 }],
    [3, { "z": 144.80787658691406, "y": 292.50408935546875, "x": 936.2776489257812 }, { "z": 0.5375285148620605, "y": -0.5735764503479004, "x": -0.6181207299232483 }],
    [3, { "z": -44.683570861816406, "y": 310.8581848144531, "x": 399.8305358886719 }, { "z": 0.7933655977249146, "y": -0.5735764503479004, "x": 0.20391440391540527 }],
    [3, { "z": 549.28076171875, "y": 255.89651489257812, "x": 64.36898040771484 }, { "z": -0.14571207761764526, "y": -0.5735764503479004, "x": 0.8060881495475769 }],
    [4, { "z": 1054.8958740234375, "y": 582.2236938476562, "x": 337.3681335449219 }, { "z": -0.6032422184944153, "y": -0.7788953185081482, "x": 0.17152516543865204 }],
    [5, { "z": 1205.614990234375, "y": 1030.8682861328125, "x": 1053.8759765625 }, { "z": -0.5014714002609253, "y": -0.7788953185081482, "x": -0.37662771344184875 }],
];

const LowPassSweep = function (speed = 0.5) {
	return [
		[0, { "z": -112.52078247070312, "y": 215.32470703125, "x": 677.6026611328125 }, { "z": 0.8205944895744324, "y": -0.55849689245224, "x": -0.12126806378364563 }],
		[3 * speed, { "z": 121.81014251708984, "y": 215.32469177246094, "x": 731.4617309570312 }, { "z": 0.829461932182312, "y": -0.55849689245224, "x": 0.008612962439656258 }],
		[3 * speed, { "z": 439.1277770996094, "y": 215.3246307373047, "x": 870.178466796875 }, { "z": 0.6441696882247925, "y": -0.55849689245224, "x": -0.5226152539253235 }],
		[3 * speed, { "z": 871.84716796875, "y": 215.32456970214844, "x": 668.8464965820312 }, { "z": 0.5813797116279602, "y": -0.55849689245224, "x": 0.5916746854782104 }],
		[3 * speed, { "z": 1220.6146240234375, "y": 161.7267608642578, "x": 813.367919921875 }, { "z": 0.8185322880744934, "y": -0.55849689245224, "x": 0.13448473811149597 }],
		[3 * speed, { "z": 1522.921630859375, "y": 161.7267608642578, "x": 885.3181762695312 }, { "z": 0.8185322880744934, "y": -0.55849689245224, "x": 0.13448473811149597 }],
	];
};

/**
 * Get coordinates with `Engine.GetTerrainAtScreenPoint(mouseX, mouseY);` in the console.
 */
var CirclePoint = function (x, y, z, distance = 100.0, height = 100.0, speed = 0.5) {
	const nodes = [];
	for (let i = 0; i <= 8; ++i) {
		const cos = Math.cos(i / 4 * Math.PI);
		const sin = Math.sin(i / 4 * Math.PI);
		nodes.push([i === 0 ? 0 : 3, {
			"x": x + cos * distance,
			"y": y + height,
			"z": z + sin * distance,
		},
		{
			"x": -cos * distance, "y": -height, "z": -sin * distance
		}]);
	}
	return nodes;
};

Engine.RegisterGlobal("KushiteCutscene", KushiteCutscene)
Engine.RegisterGlobal("HelmetDemoCutscene", HelmetDemoCutscene)
Engine.RegisterGlobal("SweepingCutscene", SweepingCutscene)
Engine.RegisterGlobal("CircleAndZoomOut", CircleAndZoomOut)
Engine.RegisterGlobal("LowPassSweep", LowPassSweep)
Engine.RegisterGlobal("CinemaManagerScript", CinemaManagerScript)
