"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnrollmentSchema = void 0;
var mongoose_1 = require("mongoose");
exports.EnrollmentSchema = new mongoose_1.Schema({
    clienteId: {
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
    }
});
