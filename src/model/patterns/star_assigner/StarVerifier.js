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
Object.defineProperty(exports, "__esModule", { value: true });
exports.StarVerifier = void 0;
var DateUtils_1 = require("../../../utils/DateUtils");
var StarVerifier = /** @class */ (function () {
    function StarVerifier(reqControllerRef) {
        this.reqControllerRef = reqControllerRef;
    }
    StarVerifier.prototype.visite = function (client) {
        return __awaiter(this, void 0, void 0, function () {
            var blockDays, rangeDays, initialDate, finalDate, clientId, reservations, reservationsOfTenDays;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        blockDays = DateUtils_1.getMonthBlockIndex(new Date());
                        rangeDays = DateUtils_1.getRangeDates(blockDays);
                        initialDate = rangeDays.initialDate;
                        finalDate = rangeDays.finalDate;
                        clientId = client._id.toString();
                        return [4 /*yield*/, this.reqControllerRef.reservationService.get({ clientId: clientId }, {})];
                    case 1:
                        reservations = _a.sent();
                        return [4 /*yield*/, this.getReservationsOfFavorites(client, reservations, initialDate, finalDate)];
                    case 2:
                        reservationsOfTenDays = _a.sent();
                        this.giveStarToClient(client, reservationsOfTenDays, blockDays);
                        return [2 /*return*/];
                }
            });
        });
    };
    StarVerifier.prototype.giveStarToClient = function (client, reservationsOfTenDays, blockDays) {
        var amountOfStars = 0;
        //no tiene reservaciones este bloque tiene 0 estrellas
        if (reservationsOfTenDays === undefined) {
            amountOfStars = 0;
        }
        //Tiene 5 o mas reservaciones se le dan 3 estrellas
        if (reservationsOfTenDays.length >= 5) {
            amountOfStars = 3;
        }
        else {
            //Si tiene 4 o 3 se le dan 2 o 1 estrella sino son 0
            amountOfStars = reservationsOfTenDays.length > 2 ? reservationsOfTenDays.length - 2 : 0;
        }
        client.starLevel = client.starLevel === undefined ? [] : client.starLevel;
        client.starLevel[blockDays] = amountOfStars;
    };
    StarVerifier.prototype.getReservationsOfFavorites = function (client, reservations, initialDate, finalDate) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Promise.all(reservations.map(function (reservation) { return __awaiter(_this, void 0, void 0, function () {
                            var reservationDate, session_1, serviceFavoriteReservate;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        reservationDate = new Date(reservation.creationDate);
                                        if (!(reservationDate >= initialDate && reservationDate <= finalDate)) return [3 /*break*/, 2];
                                        return [4 /*yield*/, this.reqControllerRef.sessionService.getOne(reservation.sessionId)];
                                    case 1:
                                        session_1 = _a.sent();
                                        serviceFavoriteReservate = client.favoritesServices.find(function (element) {
                                            return element == session_1.service._id;
                                        });
                                        //Si el servicio de esa session existe retornarlo
                                        return [2 /*return*/, serviceFavoriteReservate != undefined ? reservation : null];
                                    case 2: return [2 /*return*/, null];
                                }
                            });
                        }); }))];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result.filter(function (element) { return element !== null; })];
                }
            });
        });
    };
    return StarVerifier;
}());
exports.StarVerifier = StarVerifier;
