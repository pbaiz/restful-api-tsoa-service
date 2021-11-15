"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceSchema = void 0;
var mongoose_1 = require("mongoose");
exports.ServiceSchema = new mongoose_1.Schema({
    name: {
        type: mongoose_1.Schema.Types.String,
        required: true
    },
    description: {
        type: mongoose_1.Schema.Types.String,
        required: false,
    }
});
