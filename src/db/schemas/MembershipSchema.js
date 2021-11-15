"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MembershipSchema = void 0;
var mongoose_1 = require("mongoose");
exports.MembershipSchema = new mongoose_1.Schema({
    state: {
        type: mongoose_1.Schema.Types.Boolean,
        required: true,
        default: true
    },
    clientId: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true
    },
    paymentId: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
    },
    creationDate: {
        type: mongoose_1.Schema.Types.String,
        required: true,
    },
    amountDays: {
        type: mongoose_1.Schema.Types.Number,
        required: true
    },
    amountSession: {
        type: mongoose_1.Schema.Types.Number,
        required: true
    },
    typeMembership: {
        type: mongoose_1.Schema.Types.String,
        required: true
    }
});
