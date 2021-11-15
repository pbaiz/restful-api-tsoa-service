"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CalendarSchema = void 0;
var mongoose_1 = require("mongoose");
exports.CalendarSchema = new mongoose_1.Schema({
    roomId: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true
    },
    sessions: {
        type: [mongoose_1.Schema.Types.ObjectId],
        required: true,
        default: []
    },
    month: {
        type: mongoose_1.Schema.Types.String,
        required: true,
    },
    year: {
        type: mongoose_1.Schema.Types.String,
        required: true,
    },
    published: {
        type: mongoose_1.Schema.Types.Boolean,
        required: true,
        default: false
    }
});
