"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRangeDates = exports.getMonthBlockIndex = exports.getDaysBetweenDates = void 0;
var getDaysBetweenDates = function (dayName) {
    var result = [];
    var date = new Date();
    var current = new Date(date.getFullYear(), date.getMonth(), 1);
    var final = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    var days = { D: 0, L: 1, K: 2, M: 3, J: 4, V: 5, S: 6 };
    var day = days[dayName];
    current.setDate(current.getDate() + (day - current.getDay() + 7) % 7);
    while (current <= final) {
        result.push(new Date(+current));
        current.setDate(current.getDate() + 7);
    }
    return result;
};
exports.getDaysBetweenDates = getDaysBetweenDates;
var getMonthBlockIndex = function (date) {
    var day = date.getDate();
    if (day >= 30)
        return 2;
    return Math.round((day - 1) / 10);
};
exports.getMonthBlockIndex = getMonthBlockIndex;
var getRangeDates = function (blockDays) {
    //Existen 3 bloques de dias 
    //Los bloques son de cada 10 dias
    //Obtener dia numero 1 del mes actual
    var initialDate = new Date();
    initialDate = new Date(initialDate.getFullYear(), initialDate.getMonth(), 1);
    var finalDate = new Date();
    finalDate = new Date(finalDate.getFullYear(), finalDate.getMonth(), 1);
    //Poner la fecha incial segun el bloque
    // bloque 0 = 1  =  0 + 1
    // bloque 1 = 11 = 10 + 1
    // bloque 2 = 21 = 20 + 1
    initialDate.setDate(blockDays * 10 + initialDate.getDate());
    //Poner la fecha final segun el bloque
    // bloque 0 = 10          = 10 + 0*10
    // bloque 1 = 20          = 10 + 1*10
    // bloque 2 = 28-29-30-31 = ?Metodo
    if (blockDays > 1) {
        //Debo obtener todos los dias del 20 hasta el final de mes
        finalDate = new Date(finalDate.getFullYear(), finalDate.getMonth() + 1, 0);
    }
    else {
        finalDate.setDate(10 + blockDays * 10);
    }
    return { initialDate: initialDate,
        finalDate: finalDate
    };
};
exports.getRangeDates = getRangeDates;
