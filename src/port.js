'use strict'

class Port {
    constructor({ name }) {
        this.name = name;
        this._ships = [];
    }

    addShip(ship) {
        this._ships.push(ship);
    }

    removeShip(ship) {
        const removedShip = this._ships.findIndex((el) => {
            return el === ship;
        });
        this._ships.splice(removedShip, 1);
    }
}

module.exports = Port;
