"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MembershipOfferService = void 0;
var API_1 = __importDefault(require("../API"));
var MembershipOfferService = /** @class */ (function () {
    function MembershipOfferService(reqControllerRef) {
        this.reqControllerRef = reqControllerRef;
    }
    MembershipOfferService.prototype.create = function (entity) {
        return API_1.default.entityRepository.create('membershipoffer', entity);
    };
    MembershipOfferService.prototype.modify = function (oldEntityId, newEntity) {
        if (oldEntityId === void 0) { oldEntityId = ''; }
        return API_1.default.entityRepository.modify('membershipoffer', oldEntityId, newEntity);
    };
    MembershipOfferService.prototype.delete = function (entityId) {
        return API_1.default.entityRepository.delete('membershipoffer', entityId);
    };
    MembershipOfferService.prototype.get = function (filter, projection) {
        return API_1.default.entityRepository.get('membershipoffer', filter, projection);
    };
    MembershipOfferService.prototype.getOne = function (entityId) {
        return API_1.default.entityRepository.getOne('membershipoffer', entityId);
    };
    return MembershipOfferService;
}());
exports.MembershipOfferService = MembershipOfferService;
