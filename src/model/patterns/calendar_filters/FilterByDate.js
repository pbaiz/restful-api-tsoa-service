"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilterByDate = void 0;
var FilterByDate = /** @class */ (function () {
    function FilterByDate() {
    }
    FilterByDate.prototype.filter = function (sessions, filter) {
        var sessionsFilter = sessions.filter(function (session) {
            var sessionDate = new Date(session.dayHour[0].dayOfTheWeek);
            var sessionMonth = sessionDate.getDate();
            return sessionDate.toString() == filter.Date;
        });
        return sessionsFilter;
    };
    return FilterByDate;
}());
exports.FilterByDate = FilterByDate;
