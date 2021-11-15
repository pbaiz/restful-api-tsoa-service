"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MembershipOfferSchema = void 0;
var mongoose_1 = require("mongoose");
exports.MembershipOfferSchema = new mongoose_1.Schema({
    payment: {
        type: {
            paymentType: {
                type: mongoose_1.Schema.Types.String,
                required: true,
                default: "Transferencia"
            },
            amount: {
                type: mongoose_1.Schema.Types.Decimal128,
                required: true,
                default: 0.00
            },
            date: {
                type: mongoose_1.Schema.Types.String,
                required: true,
                default: "No day setted"
            },
            subject: {
                type: mongoose_1.Schema.Types.String,
                required: true,
                default: "Pago sin motivo"
            },
        },
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
