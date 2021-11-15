"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilterByMonth = void 0;
var FilterByMonth = /** @class */ (function () {
    function FilterByMonth() {
    }
    FilterByMonth.prototype.filter = function (sessions, filter) {
        var sessionsFilter = sessions.filter(function (session) {
            var sessionDate = new Date(session.dayHour[0].dayOfTheWeek);
            var sessionMonth = sessionDate.getMonth();
            return sessionMonth.toString() == filter.month;
        });
        return sessionsFilter;
    };
    return FilterByMonth;
}());
exports.FilterByMonth = FilterByMonth;
