'use strict'

const settings = {
    defaults: {
        _isInitialized: false,
        _currentPort: null
    },
    errors: {
        alreadyInitialized: 'The ship has already been initialized.',
        emptyItinerary: 'The ship has no itinerary.'
    }
};

class Ship {
    constructor(config) {
        this._isInitialized = settings.defaults._isInitialized;
        this._itinerary = config._itinerary;
        this._currentPort = settings.defaults._currentPort;
        this._previouslyDockedPorts = [];
        this._init();
    }

    _init() {
        if (this._isInitialized) {
            throw new Error(settings.errors.alreadyInitialized);
        }

        if (this._itinerary.ports.length) {
            this._currentPort = this._itinerary.ports[0];
            this._currentPort.addShip(this);
            this._isInitialized = true;
        }
    }

    _setSail() {
        if (!this._itinerary.ports.length) {
            throw new Error(settings.errors.emptyItinerary);
        }

        this._currentPort = null;
        const departedPort = this._itinerary.ports.shift();
        this._previouslyDockedPorts.push(departedPort);
        return 'The ship has set sail.';
    }

    _dock() {
        this._currentPort = this._itinerary.ports[0];
        return `The ship has docked at ${this._currentPort.name}.`;
    }
}

module.exports = Ship;
