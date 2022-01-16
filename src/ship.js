'use strict'

const settings = {
    defaults: {
        _isInitialized: false,
        _currentPort: null
    },
    errors: {
        alreadyInitialized: 'The ship has already been initialized.',
        emptyItinerary: 'The ship has no itinerary.',
        alreadySailing: 'The ship has already set sail.',
        hasNotPreviouslyDocked: 'You must set sail before you can dock.',
        alreadyDocked: 'The ship is already docked.'
    }
};

class Ship {
    constructor({ _itinerary }) {
        this._isInitialized = settings.defaults._isInitialized;
        this._itinerary = _itinerary;
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

        if (
            !this._currentPort
            || this._previouslyDockedPorts.length > 0 && this._itinerary.ports.length === 1) {
            throw new Error(settings.errors.alreadySailing);
        }

        this._currentPort = null;

        const departedPort = this._itinerary.ports.shift();

        departedPort.removeShip(this);

        this._previouslyDockedPorts.push(departedPort);

        return `The ship has set sail! Next stop: ${this._itinerary.ports[0].name}.`;
    }

    _dock() {
        if (!this._previouslyDockedPorts.length) {
            throw new Error(settings.errors.hasNotPreviouslyDocked);
        }

        if (this._currentPort) {
            throw new Error(settings.errors.alreadyDocked);
        }
        
        this._currentPort = this._itinerary.ports[0];

        this._currentPort.addShip(this);

        return `The ship has docked at ${this._currentPort.name}.`;
    }
}

module.exports = Ship;
