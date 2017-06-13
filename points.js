"use strict";
exports.__esModule = true;
var Point = (function () {
    function Point(x, y) {
        this.x = x;
        this.y = y;
    }
    Point.prototype.show = function () {
        console.log("Point x=" + this.x + " y=" + this.y);
    };
    return Point;
}());
exports.Point = Point;
