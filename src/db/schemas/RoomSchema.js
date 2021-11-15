"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomSchema = void 0;
var mongoose_1 = require("mongoose");
exports.RoomSchema = new mongoose_1.Schema({
    name: {
        type: mongoose_1.Schema.Types.String,
        required: true,
        default: "Sala sin nombre"
    },
    capacity: {
        type: mongoose_1.Schema.Types.Number,
        required: true,
        default: 10
    },
    allowedCapacity: {
        type: mongoose_1.Schema.Types.Number,
        required: true
    },
    semanalSchedule: {
        type: [{
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
            }],
        required: true,
        default: []
    },
    monthlyCalendar: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true
    }
});
