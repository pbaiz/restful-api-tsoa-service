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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestController = void 0;
var MembershipOfferService_1 = require("./../services/MembershipOfferService");
var tsoa_1 = require("tsoa");
var SessionService_1 = require("./../services/SessionService");
var ServiceService_1 = require("../services/ServiceService");
var UserService_1 = require("../services/UserService");
var RoomService_1 = require("../services/RoomService");
var InstructorService_1 = require("../services/InstructorService");
var CalendarService_1 = require("../services/CalendarService");
var ReservationService_1 = require("../services/ReservationService");
var MembershipService_1 = require("../services/MembershipService");
var PaymentService_1 = require("../services/PaymentService");
var ClientService_1 = require("./../services/ClientService");
var FilterByInstructor_1 = require("../model/patterns/calendar_filters/FilterByInstructor");
/**
 * @description Request controller
 * The request handler to invoke the respective service
 * associated with some business logic
 */
var RequestController = /** @class */ (function (_super) {
    __extends(RequestController, _super);
    function RequestController() {
        var _this = _super.call(this) || this;
        _this.sessionService = new SessionService_1.SessionService(_this);
        _this.serviceService = new ServiceService_1.ServiceService(_this);
        _this.userService = new UserService_1.UserService(_this);
        _this.clientService = new ClientService_1.ClientService(_this);
        _this.roomService = new RoomService_1.RoomService(_this);
        _this.calendarService = new CalendarService_1.CalendarService(_this, new FilterByInstructor_1.FilterByInstructor());
        _this.reservationService = new ReservationService_1.ReservationService(_this);
        _this.membershipService = new MembershipService_1.MembershipService(_this);
        _this.paymentService = new PaymentService_1.PaymentService(_this);
        _this.instructorService = new InstructorService_1.InstructorService(_this);
        _this.membershipOfferService = new MembershipOfferService_1.MembershipOfferService(_this);
        return _this;
    }
    // SESSIONS ---------------------------------------------------------------------------------
    RequestController.prototype.getSessions = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.sessionService.get(params.filter, params.projection)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    RequestController.prototype.getCompletedSessions = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.sessionService.getCompleted(params.filter, params.projection)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    RequestController.prototype.createSession = function (session) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.sessionService.create(session)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    RequestController.prototype.deleteSession = function (sessionId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.sessionService.delete(sessionId)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    RequestController.prototype.updateSession = function (session) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.sessionService.modify(session.sessionId, session.updatedSession)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    RequestController.prototype.addSessionToCalendar = function (sessionId, roomId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.sessionService.addSessionToCalendar(sessionId, roomId)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    RequestController.prototype.getClientsBySession = function (sessionId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.sessionService.getClientsBySession(sessionId)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    RequestController.prototype.enqueueWaitingList = function (waitingClient) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.sessionService.enqueueWaitingList(waitingClient.sessionId, waitingClient.clientId)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    // SERVICES ---------------------------------------------------------------------------------
    RequestController.prototype.getServices = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.serviceService.get(params.filter, params.projection)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    RequestController.prototype.createService = function (service) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.serviceService.create(service)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    RequestController.prototype.updateService = function (service) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.serviceService.modify(service.serviceId, service.updatedService)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    RequestController.prototype.deleteService = function (serviceId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.serviceService.delete(serviceId)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    // USERS ---------------------------------------------------------------------------------
    RequestController.prototype.getUsers = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userService.get(params.filter, params.projection)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    RequestController.prototype.updateUser = function (service) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userService.modify(service.serviceId, service.updatedUser)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    RequestController.prototype.createUser = function (user) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userService.create(user)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    RequestController.prototype.deleteSUser = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userService.delete(userId)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    // ROOMS ---------------------------------------------------------------------------------------
    RequestController.prototype.getRooms = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.roomService.get(params.filter, params.projection)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    RequestController.prototype.updateRoom = function (room) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.roomService.modify(room.roomId, room.updatedRoom)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    RequestController.prototype.createRoom = function (room) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.roomService.create(room)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    RequestController.prototype.deleteRoom = function (roomId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.roomService.delete(roomId)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    RequestController.prototype.giveClientReward = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.roomService.giveClientReward()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    // INSTRUCTOR ---------------------------------------------------------------------------------------
    RequestController.prototype.getInstructor = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.instructorService.get(params.filter, params.projection)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    RequestController.prototype.updateInstructor = function (instructor) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.instructorService.modify(instructor.instructorId, instructor.updatedInstructor)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    RequestController.prototype.createInstructor = function (instructor) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.instructorService.create(instructor)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    RequestController.prototype.deleteInstructor = function (instructorId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.instructorService.delete(instructorId)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    //Calendar -------------------------------------------------------
    RequestController.prototype.getCalendar = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.calendarService.get(params.filter, params.projection)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    RequestController.prototype.updateCalendar = function (calendar) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.calendarService.modify(calendar.calendarId, calendar.updatedCalendar)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    RequestController.prototype.createCalendar = function (calendar) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.calendarService.create(calendar)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    RequestController.prototype.deleteCalendar = function (calendarId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.calendarService.delete(calendarId)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    RequestController.prototype.getCalendarByRoom = function (roomId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.calendarService.getCalendarByRoom(roomId)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    RequestController.prototype.publishCalendar = function (calendarId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.calendarService.publishCalendar(calendarId)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    RequestController.prototype.getFilterCalendar = function (roomId, filter) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.calendarService.filterCalendar(roomId, filter)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    //Reservations -------------------------------------------------------
    RequestController.prototype.getReservation = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.reservationService.get(params.filter, params.projection)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    RequestController.prototype.getReservationByClient = function (clientId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.reservationService.getReservationByClient(clientId)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    RequestController.prototype.updateReservation = function (reservation) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.reservationService.modify(reservation.reservationId, reservation.updatedReservation)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    RequestController.prototype.createReservation = function (reservation) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.reservationService.create(reservation)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    RequestController.prototype.deleteReservation = function (reservationId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.reservationService.cancelReservation(reservationId)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    RequestController.prototype.cancelReservation = function (reservationId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.reservationService.cancelReservation(reservationId)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    //Memberships-------------------------------------------------------
    RequestController.prototype.getMembership = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.membershipService.get(params.filter, params.projection)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    RequestController.prototype.updateMembership = function (membership) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.membershipService.modify(membership.membershipId, membership.updatedMembership)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    RequestController.prototype.createMembership = function (requestMembership) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.membershipService.createMembership(requestMembership.pMembership, requestMembership.clientId, requestMembership.pPayment)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    RequestController.prototype.deleteMembership = function (membershipId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.membershipService.delete(membershipId)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    RequestController.prototype.hasActiveMembership = function (clientId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.membershipService.hasActiveMembership(clientId)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    RequestController.prototype.isDefaulter = function (clientId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.membershipService.isDefaulter(clientId)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    RequestController.prototype.itsAllowedToReserve = function (clientId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.membershipService.itsAllowedToReserve(clientId)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    RequestController.prototype.applyCharge = function (requestCharge) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.membershipService.applyCharge(requestCharge.pClientId, requestCharge.pPayment)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    //MembershipOffer-----------------------------------------------
    RequestController.prototype.getMembershipOffer = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.membershipOfferService.get(params.filter, params.projection)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    RequestController.prototype.createMembershipOffer = function (membershipOffer) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.membershipOfferService.create(membershipOffer)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    //Payment-------------------------------------------------------
    RequestController.prototype.getPayment = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.paymentService.get(params.filter, params.projection)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    RequestController.prototype.updatePayment = function (payment) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.paymentService.modify(payment.paymentId, payment.updatedPayment)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    RequestController.prototype.createPayment = function (payment) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.paymentService.create(payment)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    RequestController.prototype.deletePayment = function (paymentId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.paymentService.delete(paymentId)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    //client-----------------------------------------------------------------------------
    RequestController.prototype.getClient = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.clientService.get(params.filter, params.projection)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    RequestController.prototype.getCompletedClient = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.clientService.getCompleted(params.filter, params.projection)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    RequestController.prototype.updateClient = function (client) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.clientService.modify(client.clientId, client.updatedClient)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    RequestController.prototype.createClient = function (client) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.clientService.create(client)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    RequestController.prototype.deleteClient = function (clientId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.clientService.delete(clientId)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    RequestController.prototype.getOneClient = function (clientId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.clientService.getOne(clientId)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    RequestController.prototype.addFavoriteService = function (clientId, serviceId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.clientService.addFavoriteService(clientId, serviceId)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    RequestController.prototype.deleteFavoriteService = function (clientId, serviceId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.clientService.deleteFavoriteService(clientId, serviceId)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    RequestController.prototype.getFavoriteService = function (clientId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.clientService.getFavoritesServices(clientId)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    RequestController.prototype.addNotification = function (notification) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.clientService.addNotification(notification.clientId, notification.message)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    RequestController.prototype.deleteNotification = function (clientId, id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.clientService.deleteNotification(clientId, id)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    RequestController.prototype.checkStars = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.clientService.checkStars()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    __decorate([
        tsoa_1.Post("sessions/get"),
        __param(0, tsoa_1.Body())
    ], RequestController.prototype, "getSessions", null);
    __decorate([
        tsoa_1.Post("sessions/getCompleted"),
        __param(0, tsoa_1.Body())
    ], RequestController.prototype, "getCompletedSessions", null);
    __decorate([
        tsoa_1.Post("sessions/create"),
        __param(0, tsoa_1.Body())
    ], RequestController.prototype, "createSession", null);
    __decorate([
        tsoa_1.Delete("sessions/delete"),
        __param(0, tsoa_1.Query())
    ], RequestController.prototype, "deleteSession", null);
    __decorate([
        tsoa_1.Put("sessions/update"),
        __param(0, tsoa_1.Body())
    ], RequestController.prototype, "updateSession", null);
    __decorate([
        tsoa_1.Put("sessions/calendar"),
        __param(0, tsoa_1.Query()),
        __param(1, tsoa_1.Query())
    ], RequestController.prototype, "addSessionToCalendar", null);
    __decorate([
        tsoa_1.Get("sessions/getClientsBySession"),
        __param(0, tsoa_1.Query())
    ], RequestController.prototype, "getClientsBySession", null);
    __decorate([
        tsoa_1.Post("sessions/enqueueWaitingList"),
        __param(0, tsoa_1.Body())
    ], RequestController.prototype, "enqueueWaitingList", null);
    __decorate([
        tsoa_1.Post("services/get"),
        __param(0, tsoa_1.Body())
    ], RequestController.prototype, "getServices", null);
    __decorate([
        tsoa_1.Post("services/create"),
        __param(0, tsoa_1.Body())
    ], RequestController.prototype, "createService", null);
    __decorate([
        tsoa_1.Put("services/update"),
        __param(0, tsoa_1.Body())
    ], RequestController.prototype, "updateService", null);
    __decorate([
        tsoa_1.Delete("services/delete"),
        __param(0, tsoa_1.Query())
    ], RequestController.prototype, "deleteService", null);
    __decorate([
        tsoa_1.Post("users/get"),
        __param(0, tsoa_1.Body())
    ], RequestController.prototype, "getUsers", null);
    __decorate([
        tsoa_1.Put("users/update"),
        __param(0, tsoa_1.Body())
    ], RequestController.prototype, "updateUser", null);
    __decorate([
        tsoa_1.Post("users/create"),
        __param(0, tsoa_1.Body())
    ], RequestController.prototype, "createUser", null);
    __decorate([
        tsoa_1.Delete("users/delete"),
        __param(0, tsoa_1.Query())
    ], RequestController.prototype, "deleteSUser", null);
    __decorate([
        tsoa_1.Post("rooms/get"),
        __param(0, tsoa_1.Body())
    ], RequestController.prototype, "getRooms", null);
    __decorate([
        tsoa_1.Put("rooms/update"),
        __param(0, tsoa_1.Body())
    ], RequestController.prototype, "updateRoom", null);
    __decorate([
        tsoa_1.Post("rooms/create"),
        __param(0, tsoa_1.Body())
    ], RequestController.prototype, "createRoom", null);
    __decorate([
        tsoa_1.Delete("rooms/delete"),
        __param(0, tsoa_1.Query())
    ], RequestController.prototype, "deleteRoom", null);
    __decorate([
        tsoa_1.Get("rooms/giveClientReward")
    ], RequestController.prototype, "giveClientReward", null);
    __decorate([
        tsoa_1.Post("instructor/get"),
        __param(0, tsoa_1.Body())
    ], RequestController.prototype, "getInstructor", null);
    __decorate([
        tsoa_1.Put("instructor/update"),
        __param(0, tsoa_1.Body())
    ], RequestController.prototype, "updateInstructor", null);
    __decorate([
        tsoa_1.Post("instructor/create"),
        __param(0, tsoa_1.Body())
    ], RequestController.prototype, "createInstructor", null);
    __decorate([
        tsoa_1.Delete("instructor/delete"),
        __param(0, tsoa_1.Query())
    ], RequestController.prototype, "deleteInstructor", null);
    __decorate([
        tsoa_1.Post("calendar/get"),
        __param(0, tsoa_1.Body())
    ], RequestController.prototype, "getCalendar", null);
    __decorate([
        tsoa_1.Put("calendar/update"),
        __param(0, tsoa_1.Body())
    ], RequestController.prototype, "updateCalendar", null);
    __decorate([
        tsoa_1.Post("calendar/create"),
        __param(0, tsoa_1.Body())
    ], RequestController.prototype, "createCalendar", null);
    __decorate([
        tsoa_1.Delete("calendar/delete"),
        __param(0, tsoa_1.Query())
    ], RequestController.prototype, "deleteCalendar", null);
    __decorate([
        tsoa_1.Get("calendar/get"),
        __param(0, tsoa_1.Query())
    ], RequestController.prototype, "getCalendarByRoom", null);
    __decorate([
        tsoa_1.Put("calendar/publish"),
        __param(0, tsoa_1.Query())
    ], RequestController.prototype, "publishCalendar", null);
    __decorate([
        tsoa_1.Get("calendar/getFilter"),
        __param(0, tsoa_1.Query()),
        __param(1, tsoa_1.Query())
    ], RequestController.prototype, "getFilterCalendar", null);
    __decorate([
        tsoa_1.Post("reservation/get"),
        __param(0, tsoa_1.Body())
    ], RequestController.prototype, "getReservation", null);
    __decorate([
        tsoa_1.Get("reservation/getByClient"),
        __param(0, tsoa_1.Query())
    ], RequestController.prototype, "getReservationByClient", null);
    __decorate([
        tsoa_1.Put("reservation/update"),
        __param(0, tsoa_1.Body())
    ], RequestController.prototype, "updateReservation", null);
    __decorate([
        tsoa_1.Post("reservation/create"),
        __param(0, tsoa_1.Body())
    ], RequestController.prototype, "createReservation", null);
    __decorate([
        tsoa_1.Delete("reservation/delete"),
        __param(0, tsoa_1.Query())
    ], RequestController.prototype, "deleteReservation", null);
    __decorate([
        tsoa_1.Delete("reservation/cancel"),
        __param(0, tsoa_1.Query())
    ], RequestController.prototype, "cancelReservation", null);
    __decorate([
        tsoa_1.Post("membership/get"),
        __param(0, tsoa_1.Body())
    ], RequestController.prototype, "getMembership", null);
    __decorate([
        tsoa_1.Put("membership/update"),
        __param(0, tsoa_1.Body())
    ], RequestController.prototype, "updateMembership", null);
    __decorate([
        tsoa_1.Post("membership/create"),
        __param(0, tsoa_1.Body())
    ], RequestController.prototype, "createMembership", null);
    __decorate([
        tsoa_1.Delete("membership/delete"),
        __param(0, tsoa_1.Query())
    ], RequestController.prototype, "deleteMembership", null);
    __decorate([
        tsoa_1.Get("membership/hasActiveMembership"),
        __param(0, tsoa_1.Query())
    ], RequestController.prototype, "hasActiveMembership", null);
    __decorate([
        tsoa_1.Get("membership/isDefaulter"),
        __param(0, tsoa_1.Query())
    ], RequestController.prototype, "isDefaulter", null);
    __decorate([
        tsoa_1.Get("membership/itsAllowedToReserve"),
        __param(0, tsoa_1.Query())
    ], RequestController.prototype, "itsAllowedToReserve", null);
    __decorate([
        tsoa_1.Post("membership/applyCharge"),
        __param(0, tsoa_1.Body())
    ], RequestController.prototype, "applyCharge", null);
    __decorate([
        tsoa_1.Post("membershipoffer/get"),
        __param(0, tsoa_1.Body())
    ], RequestController.prototype, "getMembershipOffer", null);
    __decorate([
        tsoa_1.Post("membershipoffer/create"),
        __param(0, tsoa_1.Body())
    ], RequestController.prototype, "createMembershipOffer", null);
    __decorate([
        tsoa_1.Post("payment/get"),
        __param(0, tsoa_1.Body())
    ], RequestController.prototype, "getPayment", null);
    __decorate([
        tsoa_1.Put("payment/update"),
        __param(0, tsoa_1.Body())
    ], RequestController.prototype, "updatePayment", null);
    __decorate([
        tsoa_1.Post("payment/create"),
        __param(0, tsoa_1.Body())
    ], RequestController.prototype, "createPayment", null);
    __decorate([
        tsoa_1.Delete("payment/delete"),
        __param(0, tsoa_1.Query())
    ], RequestController.prototype, "deletePayment", null);
    __decorate([
        tsoa_1.Post("client/get"),
        __param(0, tsoa_1.Body())
    ], RequestController.prototype, "getClient", null);
    __decorate([
        tsoa_1.Post("client/getCompleted"),
        __param(0, tsoa_1.Body())
    ], RequestController.prototype, "getCompletedClient", null);
    __decorate([
        tsoa_1.Put("client/update"),
        __param(0, tsoa_1.Body())
    ], RequestController.prototype, "updateClient", null);
    __decorate([
        tsoa_1.Post("client/create"),
        __param(0, tsoa_1.Body())
    ], RequestController.prototype, "createClient", null);
    __decorate([
        tsoa_1.Delete("client/delete"),
        __param(0, tsoa_1.Query())
    ], RequestController.prototype, "deleteClient", null);
    __decorate([
        tsoa_1.Get("client/getOne"),
        __param(0, tsoa_1.Query())
    ], RequestController.prototype, "getOneClient", null);
    __decorate([
        tsoa_1.Put("client/addFavoriteService"),
        __param(0, tsoa_1.Query()),
        __param(1, tsoa_1.Query())
    ], RequestController.prototype, "addFavoriteService", null);
    __decorate([
        tsoa_1.Delete("client/deleteFavoriteService"),
        __param(0, tsoa_1.Query()),
        __param(1, tsoa_1.Query())
    ], RequestController.prototype, "deleteFavoriteService", null);
    __decorate([
        tsoa_1.Get("client/getFavoritesServices"),
        __param(0, tsoa_1.Query())
    ], RequestController.prototype, "getFavoriteService", null);
    __decorate([
        tsoa_1.Post("client/addNotification"),
        __param(0, tsoa_1.Body())
    ], RequestController.prototype, "addNotification", null);
    __decorate([
        tsoa_1.Delete("client/deleteNotification"),
        __param(0, tsoa_1.Query()),
        __param(1, tsoa_1.Query())
    ], RequestController.prototype, "deleteNotification", null);
    __decorate([
        tsoa_1.Get("client/checkStars")
    ], RequestController.prototype, "checkStars", null);
    RequestController = __decorate([
        tsoa_1.Route("api")
    ], RequestController);
    return RequestController;
}(tsoa_1.Controller));
exports.RequestController = RequestController;
