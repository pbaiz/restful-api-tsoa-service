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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CalendarService = void 0;
var API_1 = __importDefault(require("../API"));
var mongoose_1 = __importDefault(require("mongoose"));
var FilterByInstructor_1 = require("../model/patterns/calendar_filters/FilterByInstructor");
var FilterByService_1 = require("../model/patterns/calendar_filters/FilterByService");
var FilterByDate_1 = require("../model/patterns/calendar_filters/FilterByDate");
var FilterByMonth_1 = require("../model/patterns/calendar_filters/FilterByMonth");
var monthNames = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
];
var CalendarService = /** @class */ (function () {
    function CalendarService(reqControllerRef, filterStrategy) {
        this.reqControllerRef = reqControllerRef;
        this.filterStrategy = filterStrategy;
    }
    CalendarService.prototype.setStrategy = function (pStrategyMode) {
        switch (pStrategyMode) {
            case 0:
                this.filterStrategy = new FilterByInstructor_1.FilterByInstructor();
                break;
            case 1:
                this.filterStrategy = new FilterByDate_1.FilterByDate();
                break;
            case 2:
                this.filterStrategy = new FilterByMonth_1.FilterByMonth();
                break;
            case 3:
                this.filterStrategy = new FilterByService_1.FilterByService();
                break;
        }
    };
    CalendarService.prototype.filterCalendar = function (roomId, filter) {
        return __awaiter(this, void 0, void 0, function () {
            var calendar, sessions, sessionsObjs, calendarWithSessions;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getCalendarByRoom(roomId)];
                    case 1:
                        calendar = _a.sent();
                        sessions = calendar.sessions;
                        this.setStrategy(filter.strategyMode);
                        sessionsObjs = this.filterStrategy.filter(sessions, filter);
                        calendarWithSessions = __assign(__assign({}, calendar), { success: true, sessions: sessionsObjs, month: monthNames[new Date().getMonth()] });
                        return [2 /*return*/, calendarWithSessions];
                }
            });
        });
    };
    CalendarService.prototype.create = function (entity) {
        return API_1.default.entityRepository.create('calendar', entity);
    };
    CalendarService.prototype.modify = function (oldEntityId, newEntity) {
        if (oldEntityId === void 0) { oldEntityId = ''; }
        return API_1.default.entityRepository.modify('calendar', oldEntityId, newEntity);
    };
    CalendarService.prototype.delete = function (entityId) {
        return API_1.default.entityRepository.delete('calendar', entityId);
    };
    CalendarService.prototype.get = function (filter, projection) {
        return API_1.default.entityRepository.get('calendar', filter, projection);
    };
    CalendarService.prototype.getOne = function (entityId) {
        return API_1.default.entityRepository.getOne('calendar', entityId);
    };
    CalendarService.prototype.publishCalendar = function (calendarId) {
        return __awaiter(this, void 0, void 0, function () {
            var calendar, room, modifyCalendar;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getOne(calendarId)];
                    case 1:
                        calendar = _a.sent();
                        if (calendar.published)
                            return [2 /*return*/, {
                                    message: "El calendario de este mes ya ha sido publicado",
                                    success: false,
                                    object: calendar
                                }];
                        return [4 /*yield*/, this.reqControllerRef.roomService.getOne(calendar.roomId)];
                    case 2:
                        room = _a.sent();
                        calendar.published = true;
                        room.monthlyCalendar = calendar;
                        return [4 /*yield*/, this.modify(calendar._id, calendar)];
                    case 3:
                        modifyCalendar = _a.sent();
                        return [4 /*yield*/, this.reqControllerRef.roomService.modify(room._id, room)];
                    case 4:
                        _a.sent();
                        return [2 /*return*/, {
                                message: "Calendario publicado con exito",
                                success: true,
                                object: modifyCalendar
                            }];
                }
            });
        });
    };
    CalendarService.prototype.getCalendarByRoom = function (roomId) {
        return __awaiter(this, void 0, void 0, function () {
            var calendar, sessions, sessionsObjs, now, calendarWithSessions;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.get({ roomId: new mongoose_1.default.mongo.ObjectId(roomId),
                            month: new Date().getMonth().toString(),
                            year: new Date().getFullYear().toString(),
                            published: true }, {})];
                    case 1:
                        calendar = (_a.sent())[0];
                        if (!calendar)
                            return [2 /*return*/, {
                                    message: "Calendario oficial de la sala para el mes " + monthNames[new Date().getMonth()] + " aun no se ha publicado",
                                    success: false,
                                    monthName: new Date().getMonth()
                                }];
                        sessions = calendar.sessions;
                        if (!sessions || sessions.length === 0)
                            return [2 /*return*/, []];
                        return [4 /*yield*/, Promise.all(sessions.map(function (sessionId) { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, this.reqControllerRef.sessionService.getOne(sessionId)];
                                        case 1: return [2 /*return*/, _a.sent()];
                                    }
                                });
                            }); }))];
                    case 2:
                        sessionsObjs = _a.sent();
                        now = new Date();
                        sessionsObjs = sessionsObjs.filter(function (session) {
                            var sessionDate = session.dayOfTheWeek.dayOfTheWeek;
                            var d = new Date(sessionDate);
                            return d > now;
                        });
                        calendarWithSessions = __assign(__assign({}, calendar), { success: true, sessions: sessionsObjs, month: monthNames[new Date().getMonth()] });
                        return [2 /*return*/, calendarWithSessions];
                }
            });
        });
    };
    return CalendarService;
}());
exports.CalendarService = CalendarService;
