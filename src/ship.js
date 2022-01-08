'use strict'

const settings = {
    errors: {
        alreadyInitialized: 'No need to initialize again.',
        emptyItinerary: 'The ship has no itinerary.'
    }
};

class Ship {
    constructor(config) {
        this._isInitialized = false;
        this.itinerary = config.itinerary;
        this._currentPort = null;
        this._alreadyDocked = [];
        this.init();
    }

    init() {
        if (this._isInitialized) {
            throw new Error(settings.errors.alreadyInitialized);
        }

        if (this.itinerary.ports.length) {
            this._currentPort = this.itinerary.ports[0];
            this._currentPort.addShip(this);
            this._isInitialized = true;
        }
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
