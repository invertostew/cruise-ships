'use strict'

class Ship {
    constructor(config) {
        this.currentPort = config.currentPort;
    }

    setSail() {
        this.currentPort = null;
        return 'The ship has set sail.';
    }

    dock(port) {
        this.currentPort = port;
        return `The ship has docked at ${port.name}.`;
    }
}

module.exports = Ship;