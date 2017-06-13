"use strict";
exports.__esModule = true;
var Hero = (function () {
    function Hero(name, armor, weapon, level) {
        this.name = name;
        this.armor = armor;
        this.weapon = weapon;
        this.level = level;
    }
    Hero.prototype.walk = function () {
        console.log(this.name + " is walking with his " + this.armor + " armor and equipped " + this.weapon + "\n\t\t\t\t\tand it is level: " + this.level);
    };
    return Hero;
}());
exports.Hero = Hero;
