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
exports.ClientRewardTwoStar = void 0;
var DecoratorClientRewardGiving_1 = require("./DecoratorClientRewardGiving");
var ClientRewardTwoStar = /** @class */ (function (_super) {
    __extends(ClientRewardTwoStar, _super);
    function ClientRewardTwoStar() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ClientRewardTwoStar.prototype.giveReward = function () {
        /**
         * Si son dos
            además del premio promocional recibe gratis una
            valoración nutricional
         */
        return _super.prototype.giveReward.call(this) + '\n1 valoracion nutricional';
    };
    return ClientRewardTwoStar;
}(DecoratorClientRewardGiving_1.DecoratorClientRewardGiving));
exports.ClientRewardTwoStar = ClientRewardTwoStar;
