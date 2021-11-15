"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoDbConnection = void 0;
var ClientSchema_1 = require("./schemas/ClientSchema");
var mongoose_1 = __importDefault(require("mongoose"));
var UserSchema_1 = require("../db/schemas/UserSchema");
var AdministratorSchema_1 = require("./schemas/AdministratorSchema");
var ServiceSchema_1 = require("./schemas/ServiceSchema");
var SessionSchema_1 = require("./schemas/SessionSchema");
var InstructorSchema_1 = require("./schemas/InstructorSchema");
var CalendarSchema_1 = require("./schemas/CalendarSchema");
var MembershipSchema_1 = require("./schemas/MembershipSchema");
var ReservationSchema_1 = require("./schemas/ReservationSchema");
var PaymentSchema_1 = require("./schemas/PaymentSchema");
var MembershipOfferSchema_1 = require("./schemas/MembershipOfferSchema");
var MongoDbConnection = /** @class */ (function () {
    function MongoDbConnection() {
        this.connectionString = process.env.MONGO_URI;
        this.registerModels();
        this.connect();
    }
    MongoDbConnection.prototype.registerModels = function () {
        mongoose_1.default.model('users', UserSchema_1.UserSchema);
        mongoose_1.default.model('sessions', SessionSchema_1.SessionSchema);
        mongoose_1.default.model('services', ServiceSchema_1.ServiceSchema);
        mongoose_1.default.model('administrator', AdministratorSchema_1.AdministratorSchema);
        mongoose_1.default.model('clients', ClientSchema_1.ClientSchema);
        mongoose_1.default.model('instructors', InstructorSchema_1.InstructorSchema);
        mongoose_1.default.model('calendar', CalendarSchema_1.CalendarSchema);
        mongoose_1.default.model('membership', MembershipSchema_1.MembershipSchema);
        mongoose_1.default.model('reservation', ReservationSchema_1.ReservationSchema);
        mongoose_1.default.model('payment', PaymentSchema_1.PaymentSchema);
        mongoose_1.default.model('membershipoffer', MembershipOfferSchema_1.MembershipOfferSchema);
    };
    MongoDbConnection.prototype.connect = function () {
        mongoose_1.default.connect(this.connectionString, { useNewUrlParser: true, useUnifiedTopology: true }).then();
        mongoose_1.default.connection.once('open', function () {
            console.log('MongoDB connected!');
        });
        MongoDbConnection.db = mongoose_1.default.connection;
    };
    return MongoDbConnection;
}());
exports.MongoDbConnection = MongoDbConnection;
