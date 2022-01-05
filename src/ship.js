'use strict'

class Ship {
    constructor(config) {
        this.currentPort = config.currentPort;
    }

    setSail() {
        this.currentPort = null;
        return `You have set sail.`;
    }
}

module.exports = Ship;