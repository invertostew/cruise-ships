(function exportShip() {
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
            const emptyItinerary = !this._itinerary.ports.length;
            const hasPreviouslyDocked = this._previouslyDockedPorts.length > 0;
            const finalDestination = this._itinerary.ports.length === 1;
            const alreadySailing = !this._currentPort || hasPreviouslyDocked && finalDestination;
    
            if (emptyItinerary) {
                throw new Error(settings.errors.emptyItinerary);
            }
    
            if (alreadySailing) {
                throw new Error(settings.errors.alreadySailing);
            }
    
            this._currentPort = null;
            
            const departedPort = this._itinerary.ports.shift();
            departedPort.removeShip(this);
            this._previouslyDockedPorts.push(departedPort);
    
            const [nextPort] = this._itinerary.ports;
    
            return `The ship has set sail! Next stop: ${nextPort.name}.`;
        }
    
        _dock() {
            const hasNotPreviouslyDocked = !this._previouslyDockedPorts.length;
            const alreadyDocked = this._currentPort;
    
            if (hasNotPreviouslyDocked) {
                throw new Error(settings.errors.hasNotPreviouslyDocked);
            }
    
            if (alreadyDocked) {
                throw new Error(settings.errors.alreadyDocked);
            }
    
            const [currentPort] = this._itinerary.ports;
            
            this._currentPort = currentPort;
            this._currentPort.addShip(this);
    
            return `The ship has docked at ${this._currentPort.name}.`;
        }
    }

    if (typeof module !== 'undefined' && module.exports) {
        module.exports = Ship;
    } else {
        window.Ship = Ship;
    }
}());
