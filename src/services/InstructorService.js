"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InstructorService = void 0;
var API_1 = __importDefault(require("../API"));
var Authenticator_1 = require("../auth/Authenticator");
var InstructorService = /** @class */ (function () {
    function InstructorService(reqControllerRef) {
        this.reqControllerRef = reqControllerRef;
    }
    InstructorService.prototype.create = function (entity) {
        return __awaiter(this, void 0, void 0, function () {
            var instructor, responseCreatedUser, createdUser, newInstructor, responseCreatedClient;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        instructor = entity;
                        return [4 /*yield*/, Authenticator_1.Authenticator.registerUser(instructor)];
                    case 1:
                        responseCreatedUser = _a.sent();
                        if (!responseCreatedUser.newUser)
                            return [2 /*return*/, responseCreatedUser];
                        createdUser = responseCreatedUser.newUser;
                        newInstructor = {
                            userId: createdUser._id,
                            category: '',
                            specialities: []
                        };
                        return [4 /*yield*/, API_1.default.entityRepository.create('instructor', newInstructor)];
                    case 2:
                        responseCreatedClient = _a.sent();
                        return [2 /*return*/, {
                                message: "El instructor se ha creado exitosamente",
                                success: true,
                                object: responseCreatedClient
                            }];
                }
            });
        });
    };
    InstructorService.prototype.modify = function (oldEntityId, newEntity) {
        if (oldEntityId === void 0) { oldEntityId = ''; }
        return API_1.default.entityRepository.modify('instructor', oldEntityId, newEntity);
    };
    InstructorService.prototype.delete = function (entityId) {
        return __awaiter(this, void 0, void 0, function () {
            var instructor, userId, _;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getOne(entityId)];
                    case 1:
                        instructor = _a.sent();
                        userId = instructor.userId;
                        return [4 /*yield*/, this.reqControllerRef.userService.delete(userId)];
                    case 2:
                        _ = _a.sent();
                        return [2 /*return*/, API_1.default.entityRepository.delete('instructor', entityId)];
                }
            });
        });
    };
    InstructorService.prototype.get = function (filter, projection) {
        return __awaiter(this, void 0, void 0, function () {
            var instructors, filledInstructors;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, API_1.default.entityRepository.get('instructor', filter, projection)];
                    case 1:
                        instructors = _a.sent();
                        return [4 /*yield*/, Promise.all(instructors.map(function (instructor) { return __awaiter(_this, void 0, void 0, function () {
                                var userId, otherAttrs, userInfo, services;
                                var _this = this;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            userId = instructor.userId, otherAttrs = __rest(instructor, ["userId"]);
                                            return [4 /*yield*/, API_1.default.entityRepository.getOne('users', userId, {}, { password: 0 })];
                                        case 1:
                                            userInfo = _a.sent();
                                            return [4 /*yield*/, Promise.all(otherAttrs.specialities.map(function (serviceId) { return __awaiter(_this, void 0, void 0, function () {
                                                    return __generator(this, function (_a) {
                                                        switch (_a.label) {
                                                            case 0: return [4 /*yield*/, API_1.default.entityRepository.getOne('services', serviceId)];
                                                            case 1: return [2 /*return*/, _a.sent()];
                                                        }
                                                    });
                                                }); }))];
                                        case 2:
                                            services = _a.sent();
                                            return [2 /*return*/, { _id: otherAttrs._id, user: userInfo, specialities: services, category: otherAttrs.category }];
                                    }
                                });
                            }); }))];
                    case 2:
                        filledInstructors = _a.sent();
                        return [2 /*return*/, filledInstructors];
                }
            });
        });
    };
    InstructorService.prototype.getOne = function (entityId) {
        return __awaiter(this, void 0, void 0, function () {
            var instructor, userId, otherAttrs, userInfo, services;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, API_1.default.entityRepository.getOne('instructor', entityId)];
                    case 1:
                        instructor = _a.sent();
                        userId = instructor.userId, otherAttrs = __rest(instructor, ["userId"]);
                        return [4 /*yield*/, API_1.default.entityRepository.getOne('users', userId, {}, { password: 0 })];
                    case 2:
                        userInfo = _a.sent();
                        return [4 /*yield*/, Promise.all(otherAttrs.specialities.map(function (serviceId) { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, API_1.default.entityRepository.getOne('services', serviceId)];
                                        case 1: return [2 /*return*/, _a.sent()];
                                    }
                                });
                            }); }))];
                    case 3:
                        services = _a.sent();
                        return [2 /*return*/, { _id: otherAttrs._id, user: userInfo, specialities: services, category: otherAttrs.category }];
                }
            });
        });
    };
    return InstructorService;
}());
exports.InstructorService = InstructorService;
