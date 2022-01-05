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
    test('Ship instance can setSail', () => {
        expect(ship.setSail()).toEqual('You have set sail.');
    });
    test('The currentPort property of the Ship instance gets updated', () => {
        ship.setSail();
        expect(ship.currentPort).toBe(null);
    });
});