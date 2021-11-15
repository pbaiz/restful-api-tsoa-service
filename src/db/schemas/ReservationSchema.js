"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReservationSchema = void 0;
var mongoose_1 = require("mongoose");
exports.ReservationSchema = new mongoose_1.Schema({
    sessionId: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true
    },
    clientId: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
    },
    creationDate: {
        type: mongoose_1.Schema.Types.String,
        required: true,
    }
});
