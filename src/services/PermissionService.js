"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PermissionService = void 0;
var API_1 = __importDefault(require("../API"));
var PermissionService = /** @class */ (function () {
    function PermissionService(reqControllerRef) {
        this.reqControllerRef = reqControllerRef;
    }
    PermissionService.prototype.create = function (entity) {
        return API_1.default.entityRepository.create('permission', entity);
    };
    PermissionService.prototype.modify = function (oldEntityId, newEntity) {
        if (oldEntityId === void 0) { oldEntityId = ''; }
        return API_1.default.entityRepository.modify('permission', oldEntityId, newEntity);
    };
    PermissionService.prototype.delete = function (entityId) {
        return API_1.default.entityRepository.delete('permission', entityId);
    };
    PermissionService.prototype.get = function (filter, projection) {
        return API_1.default.entityRepository.get('permission', filter, projection);
    };
    PermissionService.prototype.getOne = function (entityId) {
        return API_1.default.entityRepository.getOne('permission', entityId);
    };
    return PermissionService;
}());
exports.PermissionService = PermissionService;
