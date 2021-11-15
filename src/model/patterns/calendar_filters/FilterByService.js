"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilterByService = void 0;
var FilterByService = /** @class */ (function () {
    function FilterByService() {
    }
    FilterByService.prototype.filter = function (sessions, filter) {
        var sessionsFilter = sessions.filter(function (session) {
            return session.serviceId == filter.serviceId;
        });
        return sessionsFilter;
    };
    return FilterByService;
}());
exports.FilterByService = FilterByService;
