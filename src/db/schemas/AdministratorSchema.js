"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdministratorSchema = void 0;
var mongoose_1 = require("mongoose");
exports.AdministratorSchema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true
    },
});
