"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionService = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var API_1 = __importDefault(require("../API"));
var DateUtils_1 = require("../utils/DateUtils");
var SessionService = /** @class */ (function () {
    function SessionService(reqControllerRef) {
        this.reqControllerRef = reqControllerRef;
    }
    SessionService.prototype.create = function (entity) {
        return __awaiter(this, void 0, void 0, function () {
            var session;
            return __generator(this, function (_a) {
                session = entity;
                session.serviceId = new mongoose_1.default.mongo.ObjectId(session.serviceId);
                session.dayHour = !session.dayHour ? [] : session.dayHour;
                session.instructorId = new mongoose_1.default.mongo.ObjectId(session.instructorId);
                session.available = true;
                session.weekMode = !session.weekMode ? true : session.weekMode;
                session.waitingList = [];
                return [2 /*return*/, API_1.default.entityRepository.create('sessions', session)];
            });
        });
    };
    SessionService.prototype.modify = function (oldEntityId, newEntity) {
        return API_1.default.entityRepository.modify('sessions', oldEntityId, newEntity);
    };
    SessionService.prototype.delete = function (entityId) {
        return API_1.default.entityRepository.delete('sessions', entityId);
    };
    SessionService.prototype.get = function (filter, projection) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, API_1.default.entityRepository.get('sessions', filter, projection)];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result];
                }
            });
        });
    };
    SessionService.prototype.getCompleted = function (filter, projection) {
        return __awaiter(this, void 0, void 0, function () {
            var result, populatedData;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, API_1.default.entityRepository.get('sessions', __assign(__assign({}, filter), { weekMode: true }), projection)];
                    case 1:
                        result = _a.sent();
                        return [4 /*yield*/, Promise.all(result.map(function (session) { return __awaiter(_this, void 0, void 0, function () {
                                var serviceId, instructorId, sessionPart, _a, _b;
                                return __generator(this, function (_c) {
                                    switch (_c.label) {
                                        case 0:
                                            serviceId = session.serviceId, instructorId = session.instructorId, sessionPart = __rest(session, ["serviceId", "instructorId"]);
                                            _a = sessionPart;
                                            return [4 /*yield*/, this.reqControllerRef.serviceService.getOne(serviceId)];
                                        case 1:
                                            _a.service = _c.sent();
                                            _b = sessionPart;
                                            return [4 /*yield*/, this.reqControllerRef.instructorService.getOne(instructorId)];
                                        case 2:
                                            _b.instructor = _c.sent();
                                            return [2 /*return*/, sessionPart];
                                    }
                                });
                            }); }))];
                    case 2:
                        populatedData = _a.sent();
                        return [2 /*return*/, populatedData];
                }
            });
        });
    };
    SessionService.prototype.getAvailableAmount = function (pSessionId) {
        return __awaiter(this, void 0, void 0, function () {
            var reservations;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.reqControllerRef.reservationService.get({ sessionId: pSessionId }, {})];
                    case 1:
                        reservations = _a.sent();
                        //Revisar si queda almenos un cupo
                        return [2 /*return*/, reservations.length];
                }
            });
        });
    };
    SessionService.prototype.isNotAllowed = function (pSession, calendarSessions) {
        return __awaiter(this, void 0, void 0, function () {
            var sessionsId, calendarSessionsObj, result;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        sessionsId = calendarSessions.map(function (e) { return e.toString(); });
                        return [4 /*yield*/, Promise.all(sessionsId.map(function (sessionId) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, this.getOne(sessionId)];
                                    case 1: return [2 /*return*/, _a.sent()];
                                }
                            }); }); }))];
                    case 1:
                        calendarSessionsObj = _a.sent();
                        if (calendarSessionsObj.length == 0)
                            return [2 /*return*/, true];
                        result = calendarSessionsObj.some(function (session) {
                            var datesBySession = session.dayHour[0];
                            return ((datesBySession.dayOfTheWeek.toString() == pSession.dayHour[0].dayOfTheWeek.toString()) && _this.isBetween(datesBySession, pSession.dayHour[0]));
                        });
                        return [2 /*return*/, result];
                }
            });
        });
    };
    SessionService.prototype.isBetween = function (pDateValidated, pDateNonValidatedDate) {
        var inicial1 = this.getHourAsNumber(pDateValidated.initialHour);
        var final1 = this.getHourAsNumber(pDateValidated.finalHour);
        var inicial2 = this.getHourAsNumber(pDateNonValidatedDate.initialHour);
        var final2 = this.getHourAsNumber(pDateNonValidatedDate.finalHour);
        console.log(inicial1, final1, inicial2, final2, inicial1 >= inicial2 && inicial1 <= final2 ||
            final1 >= inicial2 && final1 <= final2);
        // [0] 1800 1900 1700 1750
        return inicial1 >= inicial2 && inicial1 <= final2 ||
            final1 >= inicial2 && final1 <= final2;
    };
    SessionService.prototype.getHourAsNumber = function (pHour) {
        var _a = pHour.split(':'), h = _a[0], m = _a[1];
        var hour = parseInt(h);
        var minutes = parseInt(m);
        return hour * 100 + minutes;
    };
    SessionService.prototype.addSessionToCalendar = function (sessionId, roomId) {
        return __awaiter(this, void 0, void 0, function () {
            var calendar, session, sessionByDay, minimalSessions, sessionsWithDates, calendarIntersection, allowed, sessionsWithFullDates, creationResult, _id, calendarWithoutId, calendarId, updatedInfo;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.reqControllerRef.calendarService.get({ roomId: new mongoose_1.default.mongo.ObjectID(roomId) }, {})];
                    case 1:
                        calendar = (_a.sent())[0];
                        return [4 /*yield*/, this.get({ _id: new mongoose_1.default.mongo.ObjectID(sessionId) }, {})];
                    case 2:
                        session = (_a.sent())[0];
                        sessionByDay = session.dayHour.map(function (dateDayHour) { return (__assign(__assign({}, session), { dayHour: dateDayHour })); });
                        minimalSessions = [];
                        sessionsWithDates = sessionByDay.reduce(function (acc, session) {
                            var _id = session._id, sessionWithoutId = __rest(session, ["_id"]);
                            var datesByDay = DateUtils_1.getDaysBetweenDates(session.dayHour.dayOfTheWeek);
                            var sessionsReplicated = datesByDay.map(function (date) {
                                return (__assign(__assign({}, sessionWithoutId), { dayHour: [{
                                            dayOfTheWeek: date,
                                            initialHour: session.dayHour.initialHour,
                                            finalHour: session.dayHour.finalHour
                                        }] }));
                            });
                            minimalSessions.push(sessionsReplicated[0]);
                            return __spreadArray(__spreadArray([], acc), sessionsReplicated);
                        }, []);
                        calendarIntersection = minimalSessions.every(function (session) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, this.isNotAllowed(session, calendar.sessions)];
                                    case 1: return [2 /*return*/, !(_a.sent())];
                                }
                            });
                        }); });
                        allowed = calendar.sessions.length === 0 || calendarIntersection;
                        if (!allowed) return [3 /*break*/, 5];
                        sessionsWithFullDates = sessionsWithDates.map(function (e) { return (__assign(__assign({}, e), { dayOfTheWeek: e.dayHour[0] })); });
                        return [4 /*yield*/, Promise.all(sessionsWithFullDates.map(function (session) { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            session.weekMode = false;
                                            session.roomId = roomId;
                                            return [4 /*yield*/, API_1.default.entityRepository.create('sessions', session)];
                                        case 1: return [2 /*return*/, _a.sent()];
                                    }
                                });
                            }); }))];
                    case 3:
                        creationResult = _a.sent();
                        _id = calendar._id, calendarWithoutId = __rest(calendar, ["_id"]);
                        calendarId = _id;
                        calendarWithoutId.sessions = __spreadArray(__spreadArray([], calendar.sessions), creationResult.map(function (session) { return session.insertedId; }));
                        calendarWithoutId.published = true;
                        return [4 /*yield*/, this.reqControllerRef.calendarService.modify(calendarId, calendarWithoutId)];
                    case 4:
                        updatedInfo = _a.sent();
                        return [2 /*return*/, {
                                message: "Se han agregado las sesiones para todos los dias del mes al calendario",
                                addedSessionAmount: sessionsWithFullDates.length,
                                success: true
                            }];
                    case 5: return [2 /*return*/, {
                            message: "No se pudo agregar la session al calendario de la sala, ya que existe al menos una sesion en el mismo horario semanal",
                            success: false
                        }];
                }
            });
        });
    };
    SessionService.prototype.getOne = function (entityId, filter, projection) {
        if (filter === void 0) { filter = {}; }
        if (projection === void 0) { projection = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var session, serviceId, instructorId, sessionPart, _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, API_1.default.entityRepository.getOne('sessions', entityId, filter, projection)];
                    case 1:
                        session = _c.sent();
                        serviceId = session.serviceId, instructorId = session.instructorId, sessionPart = __rest(session, ["serviceId", "instructorId"]);
                        _a = sessionPart;
                        return [4 /*yield*/, this.reqControllerRef.serviceService.getOne(serviceId)];
                    case 2:
                        _a.service = _c.sent();
                        _b = sessionPart;
                        return [4 /*yield*/, this.reqControllerRef.instructorService.getOne(instructorId)];
                    case 3:
                        _b.instructor = _c.sent();
                        return [2 /*return*/, sessionPart];
                }
            });
        });
    };
    SessionService.prototype.getClientsBySession = function (sessionId) {
        return __awaiter(this, void 0, void 0, function () {
            var reservationsOfTheSession, populateClients, gymSession, room, cantidadMaximaReservaciones;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.reqControllerRef.reservationService.get({ sessionId: sessionId }, {})];
                    case 1:
                        reservationsOfTheSession = _a.sent();
                        return [4 /*yield*/, Promise.all(reservationsOfTheSession.map(function (reservation) { return __awaiter(_this, void 0, void 0, function () {
                                var clientId, clientObj;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            clientId = reservation.clientId;
                                            return [4 /*yield*/, this.reqControllerRef.clientService.getClientWithAllInfo(clientId)];
                                        case 1:
                                            clientObj = _a.sent();
                                            return [2 /*return*/, clientObj];
                                    }
                                });
                            }); }))];
                    case 2:
                        populateClients = _a.sent();
                        return [4 /*yield*/, this.getOne(sessionId)];
                    case 3:
                        gymSession = _a.sent();
                        return [4 /*yield*/, this.reqControllerRef.roomService.getOne(gymSession.roomId)];
                    case 4:
                        room = _a.sent();
                        cantidadMaximaReservaciones = room.capacity / (100 / room.allowedCapacity);
                        return [2 /*return*/, { clients: populateClients,
                                aforoSesion: room.allowedCapacity,
                                cantidadSala: room.capacity,
                                cantidadMaximaReservaciones: cantidadMaximaReservaciones,
                                cantidadReservaciones: reservationsOfTheSession.length,
                                cupoDisponible: cantidadMaximaReservaciones - reservationsOfTheSession.length
                            }];
                }
            });
        });
    };
    SessionService.prototype.update = function (sesionObj) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var sesion, clientId, reservation, reservationInfo, notification;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        console.log('LISTA DE ESPERA CAMBIANDO');
                        sesion = sesionObj;
                        if (!((((_a = sesion.waitingList) === null || _a === void 0 ? void 0 : _a.length) || 0) > 0)) return [3 /*break*/, 2];
                        clientId = (_b = sesion.waitingList) === null || _b === void 0 ? void 0 : _b.shift();
                        console.log('IDClient', clientId);
                        reservation = {
                            creationDate: new Date().toString(),
                            clientId: clientId,
                            sessionId: sesion._id || ''
                        };
                        return [4 /*yield*/, this.reqControllerRef.reservationService.create(reservation)];
                    case 1:
                        reservationInfo = _c.sent();
                        notification = reservationInfo.success
                            ? "Haz salido de la lista de espera y ahora te encuentras registrado para participar de la sesion: Detalles: " + reservationInfo.message
                            : "Se ha intentado reservar a su nombre en la sesion pero no se ha logrado. Detalles : " + reservationInfo.message;
                        console.log('NOTIF', notification);
                        this.reqControllerRef.clientService.addNotification(clientId, notification);
                        return [3 /*break*/, 2];
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    SessionService.prototype.enqueueWaitingList = function (sessionId, clientId) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _id, sessionWithoutId, sInfo;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.getOne(sessionId)];
                    case 1:
                        _a = _b.sent(), _id = _a._id, sessionWithoutId = __rest(_a, ["_id"]);
                        if (!sessionWithoutId.waitingList) {
                            sessionWithoutId.waitingList = [];
                        }
                        sessionWithoutId.waitingList.push(clientId); // poner al cliente al final de la cola para la sesion deseada
                        return [4 /*yield*/, this.modify(_id || '', sessionWithoutId)];
                    case 2:
                        sInfo = _b.sent();
                        if (sInfo.modifiedCount > 0) {
                            return [2 /*return*/, {
                                    sucess: true,
                                    message: "Has sido agregado al final de la lista de espera de la sesion, eres el numero " + sessionWithoutId.waitingList.length + " seras agregado una vez se libere el campo"
                                }];
                        }
                        else {
                            return [2 /*return*/, {
                                    sucess: false,
                                    message: "No has sido agregado al final de la lista de espera de la sesion"
                                }];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    return SessionService;
}());
exports.SessionService = SessionService;
