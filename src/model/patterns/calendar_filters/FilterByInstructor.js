"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilterByInstructor = void 0;
var FilterByInstructor = /** @class */ (function () {
    function FilterByInstructor() {
    }
    FilterByInstructor.prototype.filter = function (sessions, filter) {
        //Filter trae instructorId
        var sessionsFilter = sessions.filter(function (session) {
            return session.instructorId == filter.instructorId;
        });
        return sessionsFilter;
    };
    return FilterByInstructor;
}());
exports.FilterByInstructor = FilterByInstructor;
