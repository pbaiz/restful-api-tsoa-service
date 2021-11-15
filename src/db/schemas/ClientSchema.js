"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientSchema = void 0;
var mongoose_1 = require("mongoose");
exports.ClientSchema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true
    },
    pendingPayments: {
        type: [mongoose_1.Schema.Types.ObjectId],
        required: true,
        default: []
    },
    amount: {
        type: mongoose_1.Schema.Types.Decimal128,
        default: 0.00,
        required: true,
    },
    memberShips: {
        type: [mongoose_1.Schema.Types.ObjectId],
        default: [],
        required: true,
    },
    favoritesServices: {
        type: [mongoose_1.Schema.Types.ObjectId],
        default: [],
        required: true,
    },
    starLevel: {
        type: [mongoose_1.Schema.Types.Number],
        default: [],
        required: true,
    },
    notifications: {
        type: [mongoose_1.Schema.Types.String],
        default: [],
        required: true,
    }
});
