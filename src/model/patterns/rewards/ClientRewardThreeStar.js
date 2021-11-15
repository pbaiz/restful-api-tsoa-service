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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientRewardThreeStar = void 0;
var DecoratorClientRewardGiving_1 = require("./DecoratorClientRewardGiving");
var ClientRewardThreeStar = /** @class */ (function (_super) {
    __extends(ClientRewardThreeStar, _super);
    function ClientRewardThreeStar() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ClientRewardThreeStar.prototype.giveReward = function () {
        /**
         * si son tres estrellas
            se le incorpora una sesión de descarga muscular
         */
        return _super.prototype.giveReward.call(this) + '\n1 sesion de descarga muscular';
    };
    return ClientRewardThreeStar;
}(DecoratorClientRewardGiving_1.DecoratorClientRewardGiving));
exports.ClientRewardThreeStar = ClientRewardThreeStar;
