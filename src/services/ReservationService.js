"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
exports.ReservationService = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var API_1 = __importDefault(require("../API"));
var WaitingListPublisher_1 = require("../model/patterns/waiting_list-reward_checker/WaitingListPublisher");
var previousHours = 8;
var ReservationService = /** @class */ (function (_super) {
    __extends(ReservationService, _super);
    function ReservationService(reqControllerRef) {
        var _this = _super.call(this) || this;
        _this.reqControllerRef = reqControllerRef;
        // suscribimos al servicio de sesiones estar pendiente de las reservaciones 
        // para actualizar la lista de espera de la sesion donde se cancela alguna reservacion
        _this.subscribe(_this.reqControllerRef.sessionService);
        return _this;
    }
    ReservationService.prototype.create = function (entity) {
        return __awaiter(this, void 0, void 0, function () {
            var clientId, client, responseActiveMembership, activeMembership, responseCanReservate, responseReservation, reservation;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        clientId = entity.clientId;
                        return [4 /*yield*/, this.reqControllerRef.clientService.getOne(clientId)];
                    case 1:
                        client = _a.sent();
                        return [4 /*yield*/, this.reqControllerRef.membershipService.hasActiveMembership(clientId)];
                    case 2:
                        responseActiveMembership = _a.sent();
                        activeMembership = responseActiveMembership.object;
                        return [4 /*yield*/, this.canReservate(entity)];
                    case 3:
                        responseCanReservate = _a.sent();
                        if (!responseCanReservate.success) {
                            //Si no puede reservar entonces retornar ese mensaje
                            return [2 /*return*/, responseCanReservate];
                        }
                        return [4 /*yield*/, API_1.default.entityRepository.create('reservation', entity)];
                    case 4:
                        responseReservation = _a.sent();
                        reservation = responseReservation.createdObject;
                        //Aplicar la membresia y quitarle al cantidad de sesiones de ser necesario
                        this.reqControllerRef.membershipService.applyMembership(activeMembership._id);
                        return [2 /*return*/, { message: "Se ha creado la reservacion al cliente " + responseCanReservate.message, success: true,
                                object: reservation }];
                }
            });
        });
    };
    ReservationService.prototype.modify = function (oldEntityId, newEntity) {
        if (oldEntityId === void 0) { oldEntityId = ''; }
        return API_1.default.entityRepository.modify('reservation', oldEntityId, newEntity);
    };
    ReservationService.prototype.delete = function (entityId) {
        return API_1.default.entityRepository.delete('reservation', entityId);
    };
    ReservationService.prototype.get = function (filter, projection) {
        return API_1.default.entityRepository.get('reservation', filter, projection);
    };
    ReservationService.prototype.getOne = function (entityId) {
        return API_1.default.entityRepository.getOne('reservation', entityId);
    };
    ReservationService.prototype.cancelReservation = function (reservationId) {
        return __awaiter(this, void 0, void 0, function () {
            var reservation, session, responseRefund, _;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.get({ _id: new mongoose_1.default.mongo.ObjectID(reservationId) }, {})];
                    case 1:
                        reservation = (_a.sent())[0];
                        return [4 /*yield*/, this.reqControllerRef.sessionService.get({ _id: new mongoose_1.default.mongo.ObjectID(reservation.sessionId) }, {})];
                    case 2:
                        session = (_a.sent())[0];
                        return [4 /*yield*/, this.delete(reservationId)];
                    case 3:
                        _ = _a.sent();
                        // notificamos a los subscriptores
                        // sobre la cancelacion de la reservacion a esta sesion
                        return [4 /*yield*/, this.notifySubscribers(session)];
                    case 4:
                        // notificamos a los subscriptores
                        // sobre la cancelacion de la reservacion a esta sesion
                        _a.sent();
                        // se revisa si es necesario efectuar la multa o devolver la membresia al estado anterior a la reservacion
                        if (this.isReservationRefund(reservation, session)) {
                            responseRefund = this.reqControllerRef.membershipService.refund(reservation.clientId);
                            //eliminar la session
                            return [2 /*return*/, responseRefund];
                        }
                        else {
                            return [2 /*return*/, { message: "No se ha efectuado el reembolso por normas de cancelacion",
                                    success: false,
                                    object: {}
                                }];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    ReservationService.prototype.isReservationRefund = function (reservation, session) {
        //obtener las horas y minutos en formato de string
        var _a = session.dayHour[0].initialHour.split(':'), h = _a[0], m = _a[1];
        //crear un Date, con la fecha de esa session
        var eightPreviousHoursSession = new Date(session.dayHour[0].dayOfTheWeek);
        //Setear las hours y los minutos
        eightPreviousHoursSession.setHours((parseInt(h) - previousHours));
        eightPreviousHoursSession.setMinutes(parseInt(m));
        //Obtener el date de la creacion de la reservation
        var reservationDate = new Date(reservation.creationDate);
        return reservationDate < eightPreviousHoursSession;
    };
    ReservationService.prototype.canReservate = function (reservation) {
        return __awaiter(this, void 0, void 0, function () {
            var clientId, sessionId, responseQuoat, responseItsAllowedToReserve, successMessage, canReservate, errorMessage, isNotQuoatAndIsNotAllowedToReserve;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        clientId = reservation.clientId;
                        sessionId = reservation.sessionId;
                        return [4 /*yield*/, this.isThereQuota(sessionId)];
                    case 1:
                        responseQuoat = _a.sent();
                        if (!responseQuoat.success)
                            return [2 /*return*/, responseQuoat];
                        return [4 /*yield*/, this.reqControllerRef.membershipService.itsAllowedToReserve(clientId)];
                    case 2:
                        responseItsAllowedToReserve = _a.sent();
                        successMessage = "Puede reservar, hay cupo y el cliente tiene permitido reservar.";
                        canReservate = responseQuoat.success && responseItsAllowedToReserve.success;
                        errorMessage = responseQuoat.success ? responseItsAllowedToReserve.message : responseQuoat.message;
                        isNotQuoatAndIsNotAllowedToReserve = !responseQuoat.success && !responseItsAllowedToReserve.success;
                        //De no cumplir las dos entonces concatenar los mensajes
                        errorMessage = isNotQuoatAndIsNotAllowedToReserve ? responseItsAllowedToReserve.message + " y " + responseQuoat.message : errorMessage;
                        //Si puede reservar mostrar el mensaje de exito, sino el de error y agregar si se puede reservar o no
                        return [2 /*return*/, { message: canReservate ? successMessage : errorMessage,
                                success: canReservate
                            }];
                }
            });
        });
    };
    ReservationService.prototype.isThereQuota = function (pSessionId) {
        return __awaiter(this, void 0, void 0, function () {
            var session, roomId, room, allowedCapacity, reservationsAmount, canReserve;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.reqControllerRef.sessionService.getOne(pSessionId)];
                    case 1:
                        session = _a.sent();
                        roomId = session.roomId;
                        return [4 /*yield*/, this.reqControllerRef.roomService.getOne(roomId)];
                    case 2:
                        room = _a.sent();
                        allowedCapacity = room.allowedCapacity;
                        return [4 /*yield*/, this.reqControllerRef.sessionService.getAvailableAmount(pSessionId)];
                    case 3:
                        reservationsAmount = _a.sent();
                        canReserve = reservationsAmount < (room.capacity) * (allowedCapacity / 100);
                        //dar mensaje que no quedan mas cupos
                        return [2 /*return*/, { message: canReserve ? "Aun existen cupos para reservar en la session indicada" : "No existen mas cupos para la session indicada",
                                success: canReserve,
                                waitingChance: !canReserve }];
                }
            });
        });
    };
    ReservationService.prototype.getReservationByClient = function (clientId) {
        return __awaiter(this, void 0, void 0, function () {
            var reservations, populatedReservations;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.reqControllerRef.reservationService.get({ clientId: clientId }, {})];
                    case 1:
                        reservations = _a.sent();
                        return [4 /*yield*/, Promise.all(reservations.map(function (reservation) { return __awaiter(_this, void 0, void 0, function () {
                                var clientId, sessionId, creationDate, sessionObj, clientObj;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            clientId = reservation.clientId;
                                            sessionId = reservation.sessionId;
                                            creationDate = reservation.creationDate;
                                            return [4 /*yield*/, this.reqControllerRef.sessionService.getOne(sessionId)];
                                        case 1:
                                            sessionObj = _a.sent();
                                            return [4 /*yield*/, this.reqControllerRef.clientService.getOne(clientId)];
                                        case 2:
                                            clientObj = _a.sent();
                                            return [2 /*return*/, {
                                                    session: sessionObj,
                                                    client: clientObj,
                                                    creationDate: creationDate,
                                                    _id: reservation._id
                                                }];
                                    }
                                });
                            }); }))];
                    case 2:
                        populatedReservations = _a.sent();
                        return [2 /*return*/, populatedReservations];
                }
            });
        });
    };
    ReservationService.prototype.subscribe = function (subscriber) {
        this.subscribers.push(subscriber);
    };
    ReservationService.prototype.notifySubscribers = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                this.subscribers.forEach(function (subscriber) { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, subscriber.update(data)];
                            case 1:
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                }); });
                return [2 /*return*/];
            });
        });
    };
    ReservationService.prototype.unsubscribe = function (subscriber) {
        this.subscribers = this.subscribers.filter(function (s) { return s !== subscriber; });
    };
    return ReservationService;
}(WaitingListPublisher_1.WaitingListPublisher));
exports.ReservationService = ReservationService;
