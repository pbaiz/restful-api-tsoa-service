"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DecoratorClientRewardGiving = void 0;
var DecoratorClientRewardGiving = /** @class */ (function () {
    function DecoratorClientRewardGiving(rewardGiving) {
        this.rewardGiving = rewardGiving;
    }
    DecoratorClientRewardGiving.prototype.giveReward = function () {
        return this.rewardGiving.giveReward();
    };
    return DecoratorClientRewardGiving;
}());
exports.DecoratorClientRewardGiving = DecoratorClientRewardGiving;
