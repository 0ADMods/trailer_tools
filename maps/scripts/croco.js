// SPDX-License-Identifier: MIT
// SPDX-FileCopyrightText: © 2022 Stanislas Daniel Claude Dolcini
// SPDX-FileCopyrightText: © 2022 Lancelot de Ferrière le Vayer


Trigger.prototype.ProcessCommand = function (cmd) {
    ProcessCommand(1, cmd);
}

var entities_01 = [6832, 6833, 6834, 6835, 6836, 6837, 6838, 6839, 6840, 6841, 6842, 6843, 6844, 6845, 6846, 6847, 6848, 6849, 6850, 6851, 6852, 6853, 6854, 6855, 6856, 6857, 6858, 6859, 6860, 6861, 6862, 6863, 6864, 6865, 6866, 6867, 6868, 6869, 6870, 6871, 6872, 6873, 6874, 6875, 6876, 6877, 6878, 6879, 6880, 6966, 6967, 6968, 6969];
var entities_02 = [6906, 6907, 6908, 6909, 6910, 6911, 6912, 6913, 6914, 6915, 6916, 6917, 6918, 6919, 6920, 6921, 6922, 6923, 6924, 6925, 6926, 6927, 6928, 6929, 6930, 6931, 6932, 6933, 6934, 6935, 6936, 6937, 6938, 6939, 6940, 6941, 6942, 6943, 6944, 6945, 6946, 6947, 6948, 6949, 6950, 6951, 6952, 6953, 6954, 6955, 6956, 6957, 6958, 6959, 6960, 6961, 6962, 6963, 6964, 6965, 6970];

