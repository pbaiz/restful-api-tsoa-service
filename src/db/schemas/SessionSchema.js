"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionSchema = void 0;
var mongoose_1 = require("mongoose");
exports.SessionSchema = new mongoose_1.Schema({
    _id: {
        type: mongoose_1.Schema.Types.ObjectId
    },
    dayHour: {
        type: {
            dayOfTheWeek: {
                type: mongoose_1.Schema.Types.String,
                required: true
            },
            initialHour: {
                type: mongoose_1.Schema.Types.String,
                required: true
            },
            finalHour: {
                type: mongoose_1.Schema.Types.String,
                required: true
            }
        },
        required: true
    },
    serviceId: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
    },
    instructorId: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
    },
    available: {
        type: mongoose_1.Schema.Types.Boolean,
        required: true,
        default: true
    },
    roomId: {
        type: mongoose_1.Schema.Types.String,
        required: true
    },
    waitingList: {
        type: [mongoose_1.Schema.Types.String],
        required: true
    }
});
