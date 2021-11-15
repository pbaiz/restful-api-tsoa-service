"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InstructorSchema = void 0;
var mongoose_1 = require("mongoose");
exports.InstructorSchema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true
    },
    category: {
        type: mongoose_1.Schema.Types.String,
        required: true,
        default: 'Fijo'
    },
    specialities: {
        type: [mongoose_1.Schema.Types.ObjectId],
        required: true,
        default: [],
    }
});
