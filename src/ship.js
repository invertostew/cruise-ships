'use strict'

class Ship {
    constructor(config) {
        this.startingPort = config.startingPort;
        this._currentPort = config.startingPort;
    }

    setSail(port) {
        this._currentPort = port;
        return `You have set sail for ${port}.`;
    }
}

module.exports = Ship;