const commands = [
    {
        time: 5400,
        data: { "type": "formation", "entities": entities_01, "formation": "special/formations/line_open" }
    },
    {
        time: 7000,
        data: { "type": "formation", "entities": entities_02, "formation": "special/formations/line_open" }
    },
    {
        time: 8000,
        data: { "type": "walk", "entities": entities_02, "x": 239.81610107421875, "z": 921.8214721679688, "queued": false, "pushFront": false }
    },
    {
        time: 10200,
        data: { "type": "walk", "entities": entities_01, "x": 529.69775390625, "z": 1017.346923828125, "queued": false, "pushFront": false }
    },
    {
        time: 10800,
        data: { "type": "walk", "entities": entities_01, "x": 519.748046875, "z": 997.1511840820312, "queued": true, "pushFront": false }
    },
    {
        time: 12800,
        data: { "type": "walk", "entities": entities_02, "x": 227.61105346679688, "z": 919.0947265625, "queued": false, "pushFront": false }
    },
    {
        time: 13200,
        data: { "type": "walk", "entities": entities_02, "x": 241.023193359375, "z": 910.264404296875, "queued": true, "pushFront": false }
    },
    {
        time: 27200,
        data: { "type": "walk", "entities": entities_01, "x": 418.28643798828125, "z": 841.62353515625, "queued": false, "pushFront": false }
    },
    {
        time: 29400,
        data: { "type": "walk", "entities": entities_02, "x": 411.6141052246094, "z": 826.0528564453125, "queued": false, "pushFront": false }
    },
    {
        time: 36400,
        data: { "type": "walk", "entities": entities_02, "x": 409.00384521484375, "z": 828.6730346679688, "queued": false, "pushFront": false }
    },
    {
        time: 39800,
        data: { "type": "walk", "entities": entities_01, "x": 452.82098388671875, "z": 842.4549560546875, "queued": false, "pushFront": false }
    },
    {
        time: 47000,
        data: { "type": "walk", "entities": [6832, 6833, 6834, 6835, 6836, 6837, 6838, 6839, 6840, 6841, 6842, 6843, 6844, 6845, 6846, 6847, 6848, 6849, 6850, 6851, 6852, 6853, 6854, 6855, 6856, 6857, 6858, 6859, 6860, 6861, 6862, 6863, 6864, 6865, 6866, 6867, 6868, 6869, 6870, 6871, 6872, 6873, 6874, 6875, 6876, 6877, 6878, 6879, 6880, 6906, 6907, 6908, 6909, 6910, 6911, 6912, 6913, 6914, 6915, 6916, 6917, 6918, 6919, 6920, 6921, 6922, 6923, 6924, 6925, 6926, 6927, 6928, 6929, 6930, 6931, 6932, 6933, 6934, 6935, 6936, 6937, 6938, 6939, 6940, 6941, 6942, 6943, 6944, 6945, 6946, 6947, 6948, 6949, 6950, 6951, 6952, 6953, 6954, 6955, 6956, 6957, 6958, 6959, 6960, 6961, 6962, 6963, 6964, 6965, 6966, 6967, 6968, 6969, 6970], "x": 510.59942626953125, "z": 741.3773803710938, "queued": false, "pushFront": false }
    },
    {
        time: 51000,
        data: { "type": "walk", "entities": [6832, 6833, 6834, 6835, 6836, 6837, 6838, 6839, 6840, 6841, 6842, 6843, 6844, 6845, 6846, 6847, 6848, 6849, 6850, 6851, 6852, 6853, 6854, 6855, 6856, 6857, 6858, 6859, 6860, 6861, 6862, 6863, 6864, 6865, 6866, 6867, 6868, 6869, 6870, 6871, 6872, 6873, 6874, 6875, 6876, 6877, 6878, 6879, 6880, 6906, 6907, 6908, 6909, 6910, 6911, 6912, 6913, 6914, 6915, 6916, 6917, 6918, 6919, 6920, 6921, 6922, 6923, 6924, 6925, 6926, 6927, 6928, 6929, 6930, 6931, 6932, 6933, 6934, 6935, 6936, 6937, 6938, 6939, 6940, 6941, 6942, 6943, 6944, 6945, 6946, 6947, 6948, 6949, 6950, 6951, 6952, 6953, 6954, 6955, 6956, 6957, 6958, 6959, 6960, 6961, 6962, 6963, 6964, 6965, 6966, 6967, 6968, 6969, 6970], "x": 523.1881103515625, "z": 740.572998046875, "queued": false, "pushFront": false }
    },
    {
        time: 56000,
        data: { "type": "walk", "entities": [6832, 6833, 6834, 6835, 6836, 6837, 6838, 6839, 6840, 6841, 6842, 6843, 6844, 6845, 6846, 6847, 6848, 6849, 6850, 6851, 6852, 6853, 6854, 6855, 6856, 6857, 6858, 6859, 6860, 6861, 6862, 6863, 6864, 6865, 6866, 6867, 6868, 6869, 6870, 6871, 6872, 6873, 6874, 6875, 6876, 6877, 6878, 6879, 6880, 6906, 6907, 6908, 6909, 6910, 6911, 6912, 6913, 6914, 6915, 6916, 6917, 6918, 6919, 6920, 6921, 6922, 6923, 6924, 6925, 6926, 6927, 6928, 6929, 6930, 6931, 6932, 6933, 6934, 6935, 6936, 6937, 6938, 6939, 6940, 6941, 6942, 6943, 6944, 6945, 6946, 6947, 6948, 6949, 6950, 6951, 6952, 6953, 6954, 6955, 6956, 6957, 6958, 6959, 6960, 6961, 6962, 6963, 6964, 6965, 6966, 6967, 6968, 6969, 6970], "x": 609.0391235351562, "z": 746.51171875, "queued": false, "pushFront": false }
    },
    {
        time: 67600,
        data: { "type": "walk", "entities": [6832, 6833, 6834, 6835, 6836, 6837, 6838, 6839, 6840, 6841, 6842, 6843, 6844, 6845, 6846, 6847, 6848, 6849, 6850, 6851, 6852, 6853, 6854, 6855, 6856, 6857, 6858, 6859, 6860, 6861, 6862, 6863, 6864, 6865, 6866, 6867, 6868, 6869, 6870, 6871, 6872, 6873, 6874, 6875, 6876, 6877, 6878, 6879, 6880, 6906, 6907, 6908, 6909, 6910, 6911, 6912, 6913, 6914, 6915, 6916, 6917, 6918, 6919, 6920, 6921, 6922, 6923, 6924, 6925, 6926, 6927, 6928, 6929, 6930, 6931, 6932, 6933, 6934, 6935, 6936, 6937, 6938, 6939, 6940, 6941, 6942, 6943, 6944, 6945, 6946, 6947, 6948, 6949, 6950, 6951, 6952, 6953, 6954, 6955, 6956, 6957, 6958, 6959, 6960, 6961, 6962, 6963, 6964, 6965, 6966, 6967, 6968, 6969, 6970], "x": 660.0772705078125, "z": 736.0963745117188, "queued": false, "pushFront": false }
    },
];


for (const command of commands) {
    cmpTrigger.DoAfterDelay(command.time, "ProcessCommand", command.data);
}




