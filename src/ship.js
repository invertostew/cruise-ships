'use strict'

const settings = {
    errors: {
        emptyItinerary: 'The ship has no itinerary.'
    }
}

class Ship {
    constructor(config) {
        this.itinerary = config.itinerary;
        this._currentPort = config.itinerary.ports[0];
        this._alreadyDocked = [];
    }

    setSail() {
        if (!this.itinerary.ports.length) {
            throw new Error(settings.errors.emptyItinerary);
        }

        this._currentPort = null;
        const departedPort = this.itinerary.ports.shift();
        this._alreadyDocked.push(departedPort);
        return 'The ship has set sail.';
    }

    dock() {
        this._currentPort = this.itinerary.ports[0];
        return `The ship has docked at ${this._currentPort.name}.`;
    }
}

module.exports = Ship;
