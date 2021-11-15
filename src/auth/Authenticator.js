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
exports.Authenticator = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var rand_token_1 = __importDefault(require("rand-token"));
var bcrypt_1 = __importDefault(require("bcrypt"));
var API_1 = __importDefault(require("../API"));
var mongoose_1 = __importDefault(require("mongoose"));
var allowableApiCallsWithoutAuth = [
    "/user/login",
    "/user/refreshToken"
];
var refreshTokens = new Map(); // to avoid mongodb calls
var Authenticator = /** @class */ (function () {
    function Authenticator() {
    }
    Authenticator.login = function (username, password) {
        return __awaiter(this, void 0, void 0, function () {
            var user, jwtToken, password_1, userInfo, refreshToken, obj;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // check missing properties
                        if (!username || !password)
                            return [2 /*return*/, { message: 'Username and password are required', auth: false }];
                        return [4 /*yield*/, API_1.default.entityRepository.get('users', { username: username }, {})];
                    case 1:
                        user = (_a.sent())[0];
                        if (!user) return [3 /*break*/, 3];
                        if (!bcrypt_1.default.compareSync(password, user.password)) return [3 /*break*/, 3];
                        jwtToken = jsonwebtoken_1.default.sign({ id: user._id }, process.env.JWT_SECRET, {
                            expiresIn: process.env.JWT_TOKEN_EXPIRE_TIME
                        });
                        password_1 = user.password, userInfo = __rest(user, ["password"]);
                        refreshToken = rand_token_1.default.uid(256);
                        refreshTokens.set(refreshToken, userInfo._id || '');
                        return [4 /*yield*/, API_1.default.entityRepository.get(user.role, { userId: new mongoose_1.default.mongo.ObjectID(user._id), }, {})];
                    case 2:
                        obj = (_a.sent())[0];
                        return [2 /*return*/, {
                                user: userInfo,
                                token: jwtToken,
                                refreshToken: refreshToken,
                                expireTimeInSeconds: process.env.TOKEN_EXPIRE_TIME,
                                auth: true,
                                obj: obj
                            }];
                    case 3: return [2 /*return*/, {
                            auth: false,
                            message: 'Username or password incorrect',
                        }];
                }
            });
        });
    };
    Authenticator.logout = function (username, jwtToken, refreshToken) {
        return __awaiter(this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // check missing properties
                        if (!username || !jwtToken)
                            return [2 /*return*/, { message: 'Username, jwt token and refresh token are required', auth: false }];
                        return [4 /*yield*/, API_1.default.entityRepository.get('users', { username: username }, { _id: 1 })];
                    case 1:
                        user = (_a.sent())[0];
                        // logout handling
                        if (user) {
                            return [2 /*return*/, jsonwebtoken_1.default.verify(jwtToken, process.env.JWT_SECRET, function (err, payload) {
                                    if (err)
                                        return { logout: false, message: "Authentication failed" };
                                    else {
                                        refreshTokens.delete(refreshToken);
                                        return { logout: true, message: "You logout correctly!" };
                                    }
                                })];
                        }
                        else {
                            return [2 /*return*/, {
                                    logout: false,
                                    message: 'User doesn\'t exists',
                                }];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    Authenticator.refreshToken = function (userId, refreshToken) {
        return __awaiter(this, void 0, void 0, function () {
            var newJwtToken;
            return __generator(this, function (_a) {
                // check if the refresh token exists
                if (!refreshTokens.has(refreshToken))
                    return [2 /*return*/, {
                            auth: false,
                            message: 'Invalid refresh token, you need to login first',
                        }];
                newJwtToken = jsonwebtoken_1.default.sign({ id: userId }, process.env.JWT_SECRET, {
                    expiresIn: process.env.JWT_TOKEN_EXPIRE_TIME
                });
                return [2 /*return*/, {
                        token: newJwtToken,
                        expireTimeInSeconds: process.env.TOKEN_EXPIRE_TIME
                    }];
            });
        });
    };
    Authenticator.registerUser = function (user) {
        return __awaiter(this, void 0, void 0, function () {
            var usersEmails, saltRounds, salt, hashedPassword, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, API_1.default.entityRepository.get('users', { $or: [{ email: user.email }, { username: user.email }] }, { _id: 1 })];
                    case 1:
                        usersEmails = _a.sent();
                        if (usersEmails.length > 0)
                            return [2 /*return*/, {
                                    signup: false,
                                    succes: false,
                                    message: 'The email or username is already used'
                                }
                                // password encryption process
                            ];
                        saltRounds = 10;
                        salt = bcrypt_1.default.genSaltSync(saltRounds);
                        hashedPassword = bcrypt_1.default.hashSync(user.password, salt);
                        return [4 /*yield*/, API_1.default.entityRepository.create('users', __assign(__assign({}, user), { password: hashedPassword }))];
                    case 2:
                        result = _a.sent();
                        return [2 /*return*/, {
                                newUser: result.createdObject,
                                signup: true,
                                success: true,
                                message: "Sign up correctly for " + user.firstName + " " + user.lastName + ", now you can login"
                            }];
                }
            });
        });
    };
    Authenticator.isAuthenticated = function (request, response, next) {
        return __awaiter(this, void 0, void 0, function () {
            var token;
            return __generator(this, function (_a) {
                // DEVELOPMENT MODE: to avoid use token when the API is not in production
                if (Authenticator.developmentMode) {
                    next();
                    return [2 /*return*/];
                }
                // check if the request path can be reached without authentication
                if (allowableApiCallsWithoutAuth.includes(request.path)) {
                    next();
                    return [2 /*return*/];
                }
                token = request.headers["x-access-token"];
                // token handling
                if (!token || typeof token !== 'string') {
                    response.send('You need a token, please add the token using "x-access-token" header');
                }
                else {
                    // check if is a valid jwt token
                    jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET, function (err, payload) {
                        if (err)
                            response.json({ auth: false, message: "Authentication failed" });
                        else {
                            request.headers.id = payload.id;
                            // response.json({auth : true, message: "Authentication successed!"});
                            next();
                        }
                    });
                }
                return [2 /*return*/];
            });
        });
    };
    Authenticator.developmentMode = true;
    return Authenticator;
}());
exports.Authenticator = Authenticator;
