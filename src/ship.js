'use strict'

class Ship {
    constructor(config) {
        this.itinerary = config.itinerary;
        this.currentPort = config.itinerary.ports[0];
        this._alreadyDocked = [];
    }

    setSail() {
        this.currentPort = null;
        const departedPort = this.itinerary.ports.shift();
        this._alreadyDocked.push(departedPort);
        return 'The ship has set sail.';
    }

    dock() {
        this.currentPort = this.itinerary.ports[0];
        return `The ship has docked at ${this.currentPort.name}.`;
    }
}

module.exports = Ship;
