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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientService = void 0;
var API_1 = __importDefault(require("../API"));
var Client_1 = require("../model/Client");
var Authenticator_1 = require("../auth/Authenticator");
var StarVerifier_1 = require("../model/patterns/star_assigner/StarVerifier");
var ClientService = /** @class */ (function () {
    function ClientService(reqControllerRef) {
        this.reqControllerRef = reqControllerRef;
    }
    ClientService.prototype.update = function (clientsWithRewards) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: 
                    // con los premios generados con sus estrellas se avisa a cada uno de ellos
                    return [4 /*yield*/, Promise.all(clientsWithRewards.map(function (clientWithReward) { return __awaiter(_this, void 0, void 0, function () {
                            var clientId, reward;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        clientId = clientWithReward.client._id;
                                        reward = clientWithReward.reward;
                                        // se notifica a cada cliente de su respectivo premio
                                        return [4 /*yield*/, this.reqControllerRef.clientService.addNotification(clientId, reward)];
                                    case 1:
                                        // se notifica a cada cliente de su respectivo premio
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); }))];
                    case 1:
                        // con los premios generados con sus estrellas se avisa a cada uno de ellos
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ClientService.prototype.create = function (entity) {
        return __awaiter(this, void 0, void 0, function () {
            var responseCreatedUser, createdUser, client1, responseCreatedClient;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Authenticator_1.Authenticator.registerUser(entity)];
                    case 1:
                        responseCreatedUser = _a.sent();
                        if (!responseCreatedUser.newUser)
                            return [2 /*return*/, responseCreatedUser];
                        createdUser = responseCreatedUser.newUser;
                        client1 = {
                            userId: createdUser._id,
                            pendingPayment: [],
                            balance: 0.00,
                            memberships: [],
                            favoritesServices: [],
                            starLevel: [0, 0, 0],
                            notifications: ["Felicidades por ser parte de nuestra comunidad fitness! Disfruta de nuestros servicios"]
                        };
                        return [4 /*yield*/, API_1.default.entityRepository.create('client', client1)];
                    case 2:
                        responseCreatedClient = _a.sent();
                        return [2 /*return*/, {
                                message: "El cliente se ha creado exitosamente",
                                success: true,
                                signup: true,
                                object: responseCreatedClient
                            }];
                }
            });
        });
    };
    ClientService.prototype.modify = function (oldEntityId, newEntity) {
        if (oldEntityId === void 0) { oldEntityId = ''; }
        return API_1.default.entityRepository.modify('client', oldEntityId, newEntity);
    };
    ClientService.prototype.delete = function (entityId) {
        return __awaiter(this, void 0, void 0, function () {
            var client, userId, _;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getOne(entityId)];
                    case 1:
                        client = _a.sent();
                        userId = client.userId;
                        return [4 /*yield*/, this.reqControllerRef.userService.delete(userId)];
                    case 2:
                        _ = _a.sent();
                        return [2 /*return*/, API_1.default.entityRepository.delete('client', entityId)];
                }
            });
        });
    };
    ClientService.prototype.get = function (filter, projection) {
        return API_1.default.entityRepository.get('client', filter, projection);
    };
    ClientService.prototype.getOne = function (entityId) {
        return API_1.default.entityRepository.getOne('client', entityId);
    };
    ClientService.prototype.getCompleted = function (filter, projection) {
        return __awaiter(this, void 0, void 0, function () {
            var clients, clientFilled;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, API_1.default.entityRepository.get('client', filter, projection)];
                    case 1:
                        clients = _a.sent();
                        clientFilled = Promise.all(clients.map(function (client) { return __awaiter(_this, void 0, void 0, function () {
                            var _client, userId, clientWithoutId, userInfo;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, this.getOne(client._id)];
                                    case 1:
                                        _client = _a.sent();
                                        userId = _client.userId, clientWithoutId = __rest(_client, ["userId"]);
                                        return [4 /*yield*/, this.reqControllerRef.userService.getOne(userId)];
                                    case 2:
                                        userInfo = _a.sent();
                                        return [2 /*return*/, __assign(__assign({}, userInfo), _client)];
                                }
                            });
                        }); }));
                        return [2 /*return*/, clientFilled];
                }
            });
        });
    };
    ClientService.prototype.getClientWithAllInfo = function (clientId) {
        return __awaiter(this, void 0, void 0, function () {
            var clientObj, _a, password, user;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.reqControllerRef.clientService.getOne(clientId)];
                    case 1:
                        clientObj = _b.sent();
                        return [4 /*yield*/, this.reqControllerRef.userService.getOne(clientObj.userId)];
                    case 2:
                        _a = _b.sent(), password = _a.password, user = __rest(_a, ["password"]);
                        return [2 /*return*/, __assign(__assign({}, user), clientObj)];
                }
            });
        });
    };
    ClientService.prototype.addFavoriteService = function (clientId, serviceId) {
        return __awaiter(this, void 0, void 0, function () {
            var client, _id, clientWithoutId, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getOne(clientId)];
                    case 1:
                        client = _a.sent();
                        if (client.favoritesServices) {
                            if (client.favoritesServices.includes(serviceId)) {
                                return [2 /*return*/, {
                                        success: false,
                                        message: "El servicio seleccionado ya esta marcado como favorito"
                                    }];
                            }
                            else {
                                client.favoritesServices.push(serviceId);
                            }
                        }
                        else {
                            client.favoritesServices = [serviceId];
                        }
                        _id = client._id, clientWithoutId = __rest(client, ["_id"]);
                        return [4 /*yield*/, this.modify(_id, clientWithoutId)];
                    case 2:
                        result = _a.sent();
                        if ((result === null || result === void 0 ? void 0 : result.modifiedCount) > 0) {
                            return [2 /*return*/, {
                                    success: true,
                                    message: "Se ha agregado un nuevo servicio a tus favoritos"
                                }];
                        }
                        else {
                            return [2 /*return*/, {
                                    success: false,
                                    message: "Hubo un problema al agregar a tus favoritos"
                                }];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    ClientService.prototype.deleteFavoriteService = function (clientId, serviceId) {
        return __awaiter(this, void 0, void 0, function () {
            var client, _id, clientWithoutId, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getOne(clientId)];
                    case 1:
                        client = _a.sent();
                        client.favoritesServices = client.favoritesServices.filter(function (sId) { return sId != serviceId; });
                        _id = client._id, clientWithoutId = __rest(client, ["_id"]);
                        return [4 /*yield*/, this.modify(_id, clientWithoutId)];
                    case 2:
                        result = _a.sent();
                        return [2 /*return*/, {
                                success: true,
                                message: "Se ha eliminado el servicio de tus favoritos"
                            }];
                }
            });
        });
    };
    ClientService.prototype.getFavoritesServices = function (clientId) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var client, populatedServices;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.getOne(clientId)];
                    case 1:
                        client = _b.sent();
                        if (!(((_a = client.favoritesServices) === null || _a === void 0 ? void 0 : _a.length) > 0)) return [3 /*break*/, 3];
                        return [4 /*yield*/, Promise.all(client.favoritesServices.map(function (serviceId) { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, this.reqControllerRef.serviceService.getOne(serviceId)];
                                        case 1: return [2 /*return*/, _a.sent()];
                                    }
                                });
                            }); }))];
                    case 2:
                        populatedServices = _b.sent();
                        return [2 /*return*/, {
                                services: populatedServices,
                                message: "Estos son tus servicios favoritos"
                            }];
                    case 3: return [2 /*return*/, {
                            services: [],
                            message: "No tienes servicios favoritos aun"
                        }];
                }
            });
        });
    };
    ClientService.prototype.addNotification = function (clientId, notification) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _id, clientWithoutId, storeInfo;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.getOne(clientId)];
                    case 1:
                        _a = _b.sent(), _id = _a._id, clientWithoutId = __rest(_a, ["_id"]);
                        clientWithoutId.notifications.push(notification);
                        return [4 /*yield*/, this.modify(_id, clientWithoutId)];
                    case 2:
                        storeInfo = _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ClientService.prototype.deleteNotification = function (clientId, messageIndex) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _id, clientWithoutId, storeInfo;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.getOne(clientId)];
                    case 1:
                        _a = _b.sent(), _id = _a._id, clientWithoutId = __rest(_a, ["_id"]);
                        console.log('ANTES', clientWithoutId.notifications.length);
                        clientWithoutId.notifications = clientWithoutId.notifications.filter(function (n, id) { return messageIndex !== id; });
                        console.log('DESPUES', clientWithoutId.notifications.length);
                        return [4 /*yield*/, this.modify(_id, clientWithoutId)];
                    case 2:
                        storeInfo = _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ClientService.prototype.checkStars = function () {
        return __awaiter(this, void 0, void 0, function () {
            var clientsIds, clients, starVerifier;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.get({}, {})];
                    case 1:
                        clientsIds = _a.sent();
                        return [4 /*yield*/, Promise.all(clientsIds.map(function (client1) { return __awaiter(_this, void 0, void 0, function () {
                                var client;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, this.getClientWithAllInfo(client1._id)];
                                        case 1:
                                            client = _a.sent();
                                            return [2 /*return*/, new Client_1.ClientComplete(client)];
                                    }
                                });
                            }); }))];
                    case 2:
                        clients = _a.sent();
                        starVerifier = new StarVerifier_1.StarVerifier(this.reqControllerRef);
                        return [4 /*yield*/, Promise.all(clients.map(function (client) { return __awaiter(_this, void 0, void 0, function () {
                                var clientOld;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, client.accept(starVerifier)];
                                        case 1:
                                            _a.sent();
                                            return [4 /*yield*/, this.getOne(client._id.toString())];
                                        case 2:
                                            clientOld = _a.sent();
                                            clientOld.starLevel = client.starLevel;
                                            return [4 /*yield*/, this.modify(clientOld._id, clientOld)];
                                        case 3:
                                            _a.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            }); }))];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, {
                                message: "Se han otorgado las estrellas del bloque fechas actual. Se modificaron " + clients.length,
                                success: true,
                                object: clients
                            }];
                }
            });
        });
    };
    return ClientService;
}());
exports.ClientService = ClientService;
