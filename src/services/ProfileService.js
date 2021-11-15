"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileService = void 0;
var API_1 = __importDefault(require("../API"));
var ProfileService = /** @class */ (function () {
    function ProfileService(reqControllerRef) {
        this.reqControllerRef = reqControllerRef;
    }
    ProfileService.prototype.create = function (entity) {
        return API_1.default.entityRepository.create('profile', entity);
    };
    ProfileService.prototype.modify = function (oldEntityId, newEntity) {
        if (oldEntityId === void 0) { oldEntityId = ''; }
        return API_1.default.entityRepository.modify('profile', oldEntityId, newEntity);
    };
    ProfileService.prototype.delete = function (entityId) {
        return API_1.default.entityRepository.delete('profile', entityId);
    };
    ProfileService.prototype.get = function (filter, projection) {
        return API_1.default.entityRepository.get('profile', filter, projection);
    };
    ProfileService.prototype.getOne = function (entityId) {
        return API_1.default.entityRepository.getOne('profile', entityId);
    };
    return ProfileService;
}());
exports.ProfileService = ProfileService;
