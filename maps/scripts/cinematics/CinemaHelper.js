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

    /**
     * Get start/end coordinates with `warn(JSON.stringify(Engine.GetTerrainAtScreenPoint(mouseX, mouseY)));`.
     * Get camera coordinates with `warn(JSON.stringify([Engine.GetCameraPosition(), Engine.GetCameraRotation()]))`
     */
    Travelling(cameraStart, cameraEnd, start, end)
    {
        start = new Vector3D(start.x, start.y, start.z);
        end = new Vector3D(end.x, end.y, end.z);
        cameraStart = new Vector3D(cameraStart.x, cameraStart.y, cameraStart.z);
        cameraEnd = new Vector3D(cameraEnd.x, cameraEnd.y, cameraEnd.z);
        const vec = Vector3D.sub(end, start).mult(0.2);
        const cvec = Vector3D.sub(cameraEnd, cameraStart).mult(0.2);
        return [
            [0, Vector3D.sub(cameraStart, cvec), Vector3D.sub(start, vec)],
            [2, cameraStart, start],
            [7, cameraEnd, end],
            [9, Vector3D.add(cameraEnd, cvec), Vector3D.add(end, vec)],
        ];
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

const SheepVideo = [
    [-3, {"z":1221.10791015625,"y":98.03709411621094,"x":776.4122314453125},{"z":-0.5085267424583435,"y":-0.4702669084072113,"x":-0.7212833166122437}],
    [3, {"z":1147.385009765625,"y":117.99891662597656,"x":736.833251953125},{"z":-0.18009012937545776,"y":-0.6027061343193054,"x":-0.7773756980895996}],
    [6, {"z":1030.09033203125,"y":135.5229034423828,"x":729.2747802734375},{"z":0.5244688391685486,"y":-0.6027061343193054,"x":-0.6013965606689453}],
    [12, {"z":798.718994140625,"y":232.4162139892578,"x":645.72216796875},{"z":0.8354641795158386,"y":-0.5479750037193298,"x":-0.04150788113474846}],
].map(x => {
    x[2] = Vector3D.add(x[1], Vector3D.mult(x[2], 100));
    return x;
});

const Croco = [
    [ 0, {"z":400,"y":113.28958892822266,"x":181.89434814453125},{"z":0.7450998425483704,"y":-0.49153631925582886,"x":0.45079734921455383}],
    [ 35, {"z":372.41339111328125,"y":113.28958892822266,"x":181.89434814453125},{"z":0.7450998425483704,"y":-0.49153631925582886,"x":0.45079734921455383}],
    [ 8, {"z":293.4562683105469,"y":67.50772857666016,"x":135.83969116210938},{"z":0.7570740580558777,"y":-0.2937043607234955,"x":0.5835894346237183}],
    [ 4, {"z":528.7643432617188,"y":48.75044250488281,"x":264.66973876953125},{"z":0.8401687145233154,"y":-0.2937043607234955,"x":0.45591041445732117}],
    [ 3, {"z":674.5556030273438,"y":39.3586540222168,"x":306.9540710449219},{"z":0.6703080534934998,"y":-0.2937043607234955,"x":0.6814872622489929}],
    [ 3, {"z":704.861083984375,"y":39.35865783691406,"x":420.5868225097656},{"z":0.917681872844696,"y":-0.2937043607234955,"x":0.26757755875587463}],
    [ 3, {"z":696.4364013671875,"y":86.93028259277344,"x":556.3152465820312},{"z":0.6251937747001648,"y":-0.5341529250144958,"x":-0.5690460801124573}],
    [ 4, {"z":928.5547485351562,"y":121.11668395996094,"x":680.943115234375},{"z":-0.46365004777908325,"y":-0.5341529250144958,"x":-0.7069011926651001}],
    [ 3, {"z":885.0640258789062,"y":121.11668395996094,"x":385.95770263671875},{"z":-0.40108436346054077,"y":-0.5341529250144958,"x":0.7441854476928711}],
    [ 3, {"z":727.73876953125,"y":70.24422454833984,"x":488.0421447753906},{"z":0.04931872710585594,"y":-0.3527924418449402,"x":0.9344009757041931}],
    [ 8, {"z":645.6234741210938,"y":75.24421691894531,"x":560.43994140625},{"z":0.4235682785511017,"y":-0.3527924418449402,"x":0.8343424797058105}],
        ].map(x => {
            x[2] = Vector3D.add(x[1], Vector3D.mult(x[2], 100));
            return x;
        });

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
 * 
 * @param {number} entity the name of the entity to focus on.
 * @param {number} speed speed of the cutsene. 
 * @returns 
 */
const Watch = function (entity, speed = 0.5, gameSpeed = 1) {
    const cmpPosition = Engine.QueryInterface(entity, IID_Position);
    const pos = cmpPosition.GetPosition();
    return [
        [0 * speed * gameSpeed,  Vector3D.add(pos, new Vector3D(20, 70, -100)), { "z": 0.8205944895744324, "y": -0.55849689245224, "x": -0.12126806378364563 }],
        [600 * speed * gameSpeed, Vector3D.add(pos, new Vector3D(280, 980, -1400)), { "z": 0.8205944895744324, "y": -0.55849689245224, "x": -0.12126806378364563 }],
    ];
}

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
Engine.RegisterGlobal("SheepVideo", SheepVideo)
Engine.RegisterGlobal("Croco", Croco)
Engine.RegisterGlobal("Watch", Watch)
Engine.RegisterGlobal("LowPassSweep", LowPassSweep)
Engine.RegisterGlobal("CinemaManagerScript", CinemaManagerScript)
