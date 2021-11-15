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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MembershipService = void 0;
var API_1 = __importDefault(require("../API"));
var REFUNDSESSIONS = 1;
var SESSIONSAMOUNT = "SESSIONSAMOUNT";
var DAYSAMOUNT = "DAYSAMOUNT";
var MembershipService = /** @class */ (function () {
    function MembershipService(reqControllerRef) {
        this.reqControllerRef = reqControllerRef;
    }
    MembershipService.prototype.create = function (entity) {
        return API_1.default.entityRepository.create('membership', entity);
    };
    MembershipService.prototype.modify = function (oldEntityId, newEntity) {
        if (oldEntityId === void 0) { oldEntityId = ''; }
        return API_1.default.entityRepository.modify('membership', oldEntityId, newEntity);
    };
    MembershipService.prototype.delete = function (entityId) {
        return API_1.default.entityRepository.delete('membership', entityId);
    };
    MembershipService.prototype.get = function (filter, projection) {
        return API_1.default.entityRepository.get('membership', filter, projection);
    };
    MembershipService.prototype.getOne = function (entityId) {
        return API_1.default.entityRepository.getOne('membership', entityId);
    };
    MembershipService.prototype.createMembership = function (pMembership, clientId, pPayment) {
        return __awaiter(this, void 0, void 0, function () {
            var responseCreatedPayment, createdPaymentId, responseCreatedMembership, createdMembership, client, client2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.reqControllerRef.paymentService.create(pPayment)];
                    case 1:
                        responseCreatedPayment = _a.sent();
                        createdPaymentId = responseCreatedPayment.insertedId;
                        //Associate client to membership
                        pMembership.paymentId = createdPaymentId;
                        pMembership.clientId = clientId;
                        return [4 /*yield*/, this.create(pMembership)];
                    case 2:
                        responseCreatedMembership = _a.sent();
                        createdMembership = responseCreatedMembership.insertedId;
                        return [4 /*yield*/, this.reqControllerRef.clientService.getOne(clientId)];
                    case 3:
                        client = _a.sent();
                        client.memberships.push(createdMembership); //id de la memebresia
                        return [4 /*yield*/, this.reqControllerRef.clientService.modify(client._id, client)];
                    case 4:
                        client2 = _a.sent();
                        return [2 /*return*/, { message: "La membresia ha sido adquirida con exito",
                                success: true,
                                object: createdMembership
                            }];
                }
            });
        });
    };
    MembershipService.prototype.applyMembership = function (pMembershipId) {
        return __awaiter(this, void 0, void 0, function () {
            var membership, membership2, membership3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getOne(pMembershipId)];
                    case 1:
                        membership = _a.sent();
                        membership2 = membership.typeMembership === SESSIONSAMOUNT ?
                            this.applyMembershipByAmountSessions(membership) :
                            this.applyMembershipByDays(membership);
                        return [4 /*yield*/, this.modify(membership2._id, membership2)];
                    case 2:
                        membership3 = _a.sent();
                        return [2 /*return*/, { message: "Se ha aplicado su membresia",
                                success: true,
                                object: membership3.updatedElement
                            }];
                }
            });
        });
    };
    MembershipService.prototype.applyMembershipByAmountSessions = function (pActiveMembership) {
        pActiveMembership.state = pActiveMembership.sessionsAmount < 2 ? false : true;
        pActiveMembership.sessionsAmount = pActiveMembership.sessionsAmount - 1;
        return pActiveMembership;
    };
    MembershipService.prototype.applyMembershipByDays = function (pActiveMembership) {
        return pActiveMembership;
    };
    MembershipService.prototype.hasMembership = function (pClientId) {
        return __awaiter(this, void 0, void 0, function () {
            var client, memberships;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.reqControllerRef.clientService.getOne(pClientId)];
                    case 1:
                        client = _a.sent();
                        memberships = client.memberships;
                        return [2 /*return*/, memberships.length > 0];
                }
            });
        });
    };
    MembershipService.prototype.hasActiveMembership = function (pClientId) {
        return __awaiter(this, void 0, void 0, function () {
            var client, memberships, todayDate_1, membership_1, result, activeMembership, _a;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.hasMembership(pClientId)];
                    case 1:
                        if (!!(_b.sent())) return [3 /*break*/, 2];
                        return [2 /*return*/, { message: "No tiene ninguna membresia",
                                success: false,
                                object: null
                            }];
                    case 2: return [4 /*yield*/, this.reqControllerRef.clientService.getOne(pClientId)];
                    case 3:
                        client = _b.sent();
                        memberships = client.memberships;
                        todayDate_1 = new Date();
                        result = memberships.some(function (membershipId) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, this.reqControllerRef.membershipService.getOne(membershipId)];
                                    case 1:
                                        membership_1 = (_a.sent());
                                        membership_1.createdDate.setDate(membership_1.createdDate.getDate() + membership_1.daysAmount);
                                        return [2 /*return*/, membership_1.createdDate >= todayDate_1 || membership_1.sessionsAmount > 0];
                                }
                            });
                        }); });
                        if (!result) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.getActiveMembership(memberships)];
                    case 4:
                        _a = _b.sent();
                        return [3 /*break*/, 6];
                    case 5:
                        _a = null;
                        _b.label = 6;
                    case 6:
                        activeMembership = _a;
                        if (result) {
                            return [2 /*return*/, { message: "Tiene una membresia activa",
                                    success: result,
                                    object: activeMembership
                                }];
                        }
                        else {
                            return [2 /*return*/, { message: "No tiene una membresia activa",
                                    success: result,
                                    object: null
                                }];
                        }
                        _b.label = 7;
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    MembershipService.prototype.getActiveMembership = function (pMemberships) {
        return __awaiter(this, void 0, void 0, function () {
            var activeMembershipId, activeMembership;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        activeMembershipId = pMemberships.find(function (element) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, this.isActive(element)];
                                    case 1: return [2 /*return*/, _a.sent()];
                                }
                            });
                        }); });
                        return [4 /*yield*/, this.getOne(activeMembershipId)];
                    case 1:
                        activeMembership = _a.sent();
                        return [2 /*return*/, activeMembership];
                }
            });
        });
    };
    MembershipService.prototype.isDefaulter = function (pClientId) {
        return __awaiter(this, void 0, void 0, function () {
            var client, isDefaulter;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.reqControllerRef.clientService.getOne(pClientId)];
                    case 1:
                        client = _a.sent();
                        isDefaulter = client.pendingPayment.length > 0;
                        return [2 /*return*/, { message: isDefaulter ?
                                    "El cliente " + client.firstName + " " + client.lastName + ", esta moroso. \n                          Tiene " + client.pendingPayment.length + " cuentas pendientes."
                                    : "El cliente " + client.firstName + " " + client.lastName + ", no esta moroso.", success: isDefaulter }];
                }
            });
        });
    };
    MembershipService.prototype.itsAllowedToReserve = function (pClientId) {
        return __awaiter(this, void 0, void 0, function () {
            var hasActiveMembership, isDefaulter, itsAllowedToReserve, message;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.hasActiveMembership(pClientId)];
                    case 1:
                        hasActiveMembership = _a.sent();
                        return [4 /*yield*/, this.isDefaulter(pClientId)];
                    case 2:
                        isDefaulter = _a.sent();
                        itsAllowedToReserve = hasActiveMembership.success && !isDefaulter.success;
                        message = hasActiveMembership.success ? "Tiene una membresia activa" : "No tiene una membresia activa";
                        message = message + (isDefaulter.success ? " y esta moroso" : " y no esta moroso");
                        //Si puede reservar se muestra el mensaje que se puede reservar o porque no
                        return [2 /*return*/, { message: itsAllowedToReserve ?
                                    "El cliente puede reservar. " + message
                                    : "El cliente no puede reservar. " + message,
                                success: itsAllowedToReserve
                            }];
                }
            });
        });
    };
    MembershipService.prototype.applyCharge = function (pClientId, pPayment) {
        return __awaiter(this, void 0, void 0, function () {
            var responseCreatedPayment, createdPaymentId, client1, client2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.reqControllerRef.paymentService.create(pPayment)];
                    case 1:
                        responseCreatedPayment = _a.sent();
                        createdPaymentId = responseCreatedPayment.insertedId;
                        return [4 /*yield*/, this.reqControllerRef.clientService.getOne(pClientId)];
                    case 2:
                        client1 = _a.sent();
                        //Associate payment to Client
                        client1.pendingPayment.push(createdPaymentId);
                        return [4 /*yield*/, this.reqControllerRef.clientService.modify(client1._id, client1)];
                    case 3:
                        client2 = _a.sent();
                        return [2 /*return*/, { message: "Se le ha hecho el cargo a  " + client2.updatedElement.firstName + ", de: " + responseCreatedPayment.createdObject.amount + ".", success: true,
                                object: responseCreatedPayment.createdObject }];
                }
            });
        });
    };
    MembershipService.prototype.refund = function (pCliendId) {
        return __awaiter(this, void 0, void 0, function () {
            var client, activeMembershipId, membership, membership2, membership4, membership3;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.reqControllerRef.clientService.getOne(pCliendId)];
                    case 1:
                        client = _a.sent();
                        activeMembershipId = null;
                        return [4 /*yield*/, client.memberships.find(function (element) { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, this.isActive(element)];
                                        case 1: return [2 /*return*/, _a.sent()];
                                    }
                                });
                            }); })];
                    case 2:
                        activeMembershipId = _a.sent();
                        //Sino tiene ninguna membresia activa se envia la respuesta 
                        if (activeMembershipId === null) {
                            return [2 /*return*/, { message: "No se ha encontrado una membresia activa",
                                    success: false,
                                    object: null
                                }];
                        }
                        return [4 /*yield*/, this.getOne(activeMembershipId)];
                    case 3:
                        membership = _a.sent();
                        membership2 = membership.typeMembership === SESSIONSAMOUNT ?
                            this.refundMembershipByAmountSessions(membership) :
                            this.refundMembershipByDays(membership);
                        return [4 /*yield*/, this.getOne(activeMembershipId)];
                    case 4:
                        membership4 = _a.sent();
                        return [4 /*yield*/, this.modify(membership2._id, membership2)];
                    case 5:
                        membership3 = _a.sent();
                        return [2 /*return*/, { message: "Se ha hecho un reembolso a su cuenta",
                                success: true,
                                object: { old: membership4,
                                    updated: membership3.updatedElement
                                }
                            }];
                }
            });
        });
    };
    MembershipService.prototype.refundMembershipByAmountSessions = function (pMembership) {
        pMembership.sessionsAmount = pMembership.sessionsAmount + REFUNDSESSIONS;
        return pMembership;
    };
    MembershipService.prototype.refundMembershipByDays = function (pMembership) {
        return pMembership;
    };
    MembershipService.prototype.isActive = function (pMembresiaId) {
        return __awaiter(this, void 0, void 0, function () {
            var membresia, endDate, isExpired, isOutDays;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getOne(pMembresiaId)];
                    case 1:
                        membresia = _a.sent();
                        endDate = membresia.createdDate;
                        endDate.setDate(endDate.getDate() + membresia.daysAmount);
                        isExpired = new Date() > endDate;
                        isOutDays = membresia.sessionsAmount < 0;
                        return [2 /*return*/, !isOutDays || !isExpired];
                }
            });
        });
    };
    return MembershipService;
}());
exports.MembershipService = MembershipService;
