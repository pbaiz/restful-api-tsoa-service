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
exports.RoomService = void 0;
var API_1 = __importDefault(require("../API"));
var RewardPublisher_1 = require("../model/patterns/waiting_list-reward_checker/RewardPublisher");
var ClientRewardOneStar_1 = require("../model/patterns/rewards/ClientRewardOneStar");
var ClientRewardTwoStar_1 = require("../model/patterns/rewards/ClientRewardTwoStar");
var ClientRewardThreeStar_1 = require("../model/patterns/rewards/ClientRewardThreeStar");
var BaseClientReward_1 = require("../model/patterns/rewards/BaseClientReward");
var MAXIMUM_STAR_AMOUNT = 3;
var MINIMUM_STAR_AMOUNT = 0;
var RoomService = /** @class */ (function (_super) {
    __extends(RoomService, _super);
    function RoomService(reqControllerRef) {
        var _this = _super.call(this) || this;
        _this.reqControllerRef = reqControllerRef;
        console.log(_this.reqControllerRef.clientService);
        _this.subscribers.push(_this.reqControllerRef.clientService);
        return _this;
    }
    RoomService.prototype.create = function (entity) {
        return __awaiter(this, void 0, void 0, function () {
            var room, date, calendar;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        //Crear la nueva sala
                        entity.monthlyCalendar = null;
                        return [4 /*yield*/, API_1.default.entityRepository.create('room', entity)];
                    case 1:
                        room = _a.sent();
                        date = new Date();
                        return [4 /*yield*/, API_1.default.entityRepository.create('calendar', { roomId: room.createdObject._id,
                                month: date.getMonth().toString(),
                                year: date.getFullYear().toString(),
                                published: false,
                                sessions: [],
                            })];
                    case 2:
                        calendar = _a.sent();
                        //retornar la sala
                        return [2 /*return*/, room];
                }
            });
        });
    };
    RoomService.prototype.modify = function (oldEntityId, newEntity) {
        if (oldEntityId === void 0) { oldEntityId = ''; }
        return API_1.default.entityRepository.modify('room', oldEntityId, newEntity);
    };
    RoomService.prototype.delete = function (entityId) {
        return API_1.default.entityRepository.delete('room', entityId);
    };
    RoomService.prototype.get = function (filter, projection) {
        return API_1.default.entityRepository.get('room', filter, projection);
    };
    RoomService.prototype.getOne = function (entityId) {
        return API_1.default.entityRepository.getOne('room', entityId);
    };
    RoomService.prototype.giveClientReward = function () {
        return __awaiter(this, void 0, void 0, function () {
            var assignStar, clients, clientWithRewards;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        assignStar = function (client) {
                            var clientStars = client.starLevel;
                            clientStars = clientStars.filter(function (starLevel) { return starLevel != undefined; });
                            if (clientStars.length == 0)
                                return MINIMUM_STAR_AMOUNT;
                            return client.starLevel.reduce(function (acm, item) { return item < acm ? item : acm; }, MAXIMUM_STAR_AMOUNT);
                        };
                        return [4 /*yield*/, this.reqControllerRef.clientService.getCompleted({}, {})];
                    case 1:
                        clients = _a.sent();
                        clientWithRewards = clients.map(function (client) {
                            // se procede a fabricar el premio segun el nivel de estrellas obtenidas
                            var decorator = new BaseClientReward_1.BaseClientReward();
                            // se obtiene la menor cantidad de estrellas, entre los diferentes bloques
                            // del mes
                            var clientStars = assignStar(client);
                            var baseMessage = 'Se ha realizado la revision de disciplina, estos son tus resultados:\n';
                            var clientReward = baseMessage;
                            var noRewardMsg = "[\n          Si eres lo suficientemente activo \n          con tus servicios favoritos podras\n          ganar premios cada mes, suerte \n          la pr\u00F3xima\n        ] ";
                            // se fabrica el premio segun la cantidad de estrellas
                            switch (clientStars) {
                                case 1: {
                                    decorator = new ClientRewardOneStar_1.ClientRewardOneStar(decorator);
                                    break;
                                }
                                case 2: {
                                    decorator = new ClientRewardOneStar_1.ClientRewardOneStar(decorator);
                                    decorator = new ClientRewardTwoStar_1.ClientRewardTwoStar(decorator);
                                    break;
                                }
                                case 3: {
                                    decorator = new ClientRewardOneStar_1.ClientRewardOneStar(decorator);
                                    decorator = new ClientRewardTwoStar_1.ClientRewardTwoStar(decorator);
                                    decorator = new ClientRewardThreeStar_1.ClientRewardThreeStar(decorator);
                                    break;
                                }
                            }
                            clientReward += decorator.giveReward();
                            if (clientReward === baseMessage)
                                clientReward += noRewardMsg;
                            return {
                                client: client,
                                reward: new Date().toLocaleTimeString() + "  " + clientReward
                            };
                        });
                        // console.log(clientWithRewards);
                        // notificar a los clientes de los premios recibidos
                        return [4 /*yield*/, this.notifySubscribers(clientWithRewards)];
                    case 2:
                        // console.log(clientWithRewards);
                        // notificar a los clientes de los premios recibidos
                        _a.sent();
                        return [2 /*return*/, {
                                message: 'Se han otorgado los premios segun el nivel de estrellas de cada cliente',
                                success: true,
                                info: clientWithRewards
                            }];
                }
            });
        });
    };
    RoomService.prototype.subscribe = function (subscriber) {
        this.subscribers.push(subscriber);
    };
    RoomService.prototype.notifySubscribers = function (data) {
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
    RoomService.prototype.unsubscribe = function (subscriber) {
        this.subscribers = this.subscribers.filter(function (s) { return s !== subscriber; });
    };
    return RoomService;
}(RewardPublisher_1.RewardPublisher));
exports.RoomService = RoomService;
