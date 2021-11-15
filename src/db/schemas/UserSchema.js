"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSchema = void 0;
var mongoose_1 = require("mongoose");
exports.UserSchema = new mongoose_1.Schema({
    _id: {
        type: mongoose_1.Schema.Types.ObjectId
    },
    username: {
        type: mongoose_1.Schema.Types.String,
        required: true
    },
    password: {
        type: mongoose_1.Schema.Types.String,
        required: true
    },
    role: {
        type: mongoose_1.Schema.Types.String,
        required: true
    },
    firstName: {
        type: mongoose_1.Schema.Types.String,
        required: true
    },
    lastName: {
        type: mongoose_1.Schema.Types.String,
        required: true
    },
    identification: {
        type: mongoose_1.Schema.Types.String,
        required: true
    },
    email: {
        type: mongoose_1.Schema.Types.String,
        required: true
    },
    phoneNumber: {
        type: mongoose_1.Schema.Types.String,
        required: true
    },
});
