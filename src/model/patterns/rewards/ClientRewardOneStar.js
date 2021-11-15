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
exports.ClientRewardOneStar = void 0;
var DecoratorClientRewardGiving_1 = require("./DecoratorClientRewardGiving");
var ClientRewardOneStar = /** @class */ (function (_super) {
    __extends(ClientRewardOneStar, _super);
    function ClientRewardOneStar() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ClientRewardOneStar.prototype.giveReward = function () {
        /**
         *  Por cada estrella que mantenga recibe una
         *  bonificación en el mes, por ejemplo, si
         *  durante el
            mes logra mantener 1 estrellas mínimo recibe
            algún premio promocional aleatorio como
            guantes, paños, botellas, bolsos. Si son dos
            además del premio promocional recibe gratis una
            valoración nutricional y si son tres estrellas
            se le incorpora una sesión de descarga muscular.
        */
        var rewards = [
            '1 par de guantes',
            '1 paño',
            '1 botella',
            '1 bolso',
            '3 scope de proteina',
            '1 batido verde',
            '1 camisa',
        ];
        var randomRewardIndex = Math.round(Math.random() * rewards.length);
        return _super.prototype.giveReward.call(this) + ("\n" + rewards[randomRewardIndex]);
    };
    return ClientRewardOneStar;
}(DecoratorClientRewardGiving_1.DecoratorClientRewardGiving));
exports.ClientRewardOneStar = ClientRewardOneStar;
