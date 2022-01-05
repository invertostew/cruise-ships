'use strict';

const Ship = require('../src/ship.js');
const Port = require('../src/port.js');

let portConfig, port, shipConfig, ship;
beforeEach(() => {
    portConfig = {
        name: 'Southampton'
    };
    port = new Port(portConfig);
    shipConfig = {
        currentPort: port
    };
    ship = new Ship(shipConfig);
});

describe('Ship constructor', () => {
    test('Ship can be instantiated', () => {
        expect(ship).toBeInstanceOf(Ship);
    });
    test('Ship instance has own currentPort property', () => {
        const { currentPort } = shipConfig;
        expect(ship.currentPort).not.toBeUndefined();
        expect(ship.currentPort).toEqual(currentPort);
    });
});

describe('setSail method', () => {
    test('The currentPort property of the Ship instance gets updated', () => {
        ship.setSail();
        expect(ship.currentPort).toBe(null);
    });
    test('Return a success message', () => {
        expect(ship.setSail()).toEqual('The ship has set sail.');
    });
});

describe('dock method', () => {
    let cherbourgConfig, cherbourg;
    beforeEach(() => {
        cherbourgConfig = {
            name: 'Cherbourg'
        };
        cherbourg = new Port(cherbourgConfig);
    });
    test('The currentPort property of the Ship instance gets updated', () => {
        ship.dock(cherbourg);
        expect(ship.currentPort).toEqual(cherbourg);
    });
    test('Return a success message', () => {
        expect(ship.dock(cherbourg)).toEqual('The ship has docked at Cherbourg.');
    });
});
