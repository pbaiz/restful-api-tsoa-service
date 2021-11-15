"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentSchema = void 0;
var mongoose_1 = require("mongoose");
exports.PaymentSchema = new mongoose_1.Schema({
    paymentType: {
        type: mongoose_1.Schema.Types.String,
        required: true,
        default: "Sinpe"
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
    }
});
